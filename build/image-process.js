const sharp = require('sharp');
const { join, extname } = require('path');
const generatePathFrom = require('./image-path');
const render = require('./image-render');

const DEFAULT_JPEG_QUALITY = 80;
const DEFAULT_WEBP_QUALITY = 65;
const PLACEHOLDER_JPEG_QUALITY = 25;
const PLACEHOLDER_WEBP_QUALITY = 15;

module.exports = ({ input, width, alt, lazy, className = 'shadow-black-transparent' }) => {
    const inputStream = sharp(join('./src', input));
    const outputDir = './public';
    const extensions = Object.freeze({
        ofInput: extname(input),
        webp: '.webp'
    });
    const addExtensionToPath = generatePathFrom(input);

    const supportsDensity = Number.isFinite(width) && width > 0;
    const retinaWidth = supportsDensity ? Math.round(width * 2) : undefined;

    const paths = Object.freeze({
        fallbackPath: addExtensionToPath(extensions.ofInput),
        fallbackPath2x: supportsDensity ? addExtensionToPath(extensions.ofInput, { density: 2 }) : undefined,
        webpPath: addExtensionToPath(extensions.webp),
        webpPath2x: supportsDensity ? addExtensionToPath(extensions.webp, { density: 2 }) : undefined,
        fallbackPlaceholder: addExtensionToPath(extensions.ofInput, { isPlaceholder: true }),
        webpPlaceholder: addExtensionToPath(extensions.webp, { isPlaceholder: true })
    });
    const { lazyImage, eagerImage } = render(alt, className, paths);

    const resizeOptions = { fit: 'inside', withoutEnlargement: true };
    const placeholderWidth = supportsDensity ? Math.max(16, Math.floor(width / 4)) : undefined;

    function createJpeg(outputPath, resizeWidth, qualityOptions = {}) {
        const jpegOptions = {
            quality: qualityOptions.quality ?? DEFAULT_JPEG_QUALITY,
            progressive: true,
            chromaSubsampling: '4:4:4'
        };

        const stream = inputStream.clone();
        if (resizeWidth) {
            stream.resize(resizeWidth, null, resizeOptions);
        }

        return stream
            .jpeg(jpegOptions)
            .toFile(join(outputDir, outputPath))
            .catch((error) => console.error('Error in createJpeg function: ', error));
    }

    function createWebp(outputPath, resizeWidth, qualityOptions = {}) {
        const webpOptions = {
            quality: qualityOptions.quality ?? DEFAULT_WEBP_QUALITY,
            smartSubsample: true
        };

        const stream = inputStream.clone();
        if (resizeWidth) {
            stream.resize(resizeWidth, null, resizeOptions);
        }

        return stream
            .webp(webpOptions)
            .toFile(join(outputDir, outputPath))
            .catch((error) => console.error('Error in createWebp function: ', error));
    }

    if (lazy) {
        return Promise.all([
            createJpeg(paths.fallbackPath, width),
            createWebp(paths.webpPath, width),
            createJpeg(paths.fallbackPlaceholder, placeholderWidth, { quality: PLACEHOLDER_JPEG_QUALITY }),
            createWebp(paths.webpPlaceholder, placeholderWidth, { quality: PLACEHOLDER_WEBP_QUALITY })
        ].concat(supportsDensity ? [
            createJpeg(paths.fallbackPath2x, retinaWidth),
            createWebp(paths.webpPath2x, retinaWidth)
        ] : []))
            .then((info) => {
                const baseImage = info[0];
                return lazyImage({ width: baseImage.width, height: baseImage.height });
            })
            .catch((error) => console.error('Error in lazy image: ', error));
    }

    return Promise.all([
        createJpeg(paths.fallbackPath, width),
        createWebp(paths.webpPath, width)
    ].concat(supportsDensity ? [
        createJpeg(paths.fallbackPath2x, retinaWidth),
        createWebp(paths.webpPath2x, retinaWidth)
    ] : []))
        .then((info) => {
            const baseImage = info[0];
            return eagerImage({ width: baseImage.width, height: baseImage.height });
        })
        .catch((error) => console.error('Error in eager image: ', error));
};

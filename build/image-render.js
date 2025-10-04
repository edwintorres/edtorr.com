module.exports = (alt, className, paths) => {
    const {
        fallbackPath,
        fallbackPath2x,
        fallbackPlaceholder,
        webpPath,
        webpPath2x,
        webpPlaceholder
    } = paths;

    const classAttribute = className ? ` class="${className}"` : '';
    const buildSrcset = (primary, retina) => (retina ? `${primary} 1x, ${retina} 2x` : primary);
    const fallbackSrcset = buildSrcset(fallbackPath, fallbackPath2x);
    const webpSrcset = buildSrcset(webpPath, webpPath2x);

    return Object.freeze({
        lazyImage(baseDimensions = {}, retinaDimensions) {
            const { width = '', height = '' } = baseDimensions;
            const dataSrcsetAttribute = fallbackPath2x ? ` data-srcset="${fallbackSrcset}"` : '';
            const srcsetAttribute = fallbackPath2x ? ` srcset="${fallbackSrcset}"` : '';

            return `
<picture class="lazy">
<source type="image/webp" srcset="${webpPlaceholder}" data-srcset="${webpSrcset}" />
<img src="${fallbackPlaceholder}" data-src="${fallbackPath}"${dataSrcsetAttribute} alt="${alt}" width="${width}" height="${height}" title="${alt}"${classAttribute} />
</picture>
<noscript>
<picture>
<source type="image/webp" srcset="${webpSrcset}" />
<img src="${fallbackPath}"${srcsetAttribute} alt="${alt}" width="${width}" height="${height}" title="${alt}"${classAttribute} />
</picture>
</noscript>`;
        },
        eagerImage(baseDimensions = {}, retinaDimensions) {
            const { width = '', height = '' } = baseDimensions;
            const srcsetAttribute = fallbackPath2x ? ` srcset="${fallbackSrcset}"` : '';

            return `
<picture>
<source type="image/webp" srcset="${webpSrcset}" />
<img src="${fallbackPath}"${srcsetAttribute} alt="${alt}" width="${width}" height="${height}" title="${alt}"${classAttribute} />
</picture>`;
        }
    });
};

module.exports = (alt, className, paths) => {
    const {
        fallbackPath,
        fallbackPath2x,
        fallbackPlaceholder,
        webpPath,
        webpPath2x,
        webpPlaceholder,
        avifPath,
        avifPath2x,
        avifPlaceholder
    } = paths;

    const classAttribute = className ? ` class="${className}"` : '';
    const buildSrcset = (primary, retina) => (retina ? `${primary} 1x, ${retina} 2x` : primary);
    const fallbackSrcset = buildSrcset(fallbackPath, fallbackPath2x);
    const webpSrcset = buildSrcset(webpPath, webpPath2x);
    const avifSrcset = avifPath ? buildSrcset(avifPath, avifPath2x) : '';

    return Object.freeze({
        lazyImage(baseDimensions = {}, retinaDimensions) {
            const { width = '', height = '' } = baseDimensions;
            const dataSrcsetAttribute = fallbackPath2x ? ` data-srcset="${fallbackSrcset}"` : '';
            const srcsetAttribute = fallbackPath2x ? ` srcset="${fallbackSrcset}"` : '';
            const avifLazy = avifPath ? `<source type="image/avif" srcset="${avifPlaceholder}" data-srcset="${avifSrcset}" />\n` : '';
            const avifEager = avifPath ? `<source type="image/avif" srcset="${avifSrcset}" />\n` : '';

            return `
<picture class="lazy">
${avifLazy}<source type="image/webp" srcset="${webpPlaceholder}" data-srcset="${webpSrcset}" />
<img src="${fallbackPlaceholder}" data-src="${fallbackPath}"${dataSrcsetAttribute} alt="${alt}" width="${width}" height="${height}" title="${alt}"${classAttribute} />
</picture>
<noscript>
<picture>
${avifEager}<source type="image/webp" srcset="${webpSrcset}" />
<img src="${fallbackPath}"${srcsetAttribute} alt="${alt}" width="${width}" height="${height}" title="${alt}"${classAttribute} />
</picture>
</noscript>`;
        },
        eagerImage(baseDimensions = {}, retinaDimensions) {
            const { width = '', height = '' } = baseDimensions;
            const srcsetAttribute = fallbackPath2x ? ` srcset="${fallbackSrcset}"` : '';
            const avifEager = avifPath ? `<source type="image/avif" srcset="${avifSrcset}" />\n` : '';

            return `
<picture>
${avifEager}<source type="image/webp" srcset="${webpSrcset}" />
<img src="${fallbackPath}"${srcsetAttribute} alt="${alt}" width="${width}" height="${height}" title="${alt}"${classAttribute} />
</picture>`;
        }
    });
};

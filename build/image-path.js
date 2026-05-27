const { join, dirname, basename, extname } = require('path');
const crypto = require('crypto');

module.exports = (inputPath, width) => {
    const directory = dirname(inputPath);
    const baseName = basename(inputPath, extname(inputPath));
    const widthSuffix = Number.isFinite(width) && width > 0 ? `.w${width}` : '';

    return (ext, options = {}) => {
        const { isPlaceholder = false, density = 1 } = options;
        const densitySuffix = density > 1 ? `@${density}x` : "";
        const placeholderSuffix = isPlaceholder ? '.placeholder' : '';
        const cacheKey = `${inputPath}|width:${width || 'original'}|density:${density}|placeholder:${isPlaceholder}|ext:${ext}`;
        const hash = crypto.createHash('md5').update(cacheKey).digest('hex').slice(0, 10);
        const fileName = `${baseName}${widthSuffix}${densitySuffix}${placeholderSuffix}.${hash}${ext}`;

        return join(directory, fileName);
    };
};

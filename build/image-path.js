const { join, dirname, basename, extname } = require('path');
const generateRandomNumber = require("number-generator/lib/aleaRNGFactory");
const { uInt32 } = generateRandomNumber(10);

module.exports = (inputPath) => {
    const randomNumber = uInt32();
    const directory = dirname(inputPath);
    const baseName = basename(inputPath, extname(inputPath));

    return (ext, options = {}) => {
        const { isPlaceholder = false, density = 1 } = options;
        const densitySuffix = density > 1 ? `@${density}x` : "";
        const placeholderSuffix = isPlaceholder ? '.placeholder' : '';
        const fileName = `${baseName}${densitySuffix}${placeholderSuffix}.${randomNumber}${ext}`;

        return join(directory, fileName);
    };
};

const fs = window.top.require('fs');
const path = require('path');

export const fileHelper = {
    fileExists(filePath) {
        return fs.existsSync(filePath);
    },

    getFilePath(relativePath) {
        if (!fs.existsSync(relativePath)) {
            return null;
        }

        return path.resolve(relativePath);
    },

    writeFile(filePath, content) {
        fs.writeFileSync(filePath, content, 'utf-8');
    },

    copyFolderRecursive(source, destination) {
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        const sourceItems = fs.readdirSync(source);
        sourceItems.forEach((item) => {
            let itemPath = path.join(source, item);
            let destinationPath = path.join(destination, item);

            if (fs.lstatSync(itemPath).isDirectory()) {
                this.copyFolderRecursive(itemPath, destinationPath);
                return;
            }

            fs.copyFileSync(itemPath, destinationPath);
        });
    },

    deleteFolderRecursive(source) {
        if (!fs.existsSync(source)) {
            return;
        }

        const sourceItems = fs.readdirSync(source);
        sourceItems.forEach((item) => {
            let itemPath = path.join(source, item);

            if (fs.lstatSync(itemPath).isDirectory()) {
                this.deleteFolderRecursive(itemPath);
                fs.rmdirSync(itemPath);
                return;
            }

            fs.unlinkSync(itemPath);
        });
    },

    copyFile(filePath, newFileName, outputPath, fileNameOnly = false) {
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }

        const parts = filePath.split('.');
        const extension = parts[parts.length - 1];
        const fileName = `${newFileName}.${extension}`;

        fs.copyFileSync(filePath, `${outputPath}/${fileName}`);

        if (fileNameOnly) {
            return fileName;
        }

        return `${outputPath}/${fileName}`;
    },

    getMediaType(fileName) {
        const parts = fileName.split('.');
        const extension = parts[parts.length - 1];

        return `image/${extension}`;
    },
};

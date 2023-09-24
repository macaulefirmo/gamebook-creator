const fs = window.top.require('fs');
const path = require('path');

export const fileHelper = {
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
};

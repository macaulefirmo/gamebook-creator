import { dbHelper } from '@/api/helpers/dbHelper';
import { stringHelper } from '@/api/helpers/stringHelper';
import { fileHelper } from '@/api/helpers/fileHelper';
import { commandHelper } from '@/api/helpers/commandHelper';
import { stage } from '@/api/models/stage';
import { opfHelper } from '../helpers/opfHelper';

const Datastore = require('nedb');
const db = new Datastore({ filename: 'projects.db', autoload: true });

export const project = {
    schema() {
        return {
            _id: null,
            name: '',
            createdAt: null,
            updatedAt: null,
            stages: [],
        };
    },

    async find() {
        return new Promise((resolve, reject) => {
            db.find({})
                .sort({ updatedAt: -1 })
                .exec((error, finded) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(dbHelper.performFind(finded));
                    }
                });
        });
    },

    async findOne(id) {
        return new Promise((resolve, reject) => {
            db.findOne({ _id: id }).exec((error, finded) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(dbHelper.performFindOne(finded));
                }
            });
        });
    },

    async create(data) {
        return new Promise((resolve, reject) => {
            if (data.stages.length == 0) {
                data.stages.push(stage.schema());
            }

            db.insert(dbHelper.performInsert(data), (error, inserted) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(inserted);
                }
            });
        });
    },

    async update(data) {
        return new Promise((resolve, reject) => {
            db.update(
                { _id: data._id },
                { $set: dbHelper.performUpdate(data) },
                { multi: true },
                (error, qdtUpdated) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(qdtUpdated);
                    }
                },
            );
        });
    },

    async delete(id) {
        return new Promise((resolve, reject) => {
            db.remove({ _id: id }, { multi: true }, (err, qtdDeleted) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(qtdDeleted);
                }
            });
        });
    },

    async build(project) {
        const gamePath = this.getGamePath(project.name);

        fileHelper.deleteFolderRecursive(gamePath);
        fileHelper.copyFolderRecursive('src/api/components/gamebook', gamePath);

        const stages = stage.createStages(project, gamePath);

        const jsonData = JSON.stringify(stages);
        fileHelper.writeFile(
            `${gamePath}/EPUB/content/js/data.js`,
            `var stages = ${jsonData};`,
        );

        opfHelper.updateMetadata(gamePath, project.name);

        await commandHelper.run(
            `java -jar src/api/components/epubcheck/epubcheck.jar ${gamePath} -mode exp -save`,
        );

        return this.getGamePaths(project.name);
    },

    getGamePath(projectName) {
        const gameFolder = stringHelper.toCamelCase(projectName);
        return `tmp/${gameFolder}`;
    },

    getPreviewPath(projectName) {
        let gamePath = this.getGamePath(projectName);
        return fileHelper.getFilePath(
            `${gamePath}/EPUB/content/html/game.xhtml`,
        );
    },

    getDistFilePath(projectName) {
        const gameName = stringHelper.toCamelCase(projectName);
        return fileHelper.getFilePath(`tmp/${gameName}.epub`);
    },

    getGamePaths(projectName) {
        return {
            dist: this.getDistFilePath(projectName),
            preview: this.getPreviewPath(projectName),
        };
    },
};

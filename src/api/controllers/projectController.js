import { project } from '@/api/models/project';
import { fileHelper } from '../helpers/fileHelper';

const { shell } = window.require('electron');

export const projectController = {
    getSchema() {
        return project.schema();
    },

    async find() {
        try {
            return await project.find();
        } catch (error) {
            console.error('ERROR:', error);
        }
    },

    async findOne(id) {
        try {
            return await project.findOne(id);
        } catch (error) {
            console.error('ERROR:', error);
        }
    },

    async create(data) {
        try {
            return await project.create(data);
        } catch (error) {
            console.error('ERROR:', error);
        }
    },

    async update(data) {
        try {
            let newData = { ...data };
            newData.stages = [];

            for (let i in data.stages) {
                let stage = { ...data.stages[i] };

                if (stage.image instanceof File) {
                    stage.image = fileHelper.copyFile(
                        stage.image.path,
                        'stageImage',
                        `tmp/images/${data._id}/${stage.id}`,
                    );
                } else if (stage.image == null) {
                    fileHelper.deleteFolderRecursive(
                        `tmp/images/${data._id}/${stage.id}`,
                    );
                }

                newData.stages.push(stage);
            }

            return await project.update(newData);
        } catch (error) {
            console.error('ERROR:', error);
        }
    },

    async delete(id) {
        try {
            return await project.delete(id);
        } catch (error) {
            console.error('ERROR:', error);
        }
    },

    async build(data) {
        try {
            return await project.build(data);
        } catch (error) {
            console.error('ERROR:', error);
            return null;
        }
    },

    getPaths(projectName) {
        return project.getGamePaths(projectName);
    },

    openFile(filePath) {
        shell.openExternal(`file://${filePath}`);
    },

    showFile(filePath) {
        shell.showItemInFolder(filePath);
    },
};

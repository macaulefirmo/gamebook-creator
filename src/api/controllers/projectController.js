import { project } from '@/api/models/project';

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
            return await project.update(data);
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

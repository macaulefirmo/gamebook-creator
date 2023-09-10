import { project } from '@/api/models/project';

export const projectController = {
    async find() {
        try {
            return await project.find();
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
};

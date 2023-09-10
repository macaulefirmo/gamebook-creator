import { project } from '@/api/model/project';

export const projectController = {
    create(data) {
        try {
            project.create(data);
        } catch (error) {
            console.error('ERROR:', error);
        }
    },
};

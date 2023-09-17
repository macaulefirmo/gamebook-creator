import { defineStore } from 'pinia';
import { projectController } from '@/api/controllers/projectController';

export const useCreateProjectStore = defineStore('createProject', {
    state: () => ({
        project: projectController.getSchema(),
    }),
    actions: {
        async create() {
            this.project = await projectController.create(this.project);
        },
    },
});

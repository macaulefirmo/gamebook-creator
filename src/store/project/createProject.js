import { defineStore } from 'pinia';
import { projectController } from '@/api/controllers/projectController';

export const useCreateProjectStore = defineStore('createProject', {
    state: () => ({
        project: {
            _id: null,
            name: '',
            createdAt: null,
            updatedAt: null,
        },
    }),
    actions: {
        async create() {
            this.project = await projectController.create(this.project);
        },
    },
});

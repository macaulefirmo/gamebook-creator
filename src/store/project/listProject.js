import { defineStore } from 'pinia';
import { projectController } from '@/api/controllers/projectController';

export const useListProjectStore = defineStore('listProject', {
    state: () => ({
        projects: [],
    }),
    actions: {
        async find() {
            this.projects = await projectController.find();
        },
    },
});

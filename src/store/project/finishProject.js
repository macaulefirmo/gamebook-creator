import { defineStore } from 'pinia';
import { projectController } from '@/api/controllers/projectController';

export const useFinishProjectStore = defineStore('finishProject', {
    state: () => ({
        project: projectController.getSchema(),
        running: false,
        errors: [],
    }),
    actions: {
        async load(id) {
            this.project = await projectController.findOne(id);
        },
    },
});
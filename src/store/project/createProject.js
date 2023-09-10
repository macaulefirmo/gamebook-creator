import { defineStore } from 'pinia';
import { projectController } from '@/api/controller/projectController';

export const useCreateProjectStore = defineStore('createProject', {
    state: () => ({
        project: {
            name: '',
        },
    }),
    actions: {
        createProject() {
            projectController.create({
                name: this.name,
            });
        },
    },
});

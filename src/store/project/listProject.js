import { defineStore } from 'pinia';
import { projectController } from '@/api/controllers/projectController';

export const useListProjectStore = defineStore('listProject', {
    state: () => ({
        projects: [],
        selected: null,
        showModal: false,
    }),
    actions: {
        async find() {
            this.projects = await projectController.find();
        },
        async delete() {
            let project = this.getSelectedProject();

            await projectController.delete(project._id);
            this.projects.splice(this.selected, 1);
        },
        getSelectedProject() {
            return this.projects[this.selected];
        },
    },
});

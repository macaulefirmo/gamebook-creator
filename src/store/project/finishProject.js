import { defineStore } from 'pinia';
import { projectController } from '@/api/controllers/projectController';

export const useFinishProjectStore = defineStore('finishProject', {
    state: () => ({
        project: projectController.getSchema(),
        running: false,
        errors: [],
        builded: false,
        gamePaths: null,
    }),
    actions: {
        async load(id) {
            this.project = await projectController.findOne(id);

            this.gamePaths = projectController.getPaths(this.project.name);
            if (this.gamePaths) {
                this.builded = true;
            }
        },
        async build() {
            this.builded = false;
            this.gamePaths = await projectController.build(this.project);
            if (this.gamePaths) {
                this.builded = true;
                return true;
            }

            return false;
        },
        preview() {
            projectController.openFile(this.gamePaths.preview);
        },
        showFile() {
            projectController.showFile(this.gamePaths.dist);
        },
    },
});

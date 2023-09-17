import { defineStore } from 'pinia';
import { projectController } from '@/api/controllers/projectController';
import { stageController } from '@/api/controllers/stageController';

export const useUpdateProjectStore = defineStore('updateProject', {
    state: () => ({
        project: projectController.getSchema(),
        stagesList: [],
        selectedStage: '',
        currentStageIndex: '',
        currentStage: {},
        dialogDelete: false,
    }),
    actions: {
        async load(id) {
            this.project = await projectController.findOne(id);
            this.updateSelectList();
            this.selectLastStage();
        },
        updateSelectList() {
            let list = [];
            this.project.stages.forEach((value, index) => {
                let stageNumber = index + 1;
                list.push({
                    title: `${stageNumber}ª Fase`,
                    value: index,
                });
            });
            this.stagesList = list;
        },
        selectFirstStage() {
            this.selectedStage = this.stagesList[0];
        },
        selectLastStage() {
            this.selectedStage =
                this.stagesList[this.project.stages.length - 1];
        },
        selectPreviousStage() {
            if (this.currentStageIndex == 0) {
                this.selectFirstStage();
            } else {
                this.selectedStage =
                    this.stagesList[this.currentStageIndex - 1];
            }
        },
        changeCurrentStage() {
            if (this.selectedStage) {
                if (
                    this.project.stages.hasOwnProperty(
                        this.selectedStage.value,
                    ) &&
                    this.selectedStage.value != this.currentStageIndex
                ) {
                    this.currentStageIndex = this.selectedStage.value;
                    this.currentStage =
                        this.project.stages[this.selectedStage.value];
                }
            }
        },
        newStage() {
            let newStage = stageController.getSchema();
            this.project.stages.push(newStage);

            this.updateSelectList();
            this.selectLastStage();
        },
        deleteStage() {
            this.project.stages.splice(this.currentStageIndex, 1);
            this.updateSelectList();
            this.selectPreviousStage();
        },
    },
});

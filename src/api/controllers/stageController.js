import { stage } from '@/api/models/stage';

export const stageController = {
    getSchema() {
        return stage.schema();
    },
};

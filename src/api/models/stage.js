const { v4: uuidv4 } = require('uuid');

export const stage = {
    schema() {
        return {
            id: uuidv4(),
            type: 'reading', // reading or question
            active: false,
            image: null,
            text: null,
            question: null,
            alternatives: [],
            responseIndex: 0,
        };
    },

    createStages(project) {
        let stages = [
            {
                id: 0,
                type: 'start',
                image: null,
                title: project.name,
                isActive: true,
            },
        ];

        project.stages.forEach((stage, index) => {
            if (stage.type == 'reading') {
                stages.push({
                    id: index + 1,
                    type: 'reading',
                    image: null,
                    text: stage.text,
                    isActive: false,
                });
                return;
            }

            stages.push({
                id: index + 1,
                type: 'question',
                text: stage.question,
                alternatives: stage.alternatives,
                responseIndex: stage.responseIndex,
                isActive: false,
            });
        });

        stages.push({
            id: project.stages.length + 1,
            type: 'end',
            isActive: false,
        });

        return stages;
    },
};

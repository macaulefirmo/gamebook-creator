import { fileHelper } from '../helpers/fileHelper';
import { opfHelper } from '../helpers/opfHelper';

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

    createStages(project, gamePath) {
        let stages = [
            {
                id: 0,
                type: 'start',
                image: null,
                title: project.name,
                isActive: true,
            },
        ];

        let tags = [];

        for (let i in project.stages) {
            let stage = project.stages[i];
            let newIndex = parseInt(i) + 1;

            if (stage.type == 'reading') {
                let newStage = {
                    id: newIndex,
                    type: 'reading',
                    image: null,
                    text: stage.text,
                    isActive: false,
                };

                if (stage.image) {
                    let fileName = fileHelper.copyFile(
                        stage.image,
                        `stage-${newIndex}`,
                        `${gamePath}/EPUB/content/images`,
                        true,
                    );

                    newStage.image = `../images/${fileName}`;
                    tags.push({
                        id: `image-stage-${newIndex}`,
                        href: `content/images/${fileName}`,
                        type: fileHelper.getMediaType(fileName),
                    });
                }

                stages.push(newStage);
                continue;
            }

            stages.push({
                id: newIndex,
                type: 'question',
                text: stage.question,
                alternatives: stage.alternatives,
                responseIndex: stage.responseIndex,
                isActive: false,
            });
        }

        opfHelper.updateManifest(gamePath, tags);

        stages.push({
            id: project.stages.length + 1,
            type: 'end',
            isActive: false,
        });

        return stages;
    },
};

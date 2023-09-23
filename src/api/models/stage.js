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
};

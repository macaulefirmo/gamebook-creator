import moment from 'moment';

const BR_FORMAT = 'DD/MM/YYYY HH:mm:SS';

export const dbHelper = {
    performFind(data) {
        return data.map((item) => {
            return this.performFindOne(item);
        });
    },

    performFindOne(item) {
        if ('createdAt' in item && item.createdAt) {
            item.createdAt = moment(item.createdAt).format(BR_FORMAT);
        }

        if ('updatedAt' in item && item.updatedAt) {
            item.updatedAt = moment(item.updatedAt).format(BR_FORMAT);
        }

        return item;
    },

    performInsert(data) {
        if ('_id' in data) {
            delete data._id;
        }

        if ('createdAt' in data) {
            data.createdAt = moment().toDate();
        }

        if ('updatedAt' in data) {
            data.updatedAt = moment().toDate();
        }

        return data;
    },

    performUpdate(data) {
        if ('updatedAt' in data) {
            data.updatedAt = moment().toDate();
        }

        return data;
    },
};

import { dbHelper } from '@/api/helpers/dbHelper';

const Datastore = require('nedb');
const db = new Datastore({ filename: 'projects.db', autoload: true });

export const project = {
    async find() {
        return new Promise((resolve, reject) => {
            db.find({})
                .sort({ updatedAt: -1 })
                .exec((error, finded) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(dbHelper.performFind(finded));
                    }
                });
        });
    },

    async create(data) {
        return new Promise((resolve, reject) => {
            db.insert(dbHelper.performInsert(data), (error, inserted) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(inserted);
                }
            });
        });
    },

    delete(criteria) {
        return new Promise((resolve, reject) => {
            db.remove(criteria, { multi: true }, (err, qtdDeleted) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(qtdDeleted);
                }
            });
        });
    },
};

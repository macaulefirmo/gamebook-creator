import { dbHelper } from '@/api/helpers/dbHelper';
import { stage } from '@/api/models/stage';

const Datastore = require('nedb');
const db = new Datastore({ filename: 'projects.db', autoload: true });

export const project = {
    schema() {
        return {
            _id: null,
            name: '',
            createdAt: null,
            updatedAt: null,
            stages: [],
        };
    },

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

    async findOne(id) {
        return new Promise((resolve, reject) => {
            db.findOne({ _id: id }).exec((error, finded) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(dbHelper.performFindOne(finded));
                }
            });
        });
    },

    async create(data) {
        return new Promise((resolve, reject) => {
            if (data.stages.length == 0) {
                data.stages.push(stage.schema());
            }

            db.insert(dbHelper.performInsert(data), (error, inserted) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(inserted);
                }
            });
        });
    },

    async update(data) {
        return new Promise((resolve, reject) => {
            db.update(
                { _id: data._id },
                { $set: dbHelper.performUpdate(data) },
                { multi: true },
                (error, qdtUpdated) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(qdtUpdated);
                    }
                },
            );
        });
    },

    async delete(id) {
        return new Promise((resolve, reject) => {
            db.remove({ _id: id }, { multi: true }, (err, qtdDeleted) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(qtdDeleted);
                }
            });
        });
    },
};
import { db } from '@/api/database/db';

const TABLE = 'projects';

export const project = {
    create(data) {
        return db.exec(`INSERT INTO ${TABLE} (name) VALUES (?)`, [data.name]);
    },
};

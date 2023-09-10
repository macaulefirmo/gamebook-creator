const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

var connection = null;

export const db = {
    init(dbName) {
        if (!connection) {
            let exists = fs.existsSync(dbName);

            connection = new sqlite3.Database(dbName);
            if (!exists) {
                this.populate();
            }
        }
    },

    close() {
        if (!connection) {
            return;
        }

        connection.close((err) => {
            if (err) {
                console.error(`Erro ao criar o banco de dados: ${err.message}`);
            } else {
                console.log(
                    `Banco de dados '${databaseName}' criado com sucesso.`,
                );
            }
        });
    },

    populate() {
        console.log('Populando o BD!');
        connection.run('CREATE TABLE projects (id INT, name TEXT)');
    },

    query() {
        this.init();

        this.close();
    },

    exec(sql, params) {
        this.init();

        let resp = connection.run(sql, params);

        console.log('resp', resp);

        this.close();

        return resp;
    },
};

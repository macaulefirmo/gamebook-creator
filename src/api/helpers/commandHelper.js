const exec = window.top.require('child_process').exec;

export const commandHelper = {
    run(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }

                if (stderr) {
                    reject(error);
                }

                resolve(stdout);
            });
        });
    },
};

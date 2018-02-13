const fs = require('fs');

module.exports = function () {
    function errorLogWriter(errorString, options = {fileName: `err_${process.env.NODE_ENV}.log`}) {
        let logFile = options.fileName;
        let errorContent = errorString;

        fs.open(logFile, 'a', 0o644, (err, fileBuffer) => {
            let date;
            let row;

            if (err) {
                return console.log(err);
            }

            date = new Date();
            row = '---------------------------------------------------------------------------------------------\r\n'
                + date + '\r\n' + errorContent + '\r\n'
                + '=============================================================================================\r\n';

            fs.write(fileBuffer, row, error => {
                if (!error) {
                    fs.close(fileBuffer);
                } else {
                    console.log(error);
                }
            });
        });
    }

    return {
        log: errorLogWriter
    };
};

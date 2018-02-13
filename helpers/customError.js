class CustomError extends Error {
    constructor(options) {
        super();

        let DEFAULT_ERROR_NAME = 'Error';
        let DEFAULT_ERROR_MESSAGE = 'error';
        let DEFAULT_ERROR_STATUS = 400;

        Error.captureStackTrace(this);

        if (options && options.name) {
            this.name = options.name;
        } else {
            this.name = DEFAULT_ERROR_NAME;
        }

        if (options && options.message) {
            this.message = options.message;
        } else {
            this.message = DEFAULT_ERROR_MESSAGE;
        }

        if (options && options.status) {
            this.status = options.status;
        } else {
            this.status = DEFAULT_ERROR_STATUS;
        }
    }
}

module.exports = CustomError;

const MESSAGES = require('../constants/messages');
const CustomError = require('./customError');

class BadRequestModule {
    constructor() {
    }

    badRequest(options = {}) {
        let errOptions = options;

        if (!errOptions.name) {
            errOptions.name = 'BadRequest';
        }

        if (!errOptions.message) {
            errOptions.message = 'Bad request';
        }

        if (!errOptions.status) {
            errOptions.status = 400;
        }

        return new CustomError(errOptions);
    }

    notEnParams(options = {}) {
        let errOptions = options;

        if (!errOptions.name) {
            errOptions.name = 'NotEnoughIncomingParameters';
        }

        if (!errOptions.message) {
            errOptions.message = MESSAGES.NOT_ENOUGH_PARAMS;
        }
        if (options && options.reqParams) {
            errOptions.message += ' This parameters are required: ' + options.reqParams;
        }

        if (!errOptions.status) {
            errOptions.status = 400;
        }

        return new CustomError(errOptions);
    }

    signInError(options = {}) {
        let errOptions = options;

        if (!errOptions.name) {
            errOptions.name = 'SignInError';
        }
        if (!errOptions.message) {
            errOptions.message = 'Incorrect login or password';
        }
        if (!errOptions.status) {
            errOptions.status = 400;
        }

        return new CustomError(errOptions);
    }

    emailOrNameInUse(options = {}) {
        let errOptions = options;

        if (!errOptions.name) {
            errOptions.name = 'RegistrationError';
        }
        if (!errOptions.message) {
            errOptions.message = 'Email is use. Please input another email';
        }
        if (!errOptions.status) {
            errOptions.status = 400;
        }

        return new CustomError(errOptions);
    }

    notFound(options = {}) {
        let errOptions = options;
        let errMessage;

        if (!errOptions.name) {
            errOptions.name = 'NotFound';
        }
        if (!errOptions.message) {
            errMessage = 'Not found';
            if (errOptions.target) {
                errMessage += ' ' + errOptions.target;
            }
            if (errOptions.searchParams) {
                errMessage += ' (' + errOptions.searchParams + ')';
            }
            errOptions.message = errMessage;
        }

        if (!errOptions.status) {
            errOptions.status = 404;
        }

        return new CustomError(errOptions);
    }

    unAuthorized(options = {}) {
        let errOptions = options;

        if (!errOptions.name) {
            errOptions.name = 'UnAuthorized';
        }
        if (!errOptions.message) {
            errOptions.message = 'You do not authorized';
        }
        if (!errOptions.status) {
            errOptions.status = 401;
        }

        return new CustomError(errOptions);
    }

    accessError(options = {}) {
        let errOptions = options;

        if (!errOptions.name) {
            errOptions.name = 'AccessError';
        }
        if (!errOptions.message) {
            errOptions.message = 'You do not have sufficient rights';
        }
        if (!errOptions.status) {
            errOptions.status = 403;
        }

        return new CustomError(errOptions);
    }
}

module.exports = new BadRequestModule();

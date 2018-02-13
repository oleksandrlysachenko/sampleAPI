const SessionService = require('../services/session');
const UserService = require('../services/user');

const badRequest = require('../helpers/badRequests');

class Authentication {
    constructor() {
    }

    static signIn(req, res, next) {
        let body = req.body;
        let options = {
            email   : body.email,
            password: body.password
        };

        let userService = new UserService(options);
        let sessionService = new SessionService();

        let error = userService.validate(['password', 'email']);
        if (error) return next(error);

        userService.get()
            .then((user) => {
                sessionService.register(req, res, user);
            })
            .catch((err) => {
                if (!err) return badRequest.signInError();

                next(err);
            });
    }

    static signUp(req, res, next) {
        let body = req.body;
        let options = {
            firstName  : body.firstName,
            lastName   : body.lastName,
            email      : body.email,
            phoneNumber: body.phoneNumber ? parseInt(body.phoneNumber, 10) : null,
            password   : body.password,
            dateOfBirth: body.dateOfBirth,
            country    : body.country
        };

        let userService = new UserService(options);
        let sessionService = new SessionService();

        let error = userService.validate(['password', 'email']);
        if (error) return next(error);

        userService.create()
            .then(user => {
                sessionService.register(req, res, user);
            })
            .catch((err) => next(err));
    }

    static signOut(req, res, next) {
        let service = new SessionService();
        service.destroy(req, res);
    }

    static checkAuth(req, res, next) {
        let service = new SessionService();
        service.checkIfAuth(req, res, next);

    }
}

module.exports = Authentication;

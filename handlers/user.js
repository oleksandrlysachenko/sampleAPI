const UserService = require('../services/user');

const badRequest = require('../helpers/badRequests');

class UserHandlers {
    constructor() {
    }

    static getAll(req, res, next) {
        let userService = new UserService();

        userService.getAll()
            .then((users) => {
                res.status(200).send(users);
            })
            .catch((err) => {
                if (!err) return next(badRequest.notFound());

                next(err);
            });
    }

    static getById(req, res, next) {
        let id = req.params.id;
        let options = {
            id
        };

        let userService = new UserService(options);

        let error = userService.validate(['id']);
        if (error) return next(error);

        userService.get()
            .then(user => res.status(200).send(user))
            .catch((err) => {
                if (!err) return badRequest.notFound();

                next(err);
            });
    }

    static update(req, res, next) {
        let userId = req.session.userId;
        let body = req.body;
        let options = {
            id       : userId,
            email    : body.email,
            firstName: body.firstName,
            lastName : body.lastName
        };

        let userService = new UserService(options);

        userService.update()
            .then(user => res.status(200).send(user))
            .catch(err => next(err));
    }
}

module.exports = UserHandlers;

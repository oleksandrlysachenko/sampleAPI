const PostService = require('../services/post');

const badRequest = require('../helpers/badRequests');

class PostHandlers {
    constructor() {
    }

    static create(req, res, next) {
        let userId = req.session.userId;
        let body = req.body;
        let option = {
            title      : body.title,
            description: body.description,
            text       : body.text,
            ownerId    : userId
        };

        let postService = new PostService(option);

        postService.create()
            .then(post => res.status(200).send(post))
            .catch(err => next(err));
    }

    static getAll(req, res, next) {
        let postService = new PostService();

        postService.getAll()
            .then((posts) => {
                res.status(200).send(posts);
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

        let postService = new PostService(options);

        let error = postService.validate(['id']);
        if (error) return next(error);

        postService.get()
            .then(post => res.status(200).send(post))
            .catch((err) => {
                if (!err) return badRequest.notFound();

                next(err);
            });
    }

    static getMyAll(req, res, next) {
        let userId = req.session.userId;

        let postService = new PostService({ownerId: userId});

        postService.getAll()
            .then(posts => res.status(200).send(posts))
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

        let postService = new PostService(options);

        postService.update()
            .then(post => res.status(200).send(post))
            .catch(err => next(err));
    }

    static remove(req, res, next) {
        let id = req.params.id;

        let postService = new PostService({id});

        postService.remove()
            .then(() => res.status(200).send({success: 'Success'}))
            .catch(err => next(err));
    }
}

module.exports = PostHandlers;

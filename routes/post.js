const express = require('express');
const router = express.Router();

const PostHandlers = require('../handlers/post');
const AuthHandlers = require('../handlers/authentication');

module.exports = (function () {
    router.post('/', AuthHandlers.checkAuth, PostHandlers.create);
    router.get('/', AuthHandlers.checkAuth, PostHandlers.getAll);
    router.get('/my', AuthHandlers.checkAuth, PostHandlers.getMyAll);
    router.put('/', AuthHandlers.checkAuth, PostHandlers.update);
    router.get('/:id', AuthHandlers.checkAuth, PostHandlers.getById);
    router.delete('/:id', AuthHandlers.checkAuth, PostHandlers.remove);

    return router;
})();

const express = require('express');
const router = express.Router();

const UserHandlers = require('../handlers/user');
const AuthHandlers = require('../handlers/authentication');

module.exports = (function () {
    router.get('/', AuthHandlers.checkAuth, UserHandlers.getAll);
    router.put('/', AuthHandlers.checkAuth, UserHandlers.update);
    router.get('/:id', AuthHandlers.checkAuth, UserHandlers.getById);

    return router;
})();

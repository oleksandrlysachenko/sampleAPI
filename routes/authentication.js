const express = require('express');
const router = express.Router();

const handlers = require('../handlers/authentication');

module.exports = (function () {

    router.post('/signUp', handlers.signUp);
    router.post('/signIn', handlers.signIn);
    router.post('/signOut', handlers.signOut);

    return router;
})();

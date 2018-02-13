const logWriter = require('../helpers/logWriter')();
const MESSAGES = require('../constants/messages');

module.exports = function (app) {
    const userRoute = require('./user');
    const postRoute = require('./post');
    const authRoute = require('./authentication');

    // <editor-fold desc="Error handler">

    function log(err, req) {
        let status = err.status || 500;
        let logMessage;

        logMessage = req.method + ' '
            + status + ' '
            + req.originalUrl + '; '
            + req.ip + '; \n'
            + err.message + '\n' + err.stack;

        logWriter.log(logMessage);
    }

    function notFound(req, res, next) {
        let accepts = req.headers.accept;

        res.status(404);

        if ((accepts && accepts.indexOf('json') !== -1) || req.headers['content-type'] === 'application/json') {
            return res.json({error: MESSAGES.PAGE_NOT_FOUND});
        }

        if (req.accepts('html')) {
            return res.send(MESSAGES.PAGE_NOT_FOUND);
        }

        res.type('txt');
        res.send(MESSAGES.PAGE_NOT_FOUND);
    }

    function errorHandler(err, req, res, next) {
        let status;
        let errorMessage;

        status = err.status || 500;

        if (process.env.NODE_ENV === 'development') {
            console.error(err.stack);
            log(err, req);
            return res.status(status).send({error: err.message, stack: err.stack})
        }

        errorMessage = (status === 500) ? 'Internal Server Error' : err.message;
        log(err, req);
        res.status(status).send({error: errorMessage});

    }

// </editor-fold>

    app.get('/', (req, res, next) => {
        res.status(200).send({success: 'API run'});
    });

    app.use('/', authRoute);
    app.use('/user', userRoute);
    app.use('/post', postRoute);

    app.use(notFound);
    app.use(errorHandler);
};

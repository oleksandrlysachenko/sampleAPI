const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const connectMongo = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const serverLog = require('morgan');

let db;

// <editor-fold desc="Environment config">

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

require(`./configs/${process.env.NODE_ENV}`);
// </editor-fold>

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
db = mongoose.connection;

app.use(serverLog('dev'));
app.use(bodyParser.urlencoded({extended: false, limit: 1024 * 1024 * 5}));
app.use(bodyParser.json({limit: 1024 * 1024 * 5}));

db.once('open', function () {
    console.log(`database: connected to ${process.env.DB_NAME} is succeed`);

    app.use(session({
        secret           : 'erod7221vsa82cstoware23',
        resave           : true,
        saveUninitialized: true,
        store            : new connectMongo({
            mongooseConnection: db,
            collection        : 'session',
        }),
        cookie           : {
            maxAge : process.env.SESSION_MAX_AGE,
            expires: new Date(Date.now() + parseInt(process.env.SESSION_MAX_AGE, 10))
        }
    }));

    require('./models');
    require('./routes')(app);

    app.listen(process.env.SERVER_PORT, function () {
        console.log(`server: start on ${process.env.SERVER_HOST} host ${process.env.SERVER_PORT} port`);
    });
});

db.on('error', function (err) {
    console.error(`database: ${err.message}`);
});

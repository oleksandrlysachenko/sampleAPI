const uuid = require('uuid/v4');
const crypto = require('crypto');

const badRequest = require('../helpers/badRequests');

class SessionService {
    constructor() {

    }

    static encryptSha256(data) {
        let shaSum = crypto.createHash('sha256');
        shaSum.update(data);
        return shaSum.digest('hex');
    }

    static generateToken() {
        return uuid();
    }

    register(req, res, user) {
        req.session.loggedIn = true;
        req.session.userId = user.id;
        req.session.token = SessionService.generateToken();

        res.header('sessionToken', SessionService.encryptSha256(req.session.token));

        res.status(200).send(user);
    }

    destroy(req, res) {
        if (req.session && req.session.userId) {
            req.session.destroy();
        }
        res.clearCookie();
        res.status(200).send({success: 'Logout successful'});
    }

    checkIfAuth(req, res, next) {
        if (req.session && req.session.userId && req.session.token) {
            if (req.headers.sessiontoken === SessionService.encryptSha256(req.session.token)) {
                return next();
            }
        }

        if (req.session && req.session.userId) {
            req.session.destroy();
        }

        res.clearCookie();

        return next(badRequest.unAuthorized());

    }
}

module.exports = SessionService;

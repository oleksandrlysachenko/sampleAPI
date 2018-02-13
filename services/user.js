const crypto = require('crypto');
const uuid = require('uuid/v4');

const UserModel = require('../models/user');

const badRequest = require('../helpers/badRequests');

class UserService {
    constructor(options = {}) {
        if (options.id) this.id = options.id;
        if (options.firstName) this.firstName = options.firstName;
        if (options.lastName) this.lastName = options.lastName;
        if (options.email) this.email = options.email;
        if (options.dateOfBirth) this.dateOfBirth = options.dateOfBirth;
        if (options.phoneNumber) this.phoneNumber = options.phoneNumber;
        if (options.country) this.country = options.country;
        if (options.password) this.password = UserService.encryptSha256(options.password);
    }

    static encryptSha256(data) {
        let shaSum = crypto.createHash('sha256');
        shaSum.update(data);
        return shaSum.digest('hex');
    }

    static prepareSaveData(params) {
        let data = {};

        if (params.firstName) {
            data.firstName = params.firstName;
        }

        if (params.lastName) {
            data.lastName = params.lastName;
        }

        if (params.country) {
            data.country = params.country;
        }

        if (params.dateOfBirth) {
            data.dateOfBirth = params.dateOfBirth;
        }

        if (params.email) {
            data.email = params.email;
        }

        if (params.password) {
            data.password = params.password;
        }

        if (params.phoneNumber) {
            data.phoneNumber = params.phoneNumber;
        }

        return data;
    }

    static queryBuilder(options) {
        let query = {};

        if (options.id) {
            query._id = options.id;
        }

        if (options.firstName) {
            query.firstName = options.firstName;
        }

        if (options.lastName) {
            query.firstName = options.firstName;
        }

        if (options.email) {
            query.email = options.email;
        }

        if (options.password) {
            query.password = options.password;
        }

        return query;
    }

    validate(reqParams) {
        reqParams.forEach((param) => {
            if (this[param]) return badRequest.notEnParams({reqParams: param});
        });
    }

    create() {
        return new Promise((resolve, reject) => {
            let saveData = Object.assign({}, this);
            let userModel = new UserModel();

            userModel.create(saveData, (err, model) => {
                if (err) {
                    if (err.code === 11000 && err.name === 'MongoError') {
                        return reject(badRequest.emailOrNameInUse());
                    }

                    return reject(err);
                }

                let user = model.toJSON();
                delete user.password;

                resolve(user);
            });
        });
    }

    get() {
        return new Promise((resolve, reject) => {
            let userModel = new UserModel();
            let query = UserService.queryBuilder(Object.assign({}, this));

            userModel.findOne(query, (err, model) => {
                if (err) return reject(err);

                if (!model) return reject(null);

                let user = model.toJSON();
                delete user.password;

                resolve(user);
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            let userModel = new UserModel();
            let query = UserService.queryBuilder(Object.assign({}, this));

            userModel
                .find(query)
                .select('email firstName lastName phoneNumber')
                .exec((err, models) => {
                    if (err) return reject(err);

                    if (!models) return reject(null);

                    resolve(models);
                });
        });
    }

    update() {
        return new Promise((resolve, reject) => {
            let userModel = new UserModel();
            let query = UserService.queryBuilder({id: this.id});
            let saveData = UserService.prepareSaveData(Object.assign({}, this));

            userModel.findById(query, (err, model) => {
                if (err) return reject(err);

                if (!model) return reject(badRequest.notFound());

                model.set(saveData);
                model.save((err, updateModel) => {
                    if (err) return reject(err);

                    resolve(updateModel.toJSON());
                });
            });
        });
    }
}

module.exports = UserService;

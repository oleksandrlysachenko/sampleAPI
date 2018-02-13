const PostModel = require('../models/post');

const badRequest = require('../helpers/badRequests');

class PostService {
    constructor(options = {}) {
        if (options.id) this.id = options.id;
        if (options.ownerId) this.ownerId = options.ownerId;
        if (options.description) this.description = options.description;
        if (options.title) this.title = options.title;
        if (options.text) this.text = options.text;
    }

    static prepareSaveData(params) {
        let data = {};

        if (params.ownerId) {
            data.ownerId = params.ownerId;
        }

        if (params.description) {
            data.description = params.description;
        }

        if (params.title) {
            data.title = params.title;
        }

        if (params.text) {
            data.text = params.text;
        }

        return data;
    }

    static queryBuilder(options) {
        let query = {};

        if (options.id) {
            query._id = options.id;
        }

        if (options.ownerId) {
            query.ownerId = options.ownerId;
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
            let postModel = new PostModel();

            postModel.create(saveData, (err, model) => {
                if (err) {
                    return reject(err);
                }

                resolve(model);
            });
        });
    }

    get() {
        return new Promise((resolve, reject) => {
            let postModel = new PostModel();
            let query = PostService.queryBuilder(Object.assign({}, this));

            postModel.findOne(query, (err, model) => {
                if (err) return reject(err);

                if (!model) return reject(null);

                resolve(model);
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            let postModel = new PostModel();
            let query = PostService.queryBuilder(Object.assign({}, this));

            postModel
                .find(query)
                .select('title description ownerId phoneNumber')
                .exec((err, models) => {
                    if (err) return reject(err);

                    if (!models) return reject(null);

                    resolve(models);
                });
        });
    }

    update() {
        return new Promise((resolve, reject) => {
            let postModel = new PostModel();
            let query = PostService.queryBuilder({id: this.id});
            let saveData = PostService.prepareSaveData(Object.assign({}, this));

            postModel.findById(query, (err, model) => {
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

    remove() {
        return new Promise((resolve, reject) => {
            let postModel = new PostModel();
            let query = PostService.queryBuilder({id: this.id});

            postModel.findByIdAndRemove(query, (err) => {
                if (err) return reject(err);

                resolve();
            });
        });
    }
}

module.exports = PostService;

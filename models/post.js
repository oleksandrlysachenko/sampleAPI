const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const CONSTANTS = require('../constants/index');
let instance = null;

class Model {
    constructor() {
        this.modelName = CONSTANTS.MODELS.POST;

        if (!instance) {

            let schema = {
                title      : {
                    type   : String,
                    default: null
                },
                description: {
                    type   : String,
                    default: null
                },
                text       : {
                    type   : String,
                    default: null
                },
                ownerId    : {
                    type: ObjectId,
                    ref : CONSTANTS.MODELS.USER
                }
            };

            let model = new Schema(schema, {
                collection: this.modelName + 's',
                toJSON    : {
                    transform: function (doc, ret) {
                        ret.id = ret._id;
                        delete ret._id;
                        delete  ret.__v;
                    }
                }
            });

            mongoose.model(this.modelName, model);
            instance = mongoose.models[this.modelName];
        }

        return instance;
    }
}

module.exports = Model;

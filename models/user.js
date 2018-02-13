const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CONSTANTS = require('../constants/index');
let instance = null;

class Model {
    constructor() {
        this.modelName = CONSTANTS.MODELS.USER;

        if (!instance) {

            let schema = {
                firstName  : {
                    type   : String,
                    default: null
                },
                lastName   : {
                    type   : String,
                    default: null
                },
                email      : {
                    type    : String,
                    unique  : true,
                    required: true,
                    default : null
                },
                dateOfBirth: {
                    type   : Date,
                    default: null
                },
                phoneNumber: {
                    type   : Number,
                    default: null
                },
                country    : {
                    type   : String,
                    default: null
                },
                password   : {
                    type    : String,
                    required: true,
                    default : null
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

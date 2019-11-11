const mongoose = require('mongoose');

//Modelschema
const ModelModel = mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    animation: {
        type: Boolean,
        required: true
    },
    scale:  {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    published:{
        type:Boolean,
        require:true
    }
});

const Model = module.exports = mongoose.model('Model', ModelModel);

module.exports.addModel = function (newModel, callback) {
    newModel.save(callback);
}

module.exports.updatenewModel = function (id, updateQuery, callback) {
    Model.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deletenewModel = function (id, callback) {
    Model.remove({ _id: id }, callback);
}

module.exports.getModels = function (callback) {
    Model.find().exec(callback);
}

module.exports.getPublishedModels = function (callback) {
    Model.find({ "published": true}, callback);
}


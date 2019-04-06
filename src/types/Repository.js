"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var PlayerModel_1 = require("./Model/PlayerModel");
exports.Schema = mongoose.Schema;
exports.ObjectId = mongoose.Schema.Types.ObjectId;
exports.Mixed = mongoose.Schema.Types.Mixed;
var playerRepository = /** @class */ (function () {
    function playerRepository() {
        this._model = PlayerModel_1.PlayerCollection;
    }
    playerRepository.prototype.create = function (item, callback) {
        this._model.create(item, callback);
    };
    playerRepository.prototype.retrieve = function (callback) {
        this._model.find({}, callback);
    };
    playerRepository.prototype.update = function (_id, item, callback) {
        this._model.update({ _id: _id }, item, callback);
    };
    playerRepository.prototype["delete"] = function (_id, callback) {
        this._model.remove({ _id: this.toObjectId(_id) }, function (err) { return callback(err, null); });
    };
    playerRepository.prototype.findById = function (_id, callback) {
        this._model.findById(_id, callback);
    };
    playerRepository.prototype.findOne = function (cond, callback) {
        return this._model.findOne(cond, callback);
    };
    playerRepository.prototype.find = function (cond, fields, options, callback) {
        return this._model.find(cond, options, callback);
    };
    playerRepository.prototype.toObjectId = function (_id) {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    };
    return playerRepository;
}());
exports.playerRepository = playerRepository;

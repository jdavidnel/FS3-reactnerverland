'use strict';

var mongoose = require('mongoose');

var _require = require('./schema'),
    voteSchema = _require.voteSchema;

var voteModel = mongoose.model('Vote', voteSchema);
module.exports = voteModel;
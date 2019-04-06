'use strict';

var mongoose = require('mongoose');

var _require = require('./schema'),
    roundSchema = _require.roundSchema;

var roundModel = mongoose.model('Round', roundSchema);
module.exports = roundModel;
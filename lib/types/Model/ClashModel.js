'use strict';

var mongoose = require('mongoose');

var _require = require('./schema'),
    clashSchema = _require.clashSchema;

var clashModel = mongoose.model('Clash', clashSchema);
module.exports = clashModel;
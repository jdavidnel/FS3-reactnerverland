'use strict';

var mongoose = require('mongoose');

var _require = require('./schema'),
    memeSchema = _require.memeSchema;

var memeModel = mongoose.model('Meme', memeSchema);
module.exports = memeModel;
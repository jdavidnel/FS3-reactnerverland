'use strict';

var mongoose = require('mongoose');

var _require = require('./schema'),
    playerSchema = _require.playerSchema;

var playerModel = mongoose.model('Player', playerSchema);
module.exports = playerModel;
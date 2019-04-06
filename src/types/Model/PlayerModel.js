var mongoose = require('mongoose'); 
const { playerSchema } = require('./schema');

var playerModel = mongoose.model('Player', playerSchema);
module.exports = playerModel;
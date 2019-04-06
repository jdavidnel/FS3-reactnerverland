var mongoose = require('mongoose'); 
const { roundSchema } = require('./schema');
 
var roundModel = mongoose.model('Round', roundSchema);
module.exports =   roundModel;
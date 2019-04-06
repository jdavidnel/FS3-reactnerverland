var mongoose = require('mongoose'); 
const { clashSchema } = require('./schema');
 
var clashModel = mongoose.model('Clash', clashSchema);
module.exports =   clashModel;
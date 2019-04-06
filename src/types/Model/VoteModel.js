var mongoose = require('mongoose'); 
const { voteSchema } = require('./schema');
 
var voteModel = mongoose.model('Vote', voteSchema);
module.exports =   voteModel;
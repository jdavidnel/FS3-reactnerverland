var mongoose = require('mongoose'); 
const { memeSchema } = require('./schema');
 
var memeModel = mongoose.model('Meme', memeSchema);
module.exports =   memeModel;
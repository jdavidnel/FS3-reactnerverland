/*var mongoose = require('mongoose'); 
const { voteSchema } = require('./schema');
 
var voteModel = mongoose.model('Vote', voteSchema);
module.exports =   voteModel;
*/
import { Document, model, Model, Schema } from 'mongoose';
import { voteSchema } from './schema';

export interface IVote extends Document {
	_id: Schema.Types.ObjectId;
	user: string;
	for: string;
}

var voteModel: Model<IVote> = model<IVote>('Vote', voteSchema);
export { voteModel };
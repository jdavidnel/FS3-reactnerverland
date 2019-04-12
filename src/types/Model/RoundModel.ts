import { Document, model, Model, Schema } from 'mongoose';
import { roundSchema } from './schema';
import { IVote } from './VoteModel';

export interface IRound extends Document {
	_id: Schema.Types.ObjectId;
	f_meme: String;
	nd_meme: String
	vote: [String];
	winner: String;
}

var roundModel: Model<IRound> = model<IRound>('Round', roundSchema);
export { roundModel };
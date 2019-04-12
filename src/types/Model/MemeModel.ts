import { Document, model, Model, Schema } from 'mongoose';
import { memeSchema } from './schema';

export interface IMeme extends Document {
	_id: Schema.Types.ObjectId;
	image: string;
	player: string;
}

var memeModel: Model<IMeme> = model<IMeme>('Meme', memeSchema);
export { memeModel };
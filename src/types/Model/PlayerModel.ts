import { Document, model, Model, Schema } from 'mongoose';
import { playerSchema } from './schema';

export interface IPlayer extends Document {
	_id: Schema.Types.ObjectId;
	name: string;
	mdp: string;
	email: string;
	score: number;
}

var playerModel: Model<IPlayer> = model<IPlayer>('Player', playerSchema);
export { playerModel }
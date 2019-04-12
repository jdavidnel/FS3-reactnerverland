import { Document, model, Model, Schema } from 'mongoose';
import { playerSchema } from './schema';

export interface IPlayer extends Document {
	_id: Schema.Types.ObjectId;
	login: string;
	mdp: string;
	mail: string;
	score: number;
}

var playerModel: Model<IPlayer> = model<IPlayer>('Player', playerSchema);
export { playerModel }
import { Document, model, Model, Schema } from 'mongoose';
import { clashSchema } from './schema';
import { IRound } from '../../types/Model/RoundModel';

export interface IClash extends Document {
	_id: Schema.Types.ObjectId
	competitors: [string];
	suscribers: [string];
	round: [string];
	winner: string;
}

var clashModel: Model<IClash> = model<IClash>('Clash', clashSchema);
export { clashModel };
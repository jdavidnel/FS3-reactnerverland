import * as mongoose from 'mongoose';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface IPlayer extends mongoose.Document {
	name: string;
	mdp: string;
	email: string;
	score: number;
}

let schema = new Schema({
	name: {
		type: String,
		required: true
	},
	mdp: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: false
	},
	score: {
		type: Number,
		required: false
	}
});

export let PlayerCollection = mongoose.model<IPlayer>('player', schema, 'players', true);
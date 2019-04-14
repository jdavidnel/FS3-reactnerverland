import { Schema } from 'mongoose';

const playerSchema: Schema = new Schema({
	score: Number,
	login: String,
	mail: String,
	mdp: String,
}, { collection: 'Player' });

const memeSchema: Schema = new Schema({
	image: String,
	player: { type: Schema.Types.ObjectId, ref: 'Player' },
}, { collection: 'Meme' });

const voteSchema: Schema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'Player' },
	for: { type: Schema.Types.ObjectId, ref: 'Meme' },
}, { collection: 'Vote' });

const roundSchema: Schema = new Schema({
	f_meme: { type: Schema.Types.ObjectId, ref: 'Meme' },
	nd_meme: { type: Schema.Types.ObjectId, ref: 'Meme' },
	vote: [{ type: Schema.Types.ObjectId, ref: 'Vote' }],
	winner: { type: Schema.Types.ObjectId, ref: 'Player' },
}, { collection: 'Round' });


const clashSchema: Schema = new Schema({
	f_competitors: { type: Schema.Types.ObjectId, ref: 'Player' },
	nd_competitors: { type: Schema.Types.ObjectId, ref: 'Player' },
	suscribers: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
	inprogress: Boolean,
	round: [{ type: Schema.Types.ObjectId, ref: 'Round' }],
	winner: { type: Schema.Types.ObjectId, ref: 'Player' },
}, { collection: 'Clash' });

export {
	playerSchema,
	memeSchema,
	voteSchema,
	roundSchema,
	clashSchema
};


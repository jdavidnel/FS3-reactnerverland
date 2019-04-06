'use strict';

var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
				score: Number,
				login: String,
				mail: String,
				mdp: String
}, { collection: 'Player' });

var memeSchema = mongoose.Schema({
				image: String,
				player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
}, { collection: 'Meme' });

var voteSchema = mongoose.Schema({
				user: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
				for: { type: mongoose.Schema.Types.ObjectId, ref: 'Meme' }
}, { collection: 'Vote' });

var roundSchema = mongoose.Schema({
				meme: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meme' }],
				vote: [voteSchema],
				winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
}, { collection: 'Round' });

var clashSchema = mongoose.Schema({
				competitors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
				suscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
				round: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Round' }],
				winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
}, { collection: 'Clash' });

module.exports = {
				playerSchema: playerSchema,
				memeSchema: memeSchema,
				voteSchema: voteSchema,
				roundSchema: roundSchema,
				clashSchema: clashSchema
};
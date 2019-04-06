var mongoose = require('mongoose'); 

const playerSchema = mongoose.Schema({
    score: Number,
    login: String,
    mail: String,
    mdp: String,
},{ collection : 'Player' }); 

const memeSchema = mongoose.Schema({
    image: String,
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
},{ collection : 'Meme' });

const voteSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    for: { type: mongoose.Schema.Types.ObjectId, ref: 'Meme' },
},{ collection : 'Vote' });

const roundSchema = mongoose.Schema({
	meme: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meme' }],
	vote: [voteSchema],
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
},{ collection : 'Round' });


const clashSchema = mongoose.Schema({
	competitors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
	suscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
	round: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Round' }],
	winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
},{ collection : 'Clash' });

module.exports = {
	playerSchema,
	memeSchema,
	voteSchema,
	roundSchema,
	clashSchema
};
 

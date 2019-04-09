const playerModel = require('../../../types/Model/PlayerModel');
const clashModel = require('../../../types/Model/ClashModel');
const memeModel = require('../../../types/Model/MemeModel');
const voteModel = require('../../../types/Model/VoteModel');
const roundModel= require('../../../types/Model/RoundModel');


const mongoose = require('mongoose');
const uri = 'mongodb://localhost/admintest';

const player = new playerModel({ login : 'test', mail: 'test@mail.com', score: 0});
const clash = new clashModel();
const round = new roundModel();
const vote = new voteModel();
const meme = new memeModel({ image: 'ok' });


mongoose.connect(uri, {useNewUrlParser: true});

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', async () => {
    console.log("Connexion à la base OK");
});

async function dbcreate() {
  console.log("player");
  await playerModel.create(player, function (err, doc) {
    if (err) { return console.error(err) }
    console.log(doc);
  });
  console.log("clashs");
  await clashModel.create(clash, function (err, doc) {
    if (err) { return console.error(err) }
    console.log(doc);
  });
  console.log("round");
  await roundModel.create(round, function (err, doc) {
    if (err) { return console.error(err) }
    console.log(doc);
  });
  console.log("vote");
  await voteModel.create(vote, function (err, doc) {
    if (err) { return console.error(err) }
    console.log(doc);
  });
  console.log("meme");
  await memeModel.create(meme, function (err, doc) {
    if (err) { return console.error(err) }
    console.log(doc);
  });
}

async function main() {
  await dbcreate();
  await db.close();
}

main();

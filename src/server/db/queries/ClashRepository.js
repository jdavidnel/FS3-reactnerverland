import clashModel from '../../../types/Model/ClashModel'
const playerRepository = require('./PlayerRepository');
const roundRepository = require('./RoundRepository');


async function getClash(filters) {
   var getData = async () => {
        console.log("test");
        let clashlist = [];
        await clashModel.find(filters,(err, clash) => {
            if (err){
                console.log("error ");
                console.log(err); 
            }
            clashlist.push(clash);
        });
        return clashlist;
    };
    console.log("AFFICHE RESULATTA !!!");
    return (await getData()).pop();
}

async function addClash(clash)
{
    let result = null;

    let competitors1 = await playerRepository.getPlayers({ _id: clash.competitors[0] });
    let competitors2 = await playerRepository.getPlayers( { _id : clash.competitors[1] });

    if (competitors1 == undefined || competitors2 == undefined) {
        return null;
    }
    let newClash = new clashModel(clash);
    await newClash.save(function (err, player1) {
        if (err) {            
            console.error(err);
            return new Array();
        }
        result = newClash;
    });
    return result;
}

async function updateClash(clash) {
    let result = null;

    var id = clash._id;
    delete clash._id;
    console.log("clash");
    console.log(clash);
    
    const test = await clashModel.update({ _id: id } , clash, { multi: false }, function (err, playerUpdate) {
        if (err) {            
            console.error(err);
            return result;
        }
        console.log("clash Update: ");
        console.log(playerUpdate);
        console.log("err ");
        console.log(err);
        return true;
    });
    console.log("Update result");
    console.log(test);
    return clash;
}

async function deleteClash(clashID) {

    let clash = await clashModel.findById(clashID,(err, clashres) => {
        
        console.log("DELETE CLASH ! ");
        console.log(err);
        console.log("CLASH ELEMENT ! ");
        console.log(clashres);

        clashres.round.forEach(element => {
            console.log("ROUNDS OF  CLASH ! ");
            console.log(element);
            roundRepository.deleteRound(element._id);
        });
    });
    return await clashModel.findOneAndRemove({_id: clashID}, (err) => {
        console.log(err);
    });
}

module.exports = {
	getClash,
	addClash,
	updateClash,
	deleteClash
};
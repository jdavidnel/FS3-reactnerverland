import playerModel from '../../../types/Model/PlayerModel'

async function getPlayers(filters) {
   var getData = async () => {
        let list = [];
        await playerModel.find(filters,(err, player) => {
            if (err){
                console.log("error ");
                console.log(err); 
            }
            list.push(player);
        });
        return list;
    };
    return (await getData()).pop();
}

async function addPlayer(player)
{    
    let result = null;

    let listplayer = await getPlayers({ login: player.login });
    console.log(listplayer.length > 0);
    if (listplayer.length > 0)
        return result;
    let newplayer = new playerModel({ score: 0, login: player.login, mail: player.mail, mdp: player.mdp});
    await newplayer.save(function (err, player1) {
        if (err) {            
            console.error(err);
            return new Array();
        }
        result = newplayer;
    });
    return result;
}

async function updatePlayer(player) 
{
    let result = null;

    var id = player._id;
    delete player._id; 
    const test = await playerModel.update({_id: id } , { player }, { multi: false }, function (err, playerUpdate) {
        if (err) {            
            console.error(err);
            return result;
        }
        return true;
    });
    console.log("Update result");
    console.log(test);
    return playerUpdate;
}

function deletePlayer(playerId) {
    console.log("Not Implemented Update");
}

module.exports = {
	getPlayers,
	addPlayer,
	updatePlayer,
	deletePlayer
};
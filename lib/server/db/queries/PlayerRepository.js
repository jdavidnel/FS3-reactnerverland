"use strict";

var _PlayerModel = require("../../../types/Model/PlayerModel");

var _PlayerModel2 = _interopRequireDefault(_PlayerModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getPlayers(filters) {
    var getData = async function getData() {
        var list = [];
        await _PlayerModel2.default.find(filters, function (err, player) {
            if (err) {
                console.log("error ");
                console.log(err);
            }
            list.push(player);
        });
        return list;
    };
    return (await getData()).pop();
}

async function addPlayer(player) {
    var result = null;

    var listplayer = await getPlayers({ login: player.login });
    console.log(listplayer.length > 0);
    if (listplayer.length > 0) return result;
    var newplayer = new _PlayerModel2.default({ score: 0, login: player.login, mail: player.mail, mdp: player.mdp });
    await newplayer.save(function (err, player1) {
        if (err) {
            console.error(err);
            return new Array();
        }
        result = newplayer;
    });
    return result;
}

async function updatePlayer(player) {
    var result = null;

    var id = player._id;
    delete player._id;
    var test = await _PlayerModel2.default.update({ _id: id }, { player: player }, { multi: false }, function (err, playerUpdate) {
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
    getPlayers: getPlayers,
    addPlayer: addPlayer,
    updatePlayer: updatePlayer,
    deletePlayer: deletePlayer
};
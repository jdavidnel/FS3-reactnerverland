"use strict";

var _ClashModel = require("../../../types/Model/ClashModel");

var _ClashModel2 = _interopRequireDefault(_ClashModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getClash(filters) {
    var getData = async function getData() {
        console.log("test");
        var clashlist = [];
        await _ClashModel2.default.find(filters, function (err, clash) {
            if (err) {
                console.log("error ");
                console.log(err);
            }
            clashlist.push(clash);
        });
        return clashlist;
    };
    console.log("AFFICHE RESULATTA !!!");
    return (await getData()).pop();
    //return [{player_id:2, score: 17, login: "ok", mail: "NIQUE TA GRAND MERE", mdp: "VA TE FAIRE BAISER"}];
}

function addClash(clash) {
    console.log(clash);
}

function updateClash(clash) {
    console.log("Not Implemented Update");
}

function deleteClash(clashID) {
    console.log("Not Implemented delete");
}

module.exports = {
    getClash: getClash,
    addClash: addClash,
    updateClash: updateClash,
    deleteClash: deleteClash
};
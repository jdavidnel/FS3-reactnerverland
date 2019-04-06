"use strict";

var _RoundModel = require("../../../types/Model/RoundModel");

var _RoundModel2 = _interopRequireDefault(_RoundModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getRound(filters) {
    var getData = async function getData() {
        console.log("test");
        var list = [];
        await _RoundModel2.default.find(filters, function (err, clash) {
            if (err) {
                console.log("error ");
                console.log(err);
            }
            list.push(clash);
        });
        return list;
    };
    console.log("AFFICHE RESULATTA !!!");
    return (await getData()).pop();
}

function addRound(round) {
    console.log(round);
}

function updateRound(round) {
    console.log("Not Implemented Update");
}

function deleteRound(roundID) {
    console.log("Not Implemented delete");
}

module.exports = {
    getRound: getRound,
    addRound: addRound,
    updateRound: updateRound,
    deleteRound: deleteRound
};
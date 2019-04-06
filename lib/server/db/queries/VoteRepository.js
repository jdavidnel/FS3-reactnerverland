"use strict";

var _VoteModel = require("../../../types/Model/VoteModel");

var _VoteModel2 = _interopRequireDefault(_VoteModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getVote(filters) {
    var getData = async function getData() {
        console.log("test");
        var list = [];
        await _VoteModel2.default.find(filters, function (err, clash) {
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

function addVote(vote) {
    console.log(vote);
}

function updateVote(vote) {
    console.log("Not Implemented Update");
}

function deleteVote(voteID) {
    console.log("Not Implemented delete");
}

module.exports = {
    getVote: getVote,
    addVote: addVote,
    updateVote: updateVote,
    deleteVote: deleteVote
};
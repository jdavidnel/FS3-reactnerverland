"use strict";

var _MemeModel = require("../../../types/Model/MemeModel");

var _MemeModel2 = _interopRequireDefault(_MemeModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getMeme(filters) {
    var getData = async function getData() {
        console.log("test");
        var list = [];
        await _MemeModel2.default.find(filters, function (err, clash) {
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

function addMeme(meme) {
    console.log(clash);
}

function updateMeme(meme) {
    console.log("Not Implemented Update");
}

function deleteMeme(memeID) {
    console.log("Not Implemented delete");
}

module.exports = {
    getMeme: getMeme,
    addMeme: addMeme,
    updateMeme: updateMeme,
    deleteMeme: deleteMeme
};
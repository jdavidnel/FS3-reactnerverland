import roundModel from '../../../types/Model/RoundModel'

async function getRound(filters) {
   var getData = async () => {
        console.log("test");
        let list = [];
        await roundModel.find(filters,(err, clash) => {
            if (err){
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

function addRound(round)
{
    console.log(round);
}

function updateRound(round) {
    console.log("Not Implemented Update");
}

function deleteRound(roundID) {
    console.log("Not Implemented delete");
}

module.exports = {
	getRound,
	addRound,
	updateRound,
	deleteRound
};
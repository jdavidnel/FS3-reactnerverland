import voteModel from '../../../types/Model/VoteModel'

async function getVote(filters) {
   var getData = async () => {
        console.log("test");
        let list = [];
        await voteModel.find(filters,(err, clash) => {
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

function addVote(vote)
{
    console.log(vote);
}

function updateVote(vote) {
    console.log("Not Implemented Update");
}

function deleteVote(voteID) {
    console.log("Not Implemented delete");
}

module.exports = {
	getVote,
	addVote,
	updateVote,
	deleteVote
};
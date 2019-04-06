import clashModel from '../../../types/Model/ClashModel'

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
    //return [{player_id:2, score: 17, login: "ok", mail: "NIQUE TA GRAND MERE", mdp: "VA TE FAIRE BAISER"}];
}

function addClash(clash)
{
    console.log(clash);
}

function updateClash(clash) {
    console.log("Not Implemented Update");
}

function deleteClash(clashID) {
    console.log("Not Implemented delete");
}

module.exports = {
	getClash,
	addClash,
	updateClash,
	deleteClash
};
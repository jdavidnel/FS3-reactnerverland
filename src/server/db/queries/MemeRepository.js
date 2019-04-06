import memeModel from '../../../types/Model/MemeModel'

async function getMeme(filters) {
   var getData = async () => {
        console.log("test");
        let list = [];
        await memeModel.find(filters,(err, clash) => {
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

function addMeme(meme)
{
    console.log(clash);
}

function updateMeme(meme) {
    console.log("Not Implemented Update");
}

function deleteMeme(memeID) {
    console.log("Not Implemented delete");
}

module.exports = {
	getMeme,
	addMeme,
	updateMeme,
	deleteMeme
};
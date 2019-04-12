import { IMeme, memeModel } from '../../../types/Model/MemeModel'
import RepositoryBase from '../../../types/Repository';

export class MemeRepository implements RepositoryBase<IMeme> {

    constructor() {
        console.log("New Meme Repository");
    }

    public create(model: IMeme, callback: (error: any, result: IMeme) => void): IMeme {
        return model;
    }

    public retrieve(callback: (error: any, result: IMeme) => void): void {

    }

    public update(_id: string, item: IMeme, callback: (error: any, result: any) => void): void {

    }

    public delete(_id: string, callback: (error: any, result: any) => void): void {

    }

    public async findById(_id: string, callback: (error: any, result: IMeme) => void): Promise<void> {
        console.log("find on by id MEME");
        console.log(memeModel.findById(_id, callback));
    }

    public async getMeme(filters: any): Promise<IMeme[]> {
        var getData = async () => {
            console.log("get MEME");
            let list: IMeme[] = [];
            await memeModel.find(filters, (err: any, clash: IMeme) => {
                if (err) {
                    console.log("error ");
                    console.log(err);
                }
                list.push(clash);
            });
            return list;
        };
        return (await getData());
    }

    public async addMeme(meme: any): Promise<any> {
        let result: IMeme;

        let newMeme = new memeModel({ image: meme.image, player: meme.player });
        await newMeme.save((err, savedObj: IMeme) => {
            // some error occurs during save
            if (err) throw err;
            // for some reason no saved obj return
            else if (!savedObj) throw new Error("no object found")
            else console.log(savedObj);
            result = savedObj;
        });
        return null;
    }

    public async updateMeme(meme: any): Promise<any> {

        var id = meme._id;
        delete meme._id;
        console.log("Meme");
        console.log(meme);

        const test = await memeModel.update({ _id: id }, meme, { multi: false }, function (err: any, savedObj: IMeme) {
            // some error occurs during save
            if (err) throw err;
            // for some reason no saved obj return
            else if (!savedObj) throw new Error("no object found")
            else console.log(savedObj);
        });
        return meme;
    }

    public async deleteMeme(memeID: String): Promise<any> {
        return null;
    }

}
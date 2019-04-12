import { IMeme, memeModel } from '../../../types/Model/MemeModel'
import RepositoryBase from '../../../types/Repository';
import { PlayerRepository } from './PlayerRepository';

export class MemeRepository extends RepositoryBase<IMeme> {

    constructor() {
        super(memeModel);
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

    public async memeExist(memeID: string): Promise<boolean> {
        let result: boolean = false;
        let meme: any = await this.findById(memeID);
        if (meme != undefined)
            return true;
        return result;
    }

    public async addMeme(meme: any): Promise<any> {
        let result: any = null;
        let isExist: Boolean = await (new PlayerRepository()).playerExist(meme.meme.player);

        if (isExist == false)
            return undefined;
        let newMeme = new memeModel({ image: meme.image, player: meme.player });
        result = await newMeme.save();
        console.log("Update Players");
        console.log(result);
        return result;
    }

    public async updateMeme(meme: any): Promise<any> {
        let updatedMeme: any = null;
        var id = meme._id;
        delete meme._id;

        if (meme.player != undefined && !(await (new PlayerRepository()).playerExist(meme.player)))
            return undefined;

        const test = await memeModel.update({ _id: id }, meme, { multi: false }, function (err: any, savedObj: IMeme) {
            // some error occurs during save
            if (err) throw err;
            // for some reason no saved obj return
            else if (!savedObj) throw new Error("no object found")
            else
                updatedMeme = savedObj;
        });
        console.log("Update Meme");
        console.log(updatedMeme);
        return meme;
    }

    public async deleteMeme(memeID: String): Promise<any> {
        const i = await memeModel.findOneAndRemove({ _id: memeID }, (err, savedObj) => {
            if (err) throw err;
            // for some reason no saved obj return
            else if (!savedObj) throw new Error("no object found")
            else console.log(savedObj);
        });
        console.log("deleted Meme");
        return null;
    }

}
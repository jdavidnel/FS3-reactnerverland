import { IMeme, memeModel } from '../../../types/Model/MemeModel'
import RepositoryBase from '../../../types/Repository';
import { PlayerRepository } from './PlayerRepository';

export class MemeRepository extends RepositoryBase<IMeme> {
    private _playerRepo: PlayerRepository;

    constructor(playerRepo: PlayerRepository) {
        super(memeModel);
        this._playerRepo = playerRepo;
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

    public async addMeme(filters: any): Promise<any> {
        let result: any = null;
        let isExist: Boolean = await this._playerRepo.isExist(filters.player);

        if (!isExist)
            return undefined;
        let newMeme = new memeModel(filters);
        result = await newMeme.save();
        console.log("Update Meme");
        console.log(result);
        return result;
    }

    public async updateMeme(meme: any): Promise<any> {
        let updatedMeme: any = null;
        var id = meme._id;
        delete meme._id;
        updatedMeme = await this._model.findOneAndUpdate({ _id: id }, meme, { multi: false });
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
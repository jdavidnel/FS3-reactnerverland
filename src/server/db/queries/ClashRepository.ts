import { clashModel, IClash } from '../../../types/Model/ClashModel'
import RepositoryBase from '../../../types/Repository';
import { PlayerRepository } from './PlayerRepository';
import { RoundRepository } from './RoundRepository';

export class ClashRepository implements RepositoryBase<IClash> {

    constructor() {
        console.log("New Clash Repository");
    }

    public create(model: IClash, callback: (error: any, result: IClash) => void): IClash {
        return model;
    }

    public retrieve(callback: (error: any, result: IClash) => void): void {

    }

    public update(_id: string, item: IClash, callback: (error: any, result: any) => void): void {

    }

    public delete(_id: string, callback: (error: any, result: any) => void): void {

    }

    public findById(_id: string, callback: (error: any, result: IClash) => void): void {

    }
    public async getClash(filters: any): Promise<IClash[]> {
        var getData = async () => {
            console.log("test");
            let clashlist: IClash[] = [];
            await clashModel.find(filters, (err, clash: IClash) => {
                if (err) {
                    console.log("error ");
                    console.log(err);
                }
                clashlist.push(clash);
            });
            return clashlist;
        };
        console.log("AFFICHE RESULATTA !!!");
        return (await getData());
    }

    public async addClash(clash: IClash): Promise<any> {
        let result: any = null;

        /*let competitors1 = await (new PlayerRepository).getPlayers({ _id: clash.competitors[0] });
        let competitors2 = await (new PlayerRepository).getPlayers({ _id: clash.competitors[1] });

        if (competitors1 == undefined || competitors2 == undefined) {
            return null;
        }*/
        let newClash = new clashModel(clash);
        await newClash.save(function (err, player1) {
            if (err) {
                console.error(err);
                return new Array();
            }
            result = newClash;
        });
        return result;
    }

    public async updateClash(clash: IClash): Promise<any> {
        let result: any = null;

        var id = clash._id;
        delete clash._id;
        console.log("clash");
        console.log(clash);

        const test = await clashModel.update({ _id: id }, clash, { multi: false }, function (err, clashUpdate) {
            if (err) {
                console.error(err);
                return result;
            }
            console.log("clash Update: ");
            console.log(clashUpdate);
            console.log("err ");
            console.log(err);
            return true;
        });
        console.log("Update result");
        console.log(test);
        return clash;
    }

    public async deleteClash(clashID: string): Promise<any> {

        let clash = await clashModel.findById(clashID, (err, clashres: IClash) => {

            console.log("DELETE CLASH ! ");
            console.log(err);
            console.log("CLASH ELEMENT ! ");
            console.log(clashres);

            clashres.round.forEach(element => {
                console.log("ROUNDS OF  CLASH ! ");
                console.log(element);
                (new RoundRepository).deleteRound(element);
            });
        });
        return await clashModel.findOneAndRemove({ _id: clashID }, (err) => {
            console.log(err);
        });
    }
}
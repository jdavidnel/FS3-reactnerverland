import { clashModel, IClash } from '../../../types/Model/ClashModel'
import RepositoryBase from '../../../types/Repository';
import { PlayerRepository } from './PlayerRepository';
import { RoundRepository } from './RoundRepository';
import * as _ from 'lodash';

export class ClashRepository extends RepositoryBase<IClash> {

    constructor() {
        super(clashModel);
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

    public async getClash(filters: any): Promise<IClash[]> {
        var getData = async () => {
            let clashlist: IClash[] = new Array<IClash>();
            await this._model.find(filters, (err: any, clash: IClash) => {
                if (err) {
                    console.log("error ");
                    console.log(err);
                }
                clashlist.push(clash);
            });
            console.log("get Clashs");
            console.log(clashlist);
            return clashlist;
        };
        return (await getData());
    }

    public async addClash(filters: any): Promise<any> {
        let competitors1 = await (new PlayerRepository).findById(filters.f_competitors as string);
        let competitors2 = await (new PlayerRepository).findById(filters.nd_competitors as string);

        if (_.isNil(competitors1) || _.isNil(competitors2)) {
            console.log("competiteur n'existe pas!");
            return null;
        }
        let clash: any = null;
        delete filters._id;
        let newClash = new clashModel(filters);
        clash = await newClash.save();
        console.log("add clash");
        console.log(clash);
        return clash;
    }

    public async updateClash(clash: any): Promise<any> {
        let updatedClash: any = null;
        let winner: boolean = await (new PlayerRepository).playerExist(clash.winner);
        let suscriber: boolean = await (new PlayerRepository).playerExist(clash.suscribers);

        if ((!winner && clash.winner != undefined) || (!suscriber && clash.suscriber != undefined))
            return null;
        var id = clash._id;
        delete clash._id;
        const test = await this._model.update({ _id: id }, clash, { multi: false }, function (err: any, clashUpdate: IClash) {
            if (err) throw err;
            // for some reason no saved obj return
            else if (!clashUpdate) throw new Error("no object found")
            else updatedClash = clashUpdate;
        });
        console.log("Update Players");
        console.log(updatedClash);
        return updatedClash;
    }

    public async deleteClash(clashID: string): Promise<any> {

        let clash = await this._model.findById(clashID, (err: any, clashres: IClash) => {

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
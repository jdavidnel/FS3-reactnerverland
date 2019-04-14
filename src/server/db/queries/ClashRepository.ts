import { clashModel, IClash } from '../../../types/Model/ClashModel'
import RepositoryBase from '../../../types/Repository';
import { PlayerRepository } from './PlayerRepository';
import { RoundRepository } from './RoundRepository';
import * as _ from 'lodash';
import { IRound } from '../../../types/Model/RoundModel';

export class ClashRepository extends RepositoryBase<IClash> {

    private _playerModel: PlayerRepository;
    private _roundModel: RoundRepository;

    constructor(playerRepo: PlayerRepository, roundRepo: RoundRepository) {
        super(clashModel);
        this._playerModel = playerRepo;
        this._roundModel = roundRepo;
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

    public async addClash(filters: any): Promise<any> {
        let competitors1: boolean = await this._playerModel.isExist(filters.f_competitors as string);
        let competitors2: boolean = await this._playerModel.isExist(filters.nd_competitors as string);

        if (!competitors1 || !competitors2) {
            console.log("competiteur n'existe pas!");
            return null;
        }
        let clash: any = null;
        let rounds: IRound[] = new Array<IRound>();

        for (var i = 0; i < 3; i++) {
            let round: any = await this._roundModel.addRound({});
            if (!_.isNil(round))
                rounds.push(round);
        }
        filters.round = rounds;
        filters.inprogress = true;
        let newClash = new clashModel(filters);
        clash = await newClash.save();
        console.log("add clash");
        console.log(clash);
        return clash;
    }

    public async updateClash(clash: any): Promise<any> {
        let updatedClash: any = null;
        var id = clash._id;
        delete clash._id;
        let suscriberExist: boolean = await this._playerModel.isExist(clash.suscribers);
        let clashExist: boolean = await this.isExist(id);

        if (!clashExist || !suscriberExist) {
            console.log("suscriber not found");
            return null;
        }
        let suscribers: string[] = (await this.findById(id)).suscribers;
        suscribers.push(clash.suscribers);
        updatedClash = await this._model.findOneAndUpdate({ _id: id }, { suscribers: suscribers }, { multi: false });
        console.log("Update Players");
        console.log(updatedClash);

        return updatedClash;
    }

    public async deleteClash(clashID: string): Promise<any> {
        let clashExist: boolean = await this.isExist(clashID);

        if (!clashExist)
            return null;
        console.log("ClashID : ");
        console.log(clashID);
        let clash = await this._model.findById(clashID, (err: any, clashres: IClash) => {

            console.log("DELETE CLASH ! ");
            console.log(err);
            console.log("CLASH ELEMENT ! ");
            console.log(clashres);

            clashres.round.forEach(element => {
                console.log("ROUNDS OF  CLASH ! ");
                console.log(element);
                this._roundModel.deleteRound(element);
            });
        });
        return await clashModel.findOneAndRemove({ _id: clashID }, (err) => {
            console.log(err);
        });
    }
}
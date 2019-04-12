import { roundModel, IRound } from '../../../types/Model/RoundModel'
import RepositoryBase from '../../../types/Repository';
import { PlayerRepository } from './PlayerRepository';
import { MemeRepository } from './MemeRepository';
import { IPlayer } from '../../../types/Model/PlayerModel';
import { error } from 'util';

export class RoundRepository extends RepositoryBase<IRound> {

    constructor() {
        super(roundModel);
        console.log("New Round Repository");
    }

    public create(model: IRound, callback: (error: any, result: IRound) => void): IRound {
        return model;
    }

    public retrieve(callback: (error: any, result: IRound) => void): void {

    }

    public update(_id: string, item: IRound, callback: (error: any, result: any) => void): void {

    }

    public delete(_id: string, callback: (error: any, result: any) => void): void {

    }

    public async getRound(filters: any): Promise<IRound[]> {
        var getData = async () => {
            let list: IRound[] = new Array<IRound>();
            await roundModel.find(filters, (err: any, round: IRound) => {
                if (err) {
                    console.log("error ");
                    console.log(err);
                }
                list.push(round);
            });
            console.log("get Rounds");
            console.log(list);
            return list;
        };
        return (await getData());
    }

    public async addRound(round: any): Promise<any> {
        let winner: boolean = await (new PlayerRepository()).playerExist(round.winner);
        if (round.winner != undefined && !winner)
            return null;
        let newRound = new roundModel({ meme: round.meme, Vote: round.vote, winner: round.winner })
        let roundResult: any = null;
        roundResult = await newRound.save();
        console.log("add clash");
        console.log(roundResult);
        return roundResult;
    }

    public async updateRound(filters: any): Promise<any> {
        let updatedRound: any = null;
        let f_meme: boolean = await (new MemeRepository()).memeExist(filters.f_meme);
        let nd_meme: boolean = await (new MemeRepository()).memeExist(filters.nd_meme);
        let winner: boolean = await (new PlayerRepository()).playerExist(filters.winner);

        if ((!f_meme && filters.f_meme != undefined) || (!nd_meme && filters.nd_meme != undefined))
            return null;
        if ((!winner && filters.winner != undefined))
            return null;
        var id = filters._id;
        delete filters._id;
        const test = await roundModel.update({ _id: id }, filters, { multi: false }, function (err, clashUpdate: IRound) {
            if (err) throw err;
            // for some reason no saved obj return
            else if (!clashUpdate) throw new Error("no object found")
            else updatedRound = clashUpdate;
        });
        console.log("Update Players");
        console.log(updatedRound);
        return updatedRound;
    }

    public async deleteRound(roundID: string): Promise<any> {
        return null;
    }
}
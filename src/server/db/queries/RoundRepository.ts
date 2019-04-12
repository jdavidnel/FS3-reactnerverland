import { roundModel, IRound } from '../../../types/Model/RoundModel'
import RepositoryBase from '../../../types/Repository';
import { PlayerRepository } from './PlayerRepository';
import { IPlayer } from '../../../types/Model/PlayerModel';
import { error } from 'util';

export class RoundRepository implements RepositoryBase<IRound> {

    constructor() {
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

    public findById(_id: string, callback: (error: any, result: IRound) => void): void {

    }

    public async getRound(filters: any): Promise<IRound[]> {
        var getData = async () => {
            console.log("test");
            let list: IRound[] = [];
            await roundModel.find(filters, (err: any, round: IRound) => {
                if (err) {
                    console.log("error ");
                    console.log(err);
                }
                list.push(round);
            });
            return list;
        };
        console.log("AFFICHE RESULATTA !!!");
        return (await getData());
    }

    public async addRound(round: any): Promise<any> {
        let winner: IPlayer[] = await (new PlayerRepository()).getPlayers({ _id: round.winner });
        if (winner.length == 0)
            return null;
        let newRound = new roundModel({ meme: round.meme, Vote: round.vote, winner: round.winner })

        await newRound.save((err, savedObj: IRound) => {
            // some error occurs during save
            if (err) throw err;
            // for some reason no saved obj return
            else if (!savedObj) throw new Error("no object found")
            else console.log(savedObj);
            round = savedObj;
        });
        return round;
    }

    public async updateRound(round: any): Promise<any> {
        return null;
    }

    public async deleteRound(roundID: string): Promise<any> {
        return null;
    }
}
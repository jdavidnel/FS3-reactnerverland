import { roundModel, IRound } from '../../../types/Model/RoundModel'
import RepositoryBase from '../../../types/Repository';
import { PlayerRepository } from './PlayerRepository';
import { MemeRepository } from './MemeRepository';
import { IPlayer } from '../../../types/Model/PlayerModel';
import { error } from 'util';
import { IVote } from '../../../types/Model/VoteModel';
import { VoteRepository } from './VoteRepository';
import * as _ from 'lodash';

export class RoundRepository extends RepositoryBase<IRound> {

    private _memeRepo: MemeRepository;

    constructor(memeRepo: MemeRepository) {
        super(roundModel);
        this._memeRepo = memeRepo;
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

    public async addRound(filters: any): Promise<any> {
        let newRound = new roundModel(filters);
        let roundResult: any = null;
        roundResult = await newRound.save();
        console.log("add Meme");
        console.log(roundResult);
        return roundResult;
    }

    public async updateRound(filters: any): Promise<any> {
        let updatedRound: any = null;
        let f_meme: boolean = await this._memeRepo.isExist(filters.f_meme);
        let nd_meme: boolean = await this._memeRepo.isExist(filters.nd_meme);

        if (!nd_meme && !f_meme) {
            console.log("Meme not found");
            return null;
        }
        var id = filters._id;
        delete filters._id;
        updatedRound = await roundModel.findOneAndUpdate({ _id: id }, filters);
        console.log("Update Round");
        console.log(updatedRound);
        return updatedRound;
    }

    public async deleteRound(roundID: string): Promise<any> {
        return null;
    }

    public async vote(roundID: string): Promise<any[]> {
        let round: any = await this.findById(roundID);
        const votes = await Promise.all(round.vote.map(async (voteID: any) => {
            const vote = await VoteRepository.getVote(voteID);
            if (!_.isNil)
                return vote;
        }));
        return votes;
    }
}
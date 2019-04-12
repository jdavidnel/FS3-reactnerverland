import { voteModel, IVote } from '../../../types/Model/VoteModel'
import RepositoryBase from '../../../types/Repository';
import { error } from 'util';

export class VoteRepository implements RepositoryBase<IVote> {

    constructor() {
        console.log("New Vote Repository");
    }

    public create(model: IVote, callback: (error: any, result: IVote) => void): IVote {
        return model;
    }

    public retrieve(callback: (error: any, result: IVote) => void): void {

    }

    public update(_id: string, item: IVote, callback: (error: any, result: any) => void): void {

    }

    public delete(_id: string, callback: (error: any, result: any) => void): void {

    }

    public findById(_id: string, callback: (error: any, result: IVote) => void): void {
        console.log("find on by id VOTE");
        console.log(voteModel.findById(_id, callback));
    }

    public async getVote(filters: any): Promise<IVote[]> {
        var getData = async () => {
            console.log("test");
            let list: IVote[] = [];
            await voteModel.find(filters, (err: any, vote: IVote) => {
                if (err) {
                    console.log("error ");
                    console.log(err);
                }
                list.push(vote);
            });
            return list;
        };
        console.log("AFFICHE RESULATTA !!!");
        return (await getData());
    }

    public async addVote(vote: any): Promise<any> {
        return null;
    }

    public async updateVote(vote: any): Promise<any> {
        return null;
    }

    public async deleteVote(voteID: string): Promise<any> {
        return null;
    }
}
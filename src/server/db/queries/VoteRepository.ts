import { voteModel, IVote } from '../../../types/Model/VoteModel'
import RepositoryBase from '../../../types/Repository';
import { error } from 'util';

export class VoteRepository extends RepositoryBase<IVote> {

    constructor() {
        super(voteModel);
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


    public async getVote(filters: any): Promise<IVote[]> {
        var getData = async () => {
            console.log("test");
            let list: IVote[] = [];
            await this._model.find(filters, (err: any, vote: IVote) => {
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
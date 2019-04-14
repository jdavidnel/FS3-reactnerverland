import { voteModel, IVote } from '../../../types/Model/VoteModel'
import RepositoryBase from '../../../types/Repository';
import { error } from 'util';
import { PlayerRepository } from './PlayerRepository';
import { RoundRepository } from './RoundRepository';
import { MemeRepository } from './MemeRepository';

export class VoteRepository extends RepositoryBase<IVote> {

    private _playerRepo: PlayerRepository;
    private _memeRepo: MemeRepository;
    private _roundRepo: RoundRepository;

    constructor(playerRepo: PlayerRepository, memeRepo: MemeRepository, roundRepo: RoundRepository) {
        super(voteModel);
        this._playerRepo = playerRepo;
        this._memeRepo = memeRepo;
        this._roundRepo = roundRepo;
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

    public static async getVote(ID: string): Promise<any> {
        return await voteModel.findById(ID);
    }

    public async addVote(filters: any): Promise<any> {
        let user: boolean = await this._playerRepo.isExist(filters.user);
        let meme: boolean = await this._memeRepo.isExist(filters.for);
        //let round: boolean = await this._roundRepo.isExist(filters.roundID);

        if (!user || /*!round || */ !meme)
            return null;
        let vote: any;
        let alreadyVote: any = await this._roundRepo.vote(filters.roundID)
        //CHECKER DANS LA LISTE DE VOTE RECUPERER SI L'UTILISATEUR A DEJA VOTÉR
        let newVote = new voteModel({ user: filters.user, for: filters.for });
        vote = await newVote.save();
        console.log("add vote");
        console.log(vote);
        return vote;

    }

    public async updateVote(filters: any): Promise<any> {
        var id = filters._id;
        delete filters._id;
        let updatedVote: any = null;
        let vote: boolean = await this.isExist(id);
        let meme: boolean = await this._memeRepo.isExist(filters.for);
        if (!vote || !meme)
            return null;
        updatedVote = await this._model.findOneAndUpdate({ _id: id }, { for: filters.for }, { multi: false });
        console.log("Update Vote");
        console.log(updatedVote);
        return updatedVote;
    }

    public async deleteVote(voteID: string): Promise<any> {
        return null;
    }
}
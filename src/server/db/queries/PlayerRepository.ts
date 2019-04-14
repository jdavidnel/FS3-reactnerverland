import { IPlayer, playerModel } from '../../../types/Model/PlayerModel';
import RepositoryBase, { Callback } from '../../../types/Repository';
import { PromiseResolve, PromiseReject } from '../../../types/Repository';
import * as _ from 'lodash';

export class PlayerRepository extends RepositoryBase<IPlayer> {

    constructor() {
        super(playerModel);
        console.log("New Player Repository");
    }

    public create(model: IPlayer, callback: (error: any, result: IPlayer) => void): IPlayer {
        return model;
    }

    public retrieve(callback: (error: any, result: IPlayer) => void): void {

    }

    public update(_id: string, item: IPlayer, callback: (error: any, result: any) => void): void {

    }

    public delete(_id: string, callback: (error: any, result: any) => void): void {

    }

    public async getPlayers(filters: any): Promise<IPlayer[]> {

        let list: IPlayer[] = new Array<IPlayer>();
        list = await this._model.find(filters);
        for (var index in list) {
            delete list[index].mdp;
        }
        console.log("getplayers");
        console.log(list);
        return list;
    }

    public async addPlayer(filters: any): Promise<any> {
        console.log("test");
        let listplayer: IPlayer[] = await this.get({ login: filters.login });
        console.log(listplayer);
        if (listplayer.length > 0)
            return null;
        let player: any = null;
        let newplayer = new playerModel({ score: 0, login: filters.login, mail: filters.mail, mdp: filters.mdp });

        player = await newplayer.save();
        console.log("add Players");
        console.log(player);
        return (player);
    }

    public async updatePlayer(player: any): Promise<any> {
        let updateplayer: any = null;
        var id = player._id;
        delete player._id;
        let playerExist: boolean = await this.isExist(id);

        if (!playerExist) {
            console.log("player not found");
            return null;
        }
        updateplayer = await this._model.findOneAndUpdate({ _id: id }, player, { multi: false });
        console.log("Update Players");
        console.log(updateplayer);
        return updateplayer;
    }

    public async deletePlayer(playerId: string): Promise<any> {
        return await this._model.findOneAndRemove({ _id: playerId }, (err: any, savedObj: any) => {
            if (err) throw err;
            else if (!savedObj) throw new Error("no object found")
            else console.log(savedObj);
        });
    }
};
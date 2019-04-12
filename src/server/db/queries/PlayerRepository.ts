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

        //var getData = async () => {
        let list: IPlayer[] = new Array<IPlayer>();
        await this._model.find(filters, (err: any, player: IPlayer) => {
            if (err) {
                console.log("error ");
                console.log(err);
            }
            list.unshift(player);
        });
        console.log("getplayers");
        console.log(list);
        //};
        return list;
    }

    public async addPlayer(filters: any): Promise<any> {
        console.log("test");
        /*let listplayer: IPlayer[] = await this.getPlayers({ login: filters.login });
        console.log(listplayer);
        if (listplayer.length > 0)
            return null;*/
        //var getData = async () => {
        /*let checkplayer: any = undefined;
        if (_.isNil(checkplayer)) {
            return null;
        }*/
        let player: any = null;
        let newplayer = new playerModel({ score: 0, login: filters.login, mail: filters.mail, mdp: filters.mdp });

        player = await newplayer.save();
        console.log("add Players");
        console.log(player);
        /* return player;
 };*/
        return (player);
    }

    public async updatePlayer(player: any): Promise<any> {
        let updateplayer: any = null;

        var getData = async () => {
            var id = player._id;
            if (id == undefined || id == null)
                return updateplayer;
            delete player._id;
            await this._model.update({ _id: id }, player, { multi: false }, function (err: any, savedObj: IPlayer) {
                // some error occurs during save
                if (err) throw err;
                // for some reason no saved obj return
                else if (!savedObj) throw new Error("no object found")
                else updateplayer = savedObj;
            });
            console.log("Update Players");
            console.log(updateplayer);
            return updateplayer;
        };
        return (await getData());
    }

    public async playerExist(playerId: string): Promise<boolean> {
        let result: boolean = false;
        let player: any = await this.findById(playerId);
        if (!_.isNil(player))
            return true;
        return result;
    }

    public async deletePlayer(playerId: string): Promise<any> {
        const i = await this._model.findOneAndRemove({ _id: playerId }, (err: any, savedObj: any) => {
            if (err) throw err;
            else if (!savedObj) throw new Error("no object found")
            else console.log(savedObj);
        });
        console.log("deleted Players");
        return null;
    }
};
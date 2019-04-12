import { IPlayer, playerModel } from '../../../types/Model/PlayerModel';
import RepositoryBase, { Callback } from '../../../types/Repository';
import { PromiseResolve, PromiseReject } from '../../../types/Repository';

export class PlayerRepository implements RepositoryBase<IPlayer> {

    constructor() {
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

    public async findById(_id: string, callback?: (error: any, result: IPlayer) => void): Promise<any> {
        let player: any = null;
        var fnc: any = playerModel.findById;

        if (callback != undefined || callback != null)
            fnc(_id, callback);
        else {
            await fnc(_id, (error: any, result: IPlayer) => {
                player = result;
            });
        }
        return player;
    }

    public async getPlayers(filters: any): Promise<IPlayer[]> {

        var getData = async () => {
            let list: IPlayer[] = new Array<IPlayer>();;
            console.log("resultat FINDPLAYERS")
            await playerModel.find(filters, (err: any, player: IPlayer) => {
                if (err) {
                    console.log("error ");
                    console.log(err);
                }
                list.unshift(player);
            });
            console.log("Ca casse les couilles getplayers");
            console.log(list);
            return list;
        };
        return (await getData());
    }

    public async addPlayer(filters: any): Promise<any> {
        let listplayer: IPlayer[] = await this.getPlayers({ login: filters.login });
        console.log(listplayer.length > 0);
        if (listplayer.length > 0)
            return null;
        var getData = async () => {
            let player: any = null;
            let newplayer = new playerModel({ score: 0, login: filters.login, mail: filters.mail, mdp: filters.mdp });

            console.log("resultat FINDPLAYERS")
            await newplayer.save((err, savedObj: IPlayer) => {
                // some error occurs during save
                if (err) throw err;
                // for some reason no saved obj return
                else if (!savedObj) throw new Error("no object found")
                else console.log(savedObj);
                player = savedObj;
            });
            console.log("Ca casse les couilles getplayers");
            console.log(player);
            return player;
        };
        return (await getData());
    }

    public async updatePlayer(player: any): Promise<any> {
        let updateplayer: any = null;

        var getData = async () => {
            var id = player._id;
            if (id == undefined || id == null)
                return updateplayer;
            delete player._id;
            console.log("resultat FINDPLAYERS")
            await playerModel.update({ _id: id }, player, { multi: false }, function (err, savedObj) {
                // some error occurs during save
                if (err) throw err;
                // for some reason no saved obj return
                else if (!savedObj) throw new Error("no object found")
                else updateplayer = savedObj;
            });
            console.log("Ca casse les couilles getplayers");
            console.log(player);
            return updateplayer;
        };
        return (await getData());
    }

    public async deletePlayer(playerId: string): Promise<any> {
        const i = await playerModel.findOneAndRemove({ _id: playerId }, (err, savedObj) => {
            if (err) throw err;
            // for some reason no saved obj return
            else if (!savedObj) throw new Error("no object found")
            else console.log(savedObj);
        });
        console.log(i);
        return null;
    }
};
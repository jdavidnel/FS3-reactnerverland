/*import * as mongoose from 'mongoose';
import { PlayerCollection, IPlayer } from './Model/PlayerModel'
export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface RepositoryBase<T extends mongoose.Document> {

    //private _model: mongoose.Model<mongoose.Document>;

    create(item: T, callback: (error: any, result: T) => void): void;

    retrieve(callback: (error: any, result: T) => void): void;

    update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void): void;

    delete(_id: string, callback: (error: any, result: any) => void): void;

    findById(_id: string, callback: (error: any, result: T) => void): void;

    findOne(cond?: Object, callback?: (err: any, res: T) => void): mongoose.Query<T>;

    find(cond?: Object, fields?: Object, options?: Object, callback?: (err: any, res: T[]) => void): mongoose.Query<T[]>;

}

export class playerRepository implements RepositoryBase<IPlayer>{

    private _model: mongoose.Model<mongoose.Document>;

    constructor() {
        this._model = PlayerCollection;
    }

    public create(item: IPlayer, callback: (error: any, result: IPlayer) => void) {
        this._model.create(item, callback);
    }

    public retrieve(callback: (error: any, result: IPlayer) => void) {
        this._model.find({}, callback);
    }

    public update(_id: mongoose.Types.ObjectId, item: IPlayer, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, item, callback);
    }

    public delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
    }

    public findById(_id: string, callback: (error: any, result: IPlayer) => void) {
        this._model.findById(_id, callback);
    }

    public findOne(cond?: Object, callback?: (err: any, res: IPlayer) => void): mongoose.Query<T> {
        return this._model.findOne(cond, callback);
    }

    public find(cond?: Object, fields?: Object, options?: Object, callback?: (err: any, res: T[]) => void): mongoose.Query<T[]> {
        return this._model.find(cond, options, callback);
    }

    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }
}*/

export type Callback<T> = (data: T, error?: Error) => void;
export type PromiseResolve<T> = (value: T | PromiseLike<T>) => void;
export type PromiseReject = (error?: any) => void;

export default interface RepositoryBase<T> {

    create(model: T, callback: (error: any, result: T) => void): void;
    retrieve(callback: (error: any, result: T) => void): void;
    update(_id: string, item: T, callback: (error: any, result: any) => void): void;
    delete(_id: string, callback: (error: any, result: any) => void): void;
    findById(_id: string, callback: (error: any, result: T) => void): void;
    //findOne(cond?: Object, callback?: (err: any, res: T) => void): mongoose.Query<T>;
    //find(cond?: Object, fields?: Object, options?: Object, callback?: (err: any, res: T[]) => void): mongoose.Query<T[]>;

}
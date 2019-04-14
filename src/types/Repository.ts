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
import * as _ from 'lodash';
import { Document, model, Model, Schema } from 'mongoose';

export default abstract class RepositoryBase<T> {

    public _model: any;

    constructor(model: any) {
        this._model = model;
    }

    abstract create(model: T, callback: (error: any, result: T) => void): void;
    abstract retrieve(callback: (error: any, result: T) => void): void;
    abstract update(_id: string, item: T, callback: (error: any, result: any) => void): void;
    abstract delete(_id: string, callback: (error: any, result: any) => void): void;

    protected deleteNilAttr(object: any, arrayID: string[]) {
        for (var property in object) {
            if (object.hasOwnProperty(property) && arrayID.indexOf(property) != -1) {
                console.log("affiche proprieté object");
                console.log(property);
                delete object.property;
            }
        }
    }

    public async isExist(ID: string): Promise<boolean> {
        let model: any = await this.findById(ID);
        if (!_.isNil(model))
            return true;
        return false;
    }

    public async get(filters: any): Promise<T[]> {
        let list: T[] = new Array<T>();

        list = await this._model.find(filters);
        console.log("get list");
        console.log(list);
        return list;
    }

    public async findById(_id: string, callback?: (error: any, result: T) => void): Promise<any> {
        if (_.isNil(_id))
            return null;
        let model: any = undefined;

        if (!_.isNil(callback))
            return this._model.findById(_id, callback);
        else {
            await this._model.findById(_id, (error: any, result: T) => {
                if (error)
                    throw error;
                else if (!result)
                    throw new Error("no object found")
                else
                    model = result;
            });
        }
        return model;
    }
    //findOne(cond?: Object, callback?: (err: any, res: T) => void): mongoose.Query<T>;
    //find(cond?: Object, fields?: Object, options?: Object, callback?: (err: any, res: T[]) => void): mongoose.Query<T[]>;

}
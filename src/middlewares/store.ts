
import {Request, Response, NextFunction} from 'express';
import { COLLECTION_STORES } from '../db/collections';
import { DbClient } from '../db/conn';
import { IStoreModel } from '../db/models/IStoreModel';

export const storeMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const db = await DbClient.connect();
        let payload:IStoreModel = req.body;
        let storeName: string = req.params.name as string;

        const store = await db.collection(COLLECTION_STORES).find({name: storeName}).toArray();
        if ( store.length > 0 ) {
            const { _id } = store[0];
            payload["updatedAt"] = new Date().toISOString();
            const updatedStore = await db.collection(COLLECTION_STORES).findOneAndUpdate(
                { "_id": _id},
                {$set: payload},
                {upsert: true});

            res.status(200).json(updatedStore)
        } else {
            res.status(400).json({
                "message":"erreur update",
                "reason": `No store for name ${storeName}`
            })
        }
    } catch ( e ) {
            res.status(500).json({
                "message": "erreur server",
                "reason": e
            })
    }



}


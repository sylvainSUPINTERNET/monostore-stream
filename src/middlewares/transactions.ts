import { NextFunction, Request, Response } from "express";
import { COLLECTION_TRANSACTIONS } from "../db/collections";
import { DbClient } from "../db/conn";
import { ITransaction } from "../db/models/ITransaction";

/**
 * Where name is the store
 * @param req 
 * @param res 
 * @param next 
 */
export const createTransaction = async (req:Request, res:Response, next:NextFunction) => {
    try {
        let payload:ITransaction = req.body;
        let storeName:string = req.params.storeName;
        const db = await DbClient.connect();
        payload.storeName = storeName;
        await db.collection(COLLECTION_TRANSACTIONS).insertOne(payload);
        res.status(200).json({"message":"OK", "storeTarget": req.params.name, "data": payload});
    } catch ( e ) {
        res
        .status(400)
        .json({"message":"error"});
    }

}

// TODO : create distinction between prod / preprod for API ( front side )
// google analytics 
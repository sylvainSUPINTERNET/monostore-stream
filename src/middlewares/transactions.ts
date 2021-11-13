import { NextFunction, Request, Response } from "express";

export const createTransaction = (req:Request, res:Response, next:NextFunction) => {
    res.status(200).json({"ok":"ok"})
}
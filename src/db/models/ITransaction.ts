import { ICommon } from "./ICommon";

export interface ITransaction extends ICommon {
    orderID: string
    payerID:string
}
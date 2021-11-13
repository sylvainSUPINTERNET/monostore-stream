import { ICommon } from "./ICommon";

export interface ITransaction extends ICommon {
    orderID: string
    payerID:string
    mode: "LIVE" | "TEST"
    storeName: string
    amount_ttc: number
}
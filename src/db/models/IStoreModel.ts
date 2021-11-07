import { ICommon } from "./ICommon";
import { IStructure } from "./IStructure";

export interface IStoreModel extends ICommon, IStructure {
    id?:string
    name: string;
}
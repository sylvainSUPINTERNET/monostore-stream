import { Redis } from "ioredis";
import { redisClient, redisClientStatic } from "../redis/redis";


export const initGrpAndStream = async ( store:string): Promise<any> => {
    try {
        await redisClientStatic.xadd(`${store}:STREAM`, "MAXLEN", "1", "*",
         "data" , JSON.stringify({"test": `${store}`}));
        //await redisClientStatic.xgroup("CREATE", `${store}:STREAM`, `${store}:GROUP`, '$', 'MKSTREAM');
        return new Promise ( (resolve, _reject) => {
            resolve("OK");
        });
    } catch ( e ) {
        console.log(e)
        return new Promise ( (_resolve, reject) => {
            reject(e);
        });
    }
}

export const startStreamingForStore = async ( store:string ) : Promise<any> => {
    console.log("start reading stream for " + store);

    let streamable = new Streamable(store);
    streamable.streaming();
}

class Streamable {

    store: string;
    redisClient: Redis;

    constructor(store: string) {
      this.store = store;
      this.redisClient = redisClient();
    }


    async streaming() {
        setTimeout( async () => {
            try {
                //  'BLOCK', 500 it's useless, since we use setTimeout ..
                // here we use NOACK since we dont want pending message and we have only one consumer group so anyway, it's useless to keep tracking them in "memory"
                //const streamData = await this.redisClient.xreadgroup('GROUP', `${this.store}:GROUP`, `${this.store}:CONSUMER`, 'NOACK' , 'STREAMS',  `${this.store}:STREAM` , '>')
                //console.log(streamData);

                const streamData = await this.redisClient.xread("BLOCK", "100" ,"COUNT", "1", "STREAMS", `${this.store}:STREAM`, "$");
                console.log(streamData);
            } catch ( e ) {
                console.log(e);
            }
            this.streaming();
        }, 1)
    }
}
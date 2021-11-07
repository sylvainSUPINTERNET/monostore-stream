const { MongoClient } = require('mongodb');


class DbConnection {
    
    public client:any;

    constructor() {}

    async connect(): Promise<any> {
        try {

            const cl = await MongoClient.connect(process.env.MONGO_CONNECTION_URL);
            const db = await cl.db(process.env.MONGO_DB_NAME);
            this.client = db;
            return new Promise( (resolve, reject) => {
                console.log("DB connected with success, client is ready.");
                resolve(this.client);
            })
        } catch ( e ) {
            return new Promise( (_resolve, reject) => {
                console.log("Fail to instanciate DB conn : " , e)
                reject(e)
            });
        }
    }

}


export const DbClient = new DbConnection();
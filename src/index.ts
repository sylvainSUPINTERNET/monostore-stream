require('dotenv').config()

const bodyParser = require('body-parser')

import { initGrpAndStream, startStreamingForStore } from './stream/consumer';
import { DbClient } from './db/conn';
import { COLLECTION_STORES } from './db/collections';
import { IStoreModel } from './db/models/IStoreModel';
import { storeMiddleware } from './middlewares/store';
import { createTransaction } from './middlewares/transactions';

const cors = require('cors');
const stores = require('../stores.json');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors({
    origin: [...process.env.ALLOWED_ORIGINS?.split(" ") as string[]]
}))

// ajout de socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: [...process.env.ALLOWED_ORIGINS?.split(" ") as string[]],
      }
})

io.on('connection', (socket:any) =>{
    console.log(`Connecté au client ${socket.id}`)
 })


 app.put("/api/store/update/:name", storeMiddleware);
 app.post("/api/transactions", createTransaction);
 
// TODO : 
// route for transaction save
// plug real API with front => create IStructure ( deja fait ? au dessus put)

server.listen(process.env.API_PORT, async () => {
    console.log("Product producer started on port : " + process.env.API_PORT)

    
    // INIT db client
    const db = await DbClient.connect();

    // Init stores if not exist
    stores.names.forEach( async (store:string) => {
        const res = await db.collection(COLLECTION_STORES).find({}).toArray();
        if ( res.length === 0 ) {
            console.log("Inserting store : " + store);
            let newStore: IStoreModel = {
                name: store,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            await db.collection(COLLECTION_STORES).insertOne(newStore);
        }
    });

    stores.names.forEach( async (store:string) => {
        try {
            const data = await initGrpAndStream(store);

            if ( data === "OK" ) {
                console.log("Initialize read for stream associate with the store");
                startStreamingForStore(store);
            }
        } catch ( e:any ) {
            if ( e.command.name === "xgroup" ) { 
                // BUSYGROUP
                startStreamingForStore(store);
            }
            // console.log("INIT ERROR / WARNING : ", e)
            // if ( e.code === "BUSYGROUP" ) {
            //     startStreamingForStore(store);
            // }
        }

    });

    
})

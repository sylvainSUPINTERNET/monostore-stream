require('dotenv').config()

import { NextFunction } from 'express';
import { initGrpAndStream, startStreamingForStore } from './stream/consumer';

const cors = require('cors');
const stores = require('../stores.json');
const express = require('express');
const app = express();

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




// établissement de la connexion
io.on('connection', (socket:any) =>{
    console.log(`Connecté au client ${socket.id}`)
 })
 
server.listen(process.env.API_PORT, async () => {
    console.log("Product producer started on port : " + process.env.API_PORT)

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

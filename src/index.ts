require('dotenv').config()

import { initGrpAndStream, startStreamingForStore } from './stream/consumer';

const stores = require('../stores.json');

const express = require('express');
const app = express();

app.listen(process.env.API_PORT, async () => {
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

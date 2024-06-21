import express from 'express'
import bodyparser from 'body-parser'
import { Producerr } from './producer.js';

const producer = new Producerr();
const app = express()

app.use(bodyparser.json("application/json"))

app.post("/sendLog",async(req,res,next)=>{
    await producer.publishMessage(req.body.logType,req.body.message)
    res.send()

})

app.listen(3000,()=>{
    console.log("server started.....");
})
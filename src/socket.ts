import { Server } from "socket.io";
import { createServer } from "node:http";

import express from 'express';

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection',(socket)=>{
    console.log('connected',socket.id);
    socket.on('join',(data)=>{
        socket.join(String(data.tenantId));
        socket.emit('join',{roomId:String(data.tenantId)});
    })
})

export default {io,server};
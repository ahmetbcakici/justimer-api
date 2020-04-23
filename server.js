import express from 'express';
import cors from 'cors';
import http from 'http';
import socketio from 'socket.io';

import api from './api';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 9995;

io.on('connection', (socket) => {
    //let x = Math.floor(Math.random() * 1);
    //socket.join(1)
    socket.on('starttimer', (data) => {
        io.sockets.emit('starttimerr', data);
        //io.to(1).emit('starttimer', data);
    });
});

/* app.use((req, res, next) => {
    req.io = io;
    next();
}) */
app.use(cors());
app.use('/api', api);

server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on ${PORT}`);
});
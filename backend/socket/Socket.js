const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors:  {
        origin : ["https://medisphere-rho.vercel.app"],
        methods : ["GET","POST"],    
    }
});

app.set("io", io);

io.on("connection",(socket) => {
    console.log("a user connected",socket.id);


    socket.on("join_room", (room) => {
        console.log("User joined room:", room);
        socket.join(room);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected",socket.id);
    })

});

module.exports = {app,io,server};


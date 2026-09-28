const { Server } = require("socket.io");
const cors = require("cors");
const initSocket = (server) => {
    const io = new Server(server,{
        cors : {
            origin : "http://localhost:5173"
        }
    });

    io.on("connection",(socket) => {
        console.log("Socket Connected : ",socket.id);

        socket.on("join-meeting",({meetingId,userId}) => {
            socket.join(meetingId);
            socket.to(meetingId).emit("user-joined",{userId});
        });

        socket.on("disconnect",()=> {
            console.log("Socket disconnected : ",socket.id);
        });

    });

    return io;

};

module.exports = initSocket;
const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log("Connected with server!");
    console.log("Socket ID:", socket.id);

    socket.emit("joinRoom", {
        roomId: "abc123",
        userId: socket.id
    });
});

socket.on("connect_error", (err) => {
    console.log("Connection error:", err.message);
});
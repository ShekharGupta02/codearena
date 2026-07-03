// ================================
// IMPORTS
// ================================

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

// ================================
// APP CONFIGURATION
// ================================

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// ================================
// HTTP SERVER
// ================================

const server = http.createServer(app);

// ================================
// SOCKET.IO
// ================================

const io = new Server(server);

// ================================
// SOCKET CONNECTION
// ================================

io.on("connection", (socket) => {

    console.log(`✅ User Connected : ${socket.id}`);

    // ================================
    // JOIN ROOM
    // ================================

    socket.on("joinRoom", ({ roomId, userId }) => {

        const room = rooms.get(roomId);

        // Room not found
        if (!room) {

            socket.emit("errorMessage", {

                success: false,

                message: "Room not found"

            });

            return;

        }

        // Room Full
        if (room.players.length >= 2) {

            socket.emit("errorMessage", {

                success: false,

                message: "Room is already full"

            });

            return;

        }

        // Add Player

        room.players.push({

            id: socket.id,

            name: userId

        });
        console.log("Current Players:", room.players.length);

        // Join Socket Room

        socket.join(roomId);

        // Notify Current Player

        socket.emit("joinedRoom", {

            success: true,

            room

        });

        // Notify Opponent

        socket.to(roomId).emit("opponentJoined", {

            player: userId

        });

        // ================================
// START COUNTDOWN WHEN 2 PLAYERS JOIN
// ================================

if (room.players.length === 2) {

    room.status = "ready";

    let count = 5;

    const timer = setInterval(() => {

        io.to(roomId).emit("countdown", count);

        count--;

        if (count < 1) {

    clearInterval(timer);

    room.status = "playing";

    const randomProblem =
        problems[Math.floor(Math.random() * problems.length)];

    room.problem = randomProblem;

    io.to(roomId).emit("problem", randomProblem);

    io.to(roomId).emit("battleStarted");

    // =========================
    // BATTLE TIMER (2 minutes for testing)
    // =========================

    let timeLeft = 120;

    const battleTimer = setInterval(() => {

        io.to(roomId).emit("battleTimer", timeLeft);

        timeLeft--;

        if (timeLeft < 0) {

            clearInterval(battleTimer);

            room.status = "finished";

            io.to(roomId).emit("timeUp");

            console.log(`⏰ Time Up in Room : ${roomId}`);

        }

    }, 1000);

    console.log(`Battle Started in Room : ${roomId}`);

}

    }, 1000);

}

        console.log(`${userId} joined ${roomId}`);

    });

    // ================================
// SUBMIT CODE
// ================================

socket.on("submitCode", ({ roomId, userId }) => {

    const room = rooms.get(roomId);

    if (!room) {
        return;
    }

    // Winner already declared
    if (room.winner) {
        return;
    }

    // First player becomes winner
    room.winner = userId;

    io.to(roomId).emit("battleResult", {

        winner: userId

    });

    console.log(`🏆 Winner: ${userId}`);

});

    // ================================
    // DISCONNECT
    // ================================

    socket.on("disconnect", () => {

        console.log(`❌ User Disconnected : ${socket.id}`);

    });

});


const problems = [

{
title:"Two Sum",

description:
"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."

},

{
title:"Valid Parentheses",

description:
"Determine if the input string containing (), {}, [] is valid."

},

{
title:"Binary Search",

description:
"Return the index of target in a sorted array."

}

];
// ================================
// TEMP DATABASE
// ================================

const rooms = new Map();

// ================================
// HEALTH ROUTE
// ================================

app.get("/health", (req, res) => {
    res.send("DSA Battle Server Running");
});

// ================================
// CREATE ROOM
// ================================

app.post("/room/create", (req, res) => {

    const roomId = Math.random().toString(36).substring(2, 8);

    const room = {

        roomId,

        players: [],

        status: "waiting",

        winner: null,

        createdAt: Date.now()

    };

    rooms.set(roomId, room);

    res.json({

        success: true,

        roomId,

        room

    });

});

// ================================
// START SERVER
// ================================

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {

    console.log("================================");

    console.log("🚀 DSA Battle Server Started");

    console.log(`🌐 Server running on port ${PORT}`);

    console.log("================================");

});
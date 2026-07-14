// ===============================
// SOCKET CONNECTION
// ===============================

const socket = io();

// ===============================
// MONACO EDITOR
// ===============================

let editor;

// ===============================
// HTML ELEMENTS
// ===============================

const userIdInput = document.getElementById("userId");
const roomIdInput = document.getElementById("roomId");

const createBtn = document.getElementById("createBtn");
const joinBtn = document.getElementById("joinBtn");
const submitBtn = document.getElementById("submitBtn");

const playAgainBtn = document.getElementById("playAgainBtn");

const statusText = document.getElementById("status");
const countdownText = document.getElementById("countdown");
const battleTimer = document.getElementById("battleTimer");

const title = document.getElementById("problemTitle");
const description = document.getElementById("problemDescription");

const winnerCard = document.getElementById("winnerCard");
const winnerName = document.getElementById("winnerName");

const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");

const language = document.getElementById("language");

const battleSection = document.getElementById("battleSection");

const waitingSection = document.getElementById("waitingSection");
const waitingRoomId = document.getElementById("waitingRoomId");
// ===============================
// SOCKET EVENTS
// ===============================

socket.on("connect", () => {

    console.log("Connected :", socket.id);

    statusText.innerText = "Connected to Server";

});

socket.on("disconnect", () => {

    statusText.innerText = "Disconnected";

});

socket.on("joinedRoom", (data) => {

    console.log("JOINED ROOM EVENT RECEIVED");

    console.log(data);

    statusText.innerText = "Joined Room Successfully";

    waitingSection.style.display = "block";

    waitingRoomId.innerText = roomIdInput.value;

});

socket.on("opponentJoined", (data) => {

    statusText.innerText = `${data.player} joined the room`;

});

socket.on("countdown", (count) => {

    countdownText.innerText = count;

});


socket.on("battleStarted", () => {

    waitingSection.style.display = "none";

    battleSection.style.display = "block";

    countdownText.innerText = "🚀 START!";

    statusText.innerText = "Battle Started";

});

socket.on("battleTimer", (timeLeft) => {

    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    battleTimer.innerText =
        `${minutes}:${seconds.toString().padStart(2, "0")}`;

});

socket.on("timeUp", () => {

    battleTimer.innerText = "⏰ Time's Up!";

    submitBtn.disabled = true;

    statusText.innerText = "Battle Finished";

    playAgainBtn.style.display = "block";

});

socket.on("problem", (problem) => {

    title.innerText = problem.title;

    description.innerText = problem.description;

});

socket.on("battleResult", (data) => {

    statusText.innerText = "Battle Finished";

    submitBtn.disabled = true;
    submitBtn.innerText = "Battle Finished";

    winnerCard.style.display = "block";
    playAgainBtn.style.display = "block";

    const currentUser = userIdInput.value.trim();

    if (currentUser === data.winner) {

        resultTitle.innerText = "🏆 VICTORY";
        winnerName.innerText = "Congratulations!";
        resultMessage.innerText = "You solved the problem first! ⭐ +25 Rating";

    } else {

        resultTitle.innerText = "💔 DEFEAT";
        winnerName.innerText = "Better Luck Next Time!";
        resultMessage.innerText =
            `${data.winner} solved the problem first. Keep practicing!`;

    }

});
socket.on("errorMessage", (data) => {

    alert(data.message);

});

// ===============================
// CREATE ROOM
// ===============================

createBtn.addEventListener("click", async () => {

    const userId = userIdInput.value.trim();

    if (!userId) {

        alert("Please enter your name.");

        return;

    }

    try {

        const response = await fetch("/room/create", {
            method: "POST"
        });

        const data = await response.json();

        roomIdInput.value = data.roomId;

        statusText.innerText = "Room Created";

        // Automatically join the newly created room
        console.log("Creating room and auto joining...");
        console.log("Creating room and auto joining...");

socket.emit("joinRoom", {
    roomId: data.roomId,
    userId: userId
});

console.log("Join event emitted");

console.log("Join event emitted");
    } catch (err) {

        console.error(err);

        alert("Unable to create room.");

    }

});

// ===============================
// JOIN ROOM
// ===============================

joinBtn.addEventListener("click", () => {

    const roomId = roomIdInput.value.trim();

    const userId = userIdInput.value.trim();

    if (!roomId || !userId) {

        alert("Enter Name and Room ID");

        return;

    }

    socket.emit("joinRoom", {

        roomId,

        userId

    });

});

// ===============================
// SUBMIT
// ===============================

submitBtn.addEventListener("click", () => {

    const roomId = roomIdInput.value.trim();

    const userId = userIdInput.value.trim();

    if (!roomId || !userId) {

        alert("Join a room first.");

        return;

    }

    socket.emit("submitCode", {

    roomId,

    userId,

    language: language.value

});

});

playAgainBtn.addEventListener("click", () => {

    location.reload();

});

// ===============================
// MONACO EDITOR INITIALIZATION
// ===============================

require.config({
    paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs"
    }
});

require(["vs/editor/editor.main"], function () {

    editor = monaco.editor.create(document.getElementById("editor"), {

        value:
`#include <iostream>

using namespace std;

int main() {

    cout << "Hello CodeArena!";

    return 0;
}
`,

        language: "cpp",

        theme: "vs-dark",

        automaticLayout: true,

        minimap: {
            enabled: false
        }

    });

});
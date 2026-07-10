# CodeArena

CodeArena is a real-time multiplayer coding battle platform where two users compete by solving the same Data Structures and Algorithms problem under a shared timer.

The project was built to explore real-time communication using Socket.IO and understand how multiplayer applications synchronize events between multiple clients.

**Live Demo:** https://codearena-wj9e.onrender.com

**Source Code:** https://github.com/ShekharGupta02/codearena

---

## Features

- Create and join private battle rooms
- Real-time multiplayer using Socket.IO
- Synchronized countdown before the battle begins
- Shared battle timer
- Random DSA problem assignment
- Programming language selection
- Winner and loser screens
- Play Again functionality
- Deployed on Render

---

## Tech Stack

**Frontend**

- HTML
- CSS
- JavaScript

**Backend**

- Node.js
- Express.js
- Socket.IO

**Deployment**

- Render

---

## Project Structure

```
codearena
│
├── public
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── server.js
├── package.json
├── README.md
└── .gitignore
```

---

## How It Works

1. A player creates a private room.
2. Another player joins using the room ID.
3. The server places both players in the same Socket.IO room.
4. Once two players are present, a synchronized countdown begins.
5. A coding problem is sent to both players simultaneously.
6. Both players solve the problem before the timer expires.
7. The server determines the result and broadcasts the winner.

---

## Running Locally

Clone the repository

```bash
git clone https://github.com/ShekharGupta02/codearena.git
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm start
```

Visit

```
http://localhost:3000
```

---

## Challenges

Some of the problems solved while building this project include:

- Synchronizing timers for multiple users
- Managing private multiplayer rooms
- Preventing additional users from joining a full room
- Broadcasting real-time events using Socket.IO
- Deploying a WebSocket-based application on Render

---

## Future Improvements

The current version focuses on multiplayer communication. Planned improvements include:

- Monaco Editor integration
- Judge0 API for code execution
- Authentication
- Match history
- Leaderboard
- Rating system
- AI-based code review

---

## Author

Shekhar Gupta

GitHub: https://github.com/ShekharGupta02

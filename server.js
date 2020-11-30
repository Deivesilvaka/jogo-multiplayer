const express = require("express")
const http = require("http")
const createGame = require("./public/scripts/create-game")
const socketio =  require("socket.io")

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static("public"))

const game = createGame()

game.subscribe((command) => {
    console.log(`Emmiting ${command.type}`)
    sockets.emit(command.type, command)
})

console.log(game.state)

sockets.on("connection", (socket) => {
    const playerId = socket.id
    console.log(`Player ${playerId} connected`)

    game.addPlayer({ playerId: playerId })
    console.log(game.state)

    socket.emit("setup", game.state)

    socket.on("disconnect", () => {
        game.removePlayer({ playerId: playerId })
        console.log(`Player ${playerId} disconnected`)
    })

    socket.on("move-player", (command) => {
        command.playerId = playerId
        command.type = "move-player"

        game.movePlayer(command)
    })
})

server.listen(3000, () => {
    console.log("servidor rodando em http://localhost:3000")
})
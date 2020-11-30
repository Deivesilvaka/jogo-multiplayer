function createGame() {

    const state = {

        players: {},

        fruits: {},

        cnv: {
            width:10,
            height:10
        }

    }

    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = "playerX" in command ? command.playerX : Math.floor(Math.random() * state.cnv.width)
        const playerY = "playerY" in command ? command.playerY : Math.floor(Math.random() * state.cnv.height)

        state.players[playerId] = {
            x:playerX,
            y:playerY
        }

        notifyAll({
            type: "add-player",
            playerId,
            playerX,
            playerY
        })

    }

    function removeFruit(command) {
        const fruitId = command.fruitId
        delete state.fruits[fruitId]
    }

    function addFruit(command) {
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {
            x:fruitX,
            y:fruitY
        }
    }

    function removePlayer(command) {
        const playerId = command.playerId
        delete state.players[playerId]

        notifyAll({
            type:"remove-player",
            playerId
        })
    }

    function movePlayer(command) {
        console.log(`Moving ${command.playerId} with ${command.keyPressed}`)

        notifyAll(command)

        const acceptedMoves = {

            w(player){
                console.log("Moving player up")
                if(player.y > 0){
                    player.y -= 1
                }
            },

            s(player){
                console.log("Moving player down")
                if(player.y < state.cnv.height - 1){
                    player.y += 1
                }
            },

            a(player) {
                console.log("Moving player left")
                if(player.x > 0){
                    player.x -= 1
                }
            },

            d(player) {
                console.log("Moving player right")
                if(player.x < state.cnv.width - 1){
                    player.x += 1
                }
            }
        }


        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[command.playerId]

        const moveFunction = acceptedMoves[keyPressed]
        
        if(player && moveFunction){
            moveFunction(player)
            checkForFruitCollision(playerId)
        }

        function checkForFruitCollision(playerId) {

            const player = state.players[playerId]

            for(const fruitId in state.fruits){
                const fruit = state.fruits[fruitId]

                if(player.x === fruit.x && player.y === fruit.y){
                    console.log("houve uma colisão")
                    removeFruit({ fruitId })
                }
            }
        }

    }

    function setState(newState){
        Object.assign(state, newState)
    }

    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for(const observerFunction of observers) {
            observerFunction(command)
        }
    }

    return {
        state,
        addPlayer,
        addFruit,
        removePlayer,
        removeFruit,
        movePlayer,
        setState,
        subscribe
    }

}

try{
    module.exports = createGame
}catch(err){
    console.log("Modulo exportado no server nodeJs")
}
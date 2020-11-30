function renderScrean(cnv, game, requestAnimationFrame, currentPlayerId) {
    const ctx = cnv.getContext("2d")
    ctx.clearRect(0, 0, cnv.width, cnv.height)

    for(const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        ctx.fillStyle = "green"
        ctx.fillRect(fruit.x, fruit.y, 1, 1)
    }

    for(const playerId in game.state.players){
        const player = game.state.players[playerId]
        ctx.fillStyle = "black"
        ctx.fillRect(player.x, player.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if(currentPlayer){
        ctx.fillStyle = "#F0DB4F"
        ctx.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }

    requestAnimationFrame(() => {
        renderScrean(cnv, game, requestAnimationFrame, currentPlayerId)
    })

}
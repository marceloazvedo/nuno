const GameService = require('./src/services/game-service')
const { showCards, showCardsOptions, getCardToShow } = require('./src/utils/print')
const { selectListCard } = require('./src/utils/input')

const gameService = new GameService()
gameService.regiterPlayer('Marcelo Azevedo')
gameService.regiterPlayer('Isabele Keyla')
gameService.startGame()

const selectCards = (cardsSelected) => {
    try {
        const nextPlayer = gameService.getNextPlayer()
        gameService.usePlayerCards(nextPlayer, ...cardsSelected)
    } catch (err) {
        console.log('Message: ' + err.message)
    }
    nextTurn()
}

const verifyHasCardsAndContinueTurn = (playerInTurn, turnCard) => {
    try{
        gameService.verifyHasCardChoice(playerInTurn, turnCard)
    } catch (err) {
        const cardAdded = gameService.addRandomCardToPlayer(playerInTurn)
        console.log(`The card |${getCardToShow(cardAdded)}| was added to ${playerInTurn.name} cards.`)
        nextTurn()
    }

}

const nextTurn = () => {
    try {
        const playerInTurn = gameService.getNextPlayer()
        const turnCard = gameService.getLastCardUsed()
        console.log('# Turn of ' + playerInTurn.name + ' - Card: |' + getCardToShow(turnCard) + '|')
        verifyHasCardsAndContinueTurn(playerInTurn, turnCard)
        showCards(playerInTurn.cards)
        showCardsOptions(playerInTurn.cards)
        selectListCard(playerInTurn.cards, selectCards)
    } catch (err) {
        console.log('Message: ' + err.message)
    }
}
nextTurn()



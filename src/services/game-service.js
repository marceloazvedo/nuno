const DeckService = require('./deck-service')
const Player = require('../model/player')
const { GameDirection, CardType, CardColor } = require('../utils/types')
const { showCards, getCardsListToShow, showCardsOptions } = require('../utils/print')

function GameService() {
    const deckService = new DeckService()
    let gameDirection = GameDirection.NORMAL
    let gameCardColor
    let nextPlayer
    let indexTurnPlayer = 0
    const players = []

    const activateSpecialCard = (card) => {
        if (card.type === CardType.REVERT) {
            this.invertGameDirection()
        }
        if (card.type === CardType.BLOCK) {
            turnToNextPlayer()
        }
        if (card.type === CardType.CHANGE_COLOR) {
            // TODO: show option for player to change game color
        }
        if (card.type === CardType.PLUS_TWO) {
            // TODO: show option for player to insert plus two card
        }
        if (card.type === CardType.PLUS_FOUR) {
            // TODO: show option for player to insert plus two card
        }
    }

    const turnToNextPlayer = (cards) => {
        if (gameDirection === GameDirection.NORMAL)
            indexTurnPlayer++
        if (gameDirection === GameDirection.INVERTED)
            indexTurnPlayer--

        if (indexTurnPlayer >= players.length)
            indexTurnPlayer = 0
        if (indexTurnPlayer < 0)
            indexTurnPlayer = (players.length - 1)
        nextPlayer = players[indexTurnPlayer]
        gameCardColor = cards.pop().color
    }

    this.startGame = () => {
        const randomStartCard = deckService.pushRandomCard()
        deckService.addToUsedStack(randomStartCard)
        gameCardColor = randomStartCard.color
    }

    this.regiterPlayer = (name) => {
        const cardsHand = deckService.pushRandomStarterCards()
        const player = new Player(name, cardsHand)
        if (players.length === 0) {
            nextPlayer = player
        }
        players.push(player)
        return player
    }

    this.invertGameDirection = () => {
        if (gameDirection === GameDirection.NORMAL) {
            gameDirection = GameDirection.INVERTED
            return gameDirection
        }
        if (gameDirection === GameDirection.INVERTED) {
            gameDirection = GameDirection.NORMAL
            return gameDirection
        }
    }

    this.usePlayerCards = (player, ...cards) => {
        const firstCardSelected = cards[0]
        const lastCardUsed = this.getLastCardUsed()
        if (!(lastCardUsed.type === CardType.CHANGE_COLOR || lastCardUsed.type === CardType.PLUS_FOUR) && !(firstCardSelected.type === CardType.CHANGE_COLOR || firstCardSelected.type === CardType.PLUS_FOUR)) {
            if (gameCardColor !== firstCardSelected.color && lastCardUsed.type !== firstCardSelected.type) {
                throw Error(`The selected card is not turn color.`)
            }
        }
        if (!player.hasAllCards(...cards)) {
            throw Error(`All or some of this cards (${getCardsListToShow(cards)}) was not found in player cards.`)
        }
        if (cards.length > 1) {
            if (!cards[0].isAllTheSameTypeAndValue(...cards)) {
                throw Error(`The selected cards is not the same type or value.`)
            }
        }
        player.removeCards(...cards)
        if (cards[0].isSpecial()) {
            activateSpecialCard(cards[0])
        }
        deckService.addToUsedStack(...cards)
        turnToNextPlayer(cards)
    }

    this.addRandomCardToPlayer = (player) => {
        const randomCard = deckService.pushRandomCard()
        player.addCard(randomCard)
        return randomCard
    }

    this.verifyHasCardChoice = (player, cardToCompare) => {
        const hasChoice = player.cards.reduce((hasChoice, card) => {
            if (!hasChoice && (cardToCompare.color !== card.color && cardToCompare.type !== card.type)) {
                return false
            } else {
                return true
            }
        }, false)
        if (!hasChoice)
            throw Error(`Theres no choice in your cards ${player.name}, cards ${getCardsListToShow(player.cards)}`)
    }

    this.getPlayers = () => players
    this.getNextPlayer = () => nextPlayer
    this.getGameCardColor = () => gameCardColor
    this.getLastCardUsed = () => deckService.getTopCardUsedStack()

}
module.exports = GameService
const Deck = require('../model/deck')
const INITIAL_CARD_LENGTH = 7

function DeckService() {
    const deck = new Deck()
    const usedCardStack = []

    this.pushRandomStarterCards = () => {
        const hand = []
        for (let i = 0; i < INITIAL_CARD_LENGTH; i++) {
            hand.push(deck.pushRandomCard())
        }
        return hand
    }

    this.pushRandomCard = () => {
        const cardPushed = deck.pushRandomCard()
        return cardPushed
    }

    this.addToUsedStack = (...cards) => {
        usedCardStack.push(...cards)
    }

    this.getTopCardUsedStack = () => {
        if (usedCardStack.length > 0)
            return usedCardStack[usedCardStack.length - 1]
        return null
    }

}
module.exports = DeckService

const { hasAllCards } = require('../utils/card')

function Player(name, cards) {
    this.name = name
    this.cards = cards

    this.removeCards = (...cardsToRemove) => {
        for (let i = 0; i < this.cards.length; i++) {
            for (let j = 0; j < cardsToRemove.length; j++) {
                const card = cardsToRemove[j]
                if (this.cards[i].id === card.id) {
                    this.cards.splice(i, 1)
                }
            }
        }
    }

    this.addCard = (card) => {
        this.cards.push(card)
    }

    this.hasAllCards = (...cardsToFind) => hasAllCards(this.cards, ...cardsToFind)
}

module.exports = Player
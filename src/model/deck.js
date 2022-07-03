const Card = require('../model/card')
const { CardColor, CardType } = require('../utils/types')
const MAX_NUMBER_CARD_TYPE = 10

const fillAndGetAllColorsCards = (cardType, value) => {
    return [
        new Card(cardType, CardColor.RED_CARD, value),
        new Card(cardType, CardColor.YELLOW_CARD, value),
        new Card(cardType, CardColor.GREEN_CARD, value),
        new Card(cardType, CardColor.BLUE_CARD, value),
    ]
}

const fillPlusFourCards = () => {
    return [
        new Card(CardType.PLUS_FOUR, null, null),
        new Card(CardType.PLUS_FOUR, null, null)
    ]
}

const fillChangeColorCards = () => {
    return [
        new Card(CardType.CHANGE_COLOR, null, null),
        new Card(CardType.CHANGE_COLOR, null, null)
    ]
}

const fillDeck = () => {
    let numberCards = []
    for (let i = 0; i < MAX_NUMBER_CARD_TYPE; i++) {
        const isSpecial = i == 9 || i === 7 || i === 0
        numberCards = numberCards.concat(
            fillAndGetAllColorsCards(isSpecial ? CardType.SPECIAL_NUMBER : CardType.NUMBER, i))
    }
    const cards = [
        ...fillPlusFourCards(),
        ...fillChangeColorCards(),
        ...fillAndGetAllColorsCards(CardType.PLUS_TWO, null),
        ...fillAndGetAllColorsCards(CardType.BLOCK, null),
        ...fillAndGetAllColorsCards(CardType.REVERT, null),
        ...numberCards
    ]
    return cards;
}

function Deck() {
    const cards = fillDeck()

    this.pushRandomCard = () => {
        const cardIndex = Math.floor(Math.random() * cards.length)
        const removed = cards.splice(cardIndex, 1)
        return removed[0]
    }
}
module.exports = Deck
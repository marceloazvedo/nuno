const { CardType, CardColor } = require("../utils/types")

const getCardColorString = (cardColor) => {
    if (cardColor === CardColor.BLUE_CARD)
        return 'b'
    if (cardColor === CardColor.GREEN_CARD)
        return 'g'
    if (cardColor === CardColor.RED_CARD)
        return 'r'
    if (cardColor === CardColor.YELLOW_CARD)
        return 'y'
}

const showCards = (cards) => {
    console.log('Cards:   ' + getCardsListToShow(cards))
}

const getCardToShow = (card) => {
    if (card.type === CardType.NUMBER || card.type === CardType.SPECIAL_NUMBER) {
        return card.value + getCardColorString(card.color)
    } else if (card.type === CardType.REVERT) {
        return 'R' + getCardColorString(card.color)
    } else if (card.type === CardType.PLUS_TWO) {
        return '+II' + getCardColorString(card.color)
    } else if (card.type === CardType.PLUS_FOUR) {
        return '+IV'
    } else if (card.type === CardType.CHANGE_COLOR) {
        return 'CC'
    } else if (card.type === CardType.BLOCK) {
        return 'B' + getCardColorString(card.color)
    }
}

const getCardsListToShow = (cards) => {
    let printCards = ''
    cards.forEach(card => {
        printCards = printCards.concat(`|${getCardToShow(card)}| `)
    })
    return printCards
}

const showCardsOptions = (cards) => {
    const cardOptions = cards.reduce((print, card, index) => {
        const cardToShow = getCardToShow(card)
        const cardIndex = index + 1
        const numberStringLength = (new String(index)).length
        let underlines = ''
        for (let i = 0; i < cardToShow.length - numberStringLength; i++) {
            underlines += '_'
        }
        return print + ('|' + underlines + cardIndex + '| ')

    }, '')
    console.log('Options: ' + cardOptions)
}

exports.showCards = showCards
exports.getCardToShow = getCardToShow
exports.getCardsListToShow = getCardsListToShow
exports.showCardsOptions = showCardsOptions
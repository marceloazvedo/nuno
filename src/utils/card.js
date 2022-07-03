const hasAllCards = (cards, ...cardsToFind) => {
    const hasAllCards = cardsToFind.reduce((hasCard, card) => {
        if (!hasCard)
            return false
        return !!cards.find(c => isEquals(c, card))
    }, true)
    return hasAllCards
}

const isEquals = (cardA, cardB) => {
    if (cardA.type === cardB.type &&
        cardA.value === cardB.value &&
        cardA.color === cardB.color)
        return true
    return false
}

exports.hasAllCards = hasAllCards
exports.isEquals = isEquals
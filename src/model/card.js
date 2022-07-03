const { v4: uuidv4 } = require('uuid');
const { CardType } = require('../utils/types');
const { getCardToShow } = require('../utils/print');
const {isEquals} = require('../utils/card')

function Card(type, color, value) {
    this.id = uuidv4()
    this.type = type
    this.color = color
    this.value = value

    this.isSpecial = () => {
        if (type !== CardType.NUMBER)
            return true
        return false
    }

    this.getToShow = () => getCardToShow(this)

    this.isAllTheSameTypeAndValue = (...cards) => {
        const cardWithDiferentType = cards.find(card => {
            return card.type !== this.type || card.value !== this.value
        })
        if (cardWithDiferentType)
            return false
        return true
    }

    this.equals = (card) => isEquals(this, card)
}
module.exports = Card
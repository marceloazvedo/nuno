const readline = require('readline');
const { asap } = require('rxjs/internal/scheduler/asap');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const selectListCard = (cards, callback) => {
    rl.question('Select the cards (Ex.: 1,2,3): ', (answer) => {
        const cardsIndex = answer.split(',')
        cardsIndex.forEach(index => {
            if (index > cards.length) {
                throw Error('The selected cards indexes is out of the player range cards.')
            }
        })
        const selectedCards = cardsIndex.map((cardIndex) => cards[cardIndex - 1])
        callback(selectedCards)
    })
}

exports.selectListCard = selectListCard
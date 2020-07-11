const Suit = require('./Suit');
const Card = require('./Card');


function createCards() {
    var pointsDict = {
        "7": 0,
        "8": 0,
        "Q": 0,
        "K": 0,
        "10": 1,
        "A": 1,
        "9": 2,
        "J": 3
    };

    var hearts = createSuitCards(Suit.HEARTS, pointsDict);
    var clubs = createSuitCards(Suit.CLUBS, pointsDict);
    var diamonds = createSuitCards(Suit.DIAMONDS, pointsDict);
    var spades = createSuitCards(Suit.SPADES, pointsDict);
    return hearts.concat(clubs, diamonds, spades);
}
function createSuitCards(suit, pointsDict) {
    var cards = new Array(8);
    var i = 0;
    for (var key in pointsDict) {
        var value = pointsDict[key];
        var card = new Card(suit, key, value, i);
        cards[i] = card;
        i++;
    }
    return cards;
}

module.exports = createCards
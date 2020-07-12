import Suit from "./suit";
import Card from "./card.js";
export default class Deck {

    constructor() {
        this._cards = [];
        this._init();
        this._currentTop = 31;
    }

    _init() {
        this._createCards();
    }
    _createCards() {
        var cards = new Array(32);
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

        var hearts = this._createSuitCards(Suit.HEARTS, pointsDict);
        var clubs = this._createSuitCards(Suit.CLUBS, pointsDict);
        var diamonds = this._createSuitCards(Suit.DIAMONDS, pointsDict);
        var spades = this._createSuitCards(Suit.SPADES, pointsDict);
        this._cards = hearts.concat(clubs, diamonds, spades);
    }
    _createSuitCards(suit, pointsDict) {
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
    _resetCurrentTop() {
        this._currentTop = 32;
    }
    shuffle() {
        for (let i = this._currentTop; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this._cards[i], this._cards[j]] = [this._cards[j], this._cards[i]];
        }
    }

    get cards() {
        return this._cards;
    }

    get noOfCards() {
        return this._currentTop + 1;
    }
    next() {
        if (this._currentTop == -1) {
            console.log("Deck is empty");
            return;
        }

        var card = this.cards[this._currentTop];
        this._currentTop--;
        return card;
    }


}




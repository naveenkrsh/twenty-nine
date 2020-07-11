var Suit = require('./Suit');
var Card = require('./Card');
var Deck = require('./Deck');
const Player = require('./Player');
const Round = require('./Round');
const Move = require('./Move');

function Game(deck) {
    this._deck = deck;
    this._players = [4];
    this._teams = {
        "red": { current: 0, currentPoint: 0 },
        "blue": { current: 1, currentPoint: 0 }
    }

    this._currentHand = [];
    this._turnIndex = 0;
}

Game.prototype.getCurrentHand= function(){
    return this._currentHand;
}
Game.createCards = function () {
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

    var hearts = Game.createSuitCards(Suit.HEARTS, pointsDict);
    var clubs = Game.createSuitCards(Suit.CLUBS, pointsDict);
    var diamonds = Game.createSuitCards(Suit.DIAMONDS, pointsDict);
    var spades = Game.createSuitCards(Suit.SPADES, pointsDict);
    return hearts.concat(clubs, diamonds, spades);
}
Game.createSuitCards = function (suit, pointsDict) {
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

Game.prototype.addPlayer = function (id, name, teamName) {
    var team = this._teams[teamName];
    if (team.current >= 4)
        return null;
    var player = new Player(id, name, teamName);

    this._players[team.current] = player;
    team.current += 2;

    return player;
}

Game.prototype.getPlayers = function () {
    return this._players;
}

Game.prototype.isLobbyFull = function () {
    return this._teams["red"].current + this._teams["blue"].current >= 9
}

Game.prototype.deal = function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < this._players.length; j++) {
            var card = this._deck.nextCard();
            this._players[j].addCard(card);
        }

    }
}

Game.prototype.setRound = function (trump, bidderTeam, bidPoint) {
    this._currentRound = new Round(trump, bidderTeam, bidPoint);
}

Game.prototype.getRound = function () {
    return this._currentRound;
}

Game.prototype.addMove = function (playerId, card) {
    var move = new Move(playerId, card);
    this._currentHand.push(move);
    var player = this.getPlayer(playerId);
    player.removeCard(card);

}
Game.prototype.getCurrentHandMoveCount = function (obj) {
    return this._currentHand.length;
}

Game.prototype.getHandWinner = function () {

    if (this._currentRound.isTrumpOpen()) {
        var trumpMoves = this.getCurrentHandSuitMoves(this._currentRound.getTrumpSuit());
        if (trumpMoves.length != 0) {
            return Game.getMaxMove(trumpMoves);
        }
    }

    var currentHandSuit = this._currentHand[0].getCard().getSuit();
    var moves = this.getCurrentHandSuitMoves(currentHandSuit);
    return Game.getMaxMove(moves);

}

Game.prototype.getHandPoints = function () {
    //TODO implement hand point
    return this._currentHand.reduce(function (total, hand) {
        return total + hand.getCard().getPoint();
    }, 0);
}

Game.prototype.resetHand = function () {
    this._currentHand = [];
}

Game.getMaxMove = function (moves) {
    moves.sort(function (a, b) { return b.getCard().getPrecedence() - a.getCard().getPrecedence() });
    return moves[0];
}

Game.prototype.getCurrentHandSuitMoves = function (suit) {
    var newArray = this._currentHand.filter(function (move) {
        return move.getCard().getSuit() == suit;
    });
    return newArray;
}

Game.prototype.getPlayer = function (playerId) {
    return this._players.find(element => element.getId() == playerId);
}

Game.prototype.getPlayerIndex = function (player) {
    return this._players.indexOf(player)
}

Game.prototype.setTeamPoint = function (teamName, point) {
    var team = this._teams[teamName];
    team.currentPoint += point;
}
Game.prototype.getTeamPoint = function (teamName) {
    var team = this._teams[teamName];
    return team.currentPoint;
}
Game.prototype.getTurnIndex = function () {
    return this._turnIndex % 4;
}

Game.prototype.setNextTurnIndex = function () {
    this._turnIndex++;
}
Game.prototype.setTurnIndex = function (index) {
    this._turnIndex = index;
}


module.exports = Game
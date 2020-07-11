var Suit = require('./Suit');
var Card = require('./Card');
var Deck = require('./Deck');
var Channels = require('./Channels');
const { subscriber, publisher } = require('./PubSub');
const Player = require('./Player');
const Round = require('./Round');

function Game() {
    this._init();
    this._players = [4];
    this._teams = {
        "red": { current: 0 },
        "blue": { current: 1 }
    }
    this._currentRound = {};
}

Game.prototype._init = function () {
    var cards = Game.createCards();
    this._deck = new Deck(cards);

    // //console.log(this._deck.getCards());
    // this._deck.shuffle();
    // //console.log(this._deck.getCards());
    // console.log(this._deck.count());
    // console.log(this._deck.nextCard());
    // console.log(this._deck.count());
    // this._deck.reset();
    // console.log(this._deck.count());
    // console.log(this._deck.getCards());
};
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

Game.prototype.setRound = function (trump,bidderTeam,bidPoint) {
    this._currentRound = new Round(trump,bidderTeam,bidPoint);
}

var game = new Game();

for (var key in Channels) {
    var value = Channels[key];
    subscriber.subscribe(value);
}

subscriber.on("message", function (channel, message) {
    console.log("Subscriber received message in channel '" + channel + "': " + message);
    var obj = message != "" ? JSON.parse(message) : {};
    switch (channel) {
        case Channels.JOIN_PLAYER:
            var player = game.addPlayer(obj.id, obj.name, obj.team);
            if (player != null)
                publisher.publish(Channels.PLAYER_JOINED, JSON.stringify(player));
            if (game.isLobbyFull()) {
                publisher.publish(Channels.LOBBY_FULLED, "");
            }
            break;
        case Channels.PLAYER_JOINED:
            break;
        case Channels.LOBBY_FULLED:
            //console.log([...game.getPlayers()]);
            break;
        case Channels.ROUND_START:
            game.deal();
            break;
        case Channels.SET_ROUND:
            game.setRound(obj.trump,obj.bidderTeam,obj.bidPoint)
            game.deal();
            console.log(game);
            break;
    }
});
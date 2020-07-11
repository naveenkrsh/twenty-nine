const fs = require("fs");
const assert = require('assert');
const Deck = require('../modules/Deck');
const Game = require('../modules/Game');
const Suit = require('../modules/Suit');

const card_list = require("./cards");
const Card = require('../modules/Card');

function createDeck() {
    var cards = [];
    for (var i = 0; i < card_list.length; i++) {
        var c = card_list[i];
        var newCard = new Card(c._suit, c._key, c._point, c._precedence);
        cards.push(newCard);
    }

    return new Deck(cards);
}

var players = [{
    name: "naveen",
    id: "naveen",
    team: "red"
},
{
    name: "rajeev",
    id: "rajeev",
    team: "blue"
}, {
    name: "verma",
    id: "verma",
    team: "blue"
}, {
    name: "avijeet",
    id: "avijeet",
    team: "red"
}, {
    name: "x",
    id: "x",
    team: "red"
}]

function addPlayers(game, players) {
    for (var i = 0; i < players.length; i++) {
        var obj = players[i];
        game.addPlayer(obj.id, obj.name, obj.team);
    }
}
var deck = createDeck();


describe('Is lobby full?', () => {


    it('should return true', () => {
        var game = new Game(deck);
        addPlayers(game, players);
        assert.equal(game.isLobbyFull(), true)
    });
    it('should return false', () => {
        var game = new Game();
        assert.equal(game.isLobbyFull(), false)
    });
});

describe('Start game', () => {
    var game = new Game(deck);
    addPlayers(game, players);
    it('should return 4', () => {

        game.deal();
        var players = game.getPlayers();
        assert.equal(players.length, 4);
        for (var i = 0; i < players.length; i++) {
            //saveCardId("before-"+players[i].getId()+".json",players[i].getCards());
            assert.equal(players[i].getCards().length, 4)
        }

    });
    it('Set trump', () => {

        game.setRound(Suit.SPADES, "red", 17);
        game.deal();
        var players = game.getPlayers();
        assert.equal(players.length, 4);
        for (var i = 0; i < players.length; i++) {
            //saveCardId("after-"+players[i].getId()+".json",players[i].getCards());
            assert.equal(players[i].getCards().length, 8)
        }
        assert.equal(game.getRound().getTrumpSuit(), Suit.SPADES);
    });

    it('Move 1', () => {
        var player = moveCard(game, 7);
        assert.equal(player.getCards().length, 7)
        assert.equal(game.getCurrentHandMoveCount(), 1)
    });
    it('Move 2', () => {
        var player = moveCard(game, 4);
        assert.equal(player.getCards().length, 7)
        assert.equal(game.getCurrentHandMoveCount(), 2)
    });

    it('Move 3', () => {
        var player = moveCard(game, 0);
        assert.equal(player.getCards().length, 7)
        assert.equal(game.getCurrentHandMoveCount(), 3)
    });

    it('Move 4', () => {
        var player = moveCard(game, 3);
        assert.equal(player.getCards().length, 7)
        assert.equal(game.getCurrentHandMoveCount(), 4)
    });

    it('1st Hand winner', () => {
       
        var handWinner = game.getHandWinner();
        var handPoint = game.getHandPoints();
        var playerId = handWinner.getPlayerId();
        var player = game.getPlayer(playerId);
        game.setTeamPoint(player.getTeamName(),handPoint);
        var index = game.getPlayerIndex(player);
        game.setTurnIndex(index);
        game.resetHand();

        assert.equal(handWinner.getCard().getId(), "CLUBS-J");
        assert.equal(handPoint, 4);
        assert.equal(playerId, "naveen");
        assert.equal(player.getId(), "naveen");
        assert.equal(player.getTeamName(), "red");
        assert.equal(game.getTeamPoint(player.getTeamName()),4);
        assert.equal(game.getTurnIndex(),index);
    });

    it('Move 5', () => {
        var player = moveCard(game, 0);
        assert.equal(player.getCards().length, 6)
        assert.equal(game.getCurrentHandMoveCount(), 1)
    });
    it('Move 6', () => {
        var player = moveCard(game, 1);
        assert.equal(player.getCards().length, 6)
        assert.equal(game.getCurrentHandMoveCount(), 2)
    });

    it('Move 7', () => {
        var player = moveCard(game, 3);
        assert.equal(player.getCards().length, 6)
        assert.equal(game.getCurrentHandMoveCount(), 3)
    });

    it('Move 8', () => {
        var player = moveCard(game, 0);
        assert.equal(player.getCards().length, 6)
        assert.equal(game.getCurrentHandMoveCount(), 4)
    });

    it('2nd Hand winner', () => {
        var handWinner = game.getHandWinner();
        var handPoint = game.getHandPoints();
        var playerId = handWinner.getPlayerId();
        var player = game.getPlayer(playerId);
        game.setTeamPoint(player.getTeamName(),handPoint);
        var index = game.getPlayerIndex(player);
        game.setTurnIndex(index);

        assert.equal(handWinner.getCard().getId(), "DIAMONDS-J");
        assert.equal(handPoint, 6);
        assert.equal(playerId, "rajeev");
        assert.equal(player.getId(), "rajeev");
        assert.equal(player.getTeamName(), "blue");
        assert.equal(game.getTeamPoint(player.getTeamName()),6);
        assert.equal(game.getTurnIndex(),index);
    });
});

function moveCard(game, cardIndex) {
    var players = game.getPlayers();
    index = game.getTurnIndex();
    var player = players[index];
    var card = player.getCards()[cardIndex];
    game.addMove(player.getId(), card);
    game.setNextTurnIndex();
    return player;
}

function saveCardId(filename, card_list) {
    var list = [];
    for (var i = 0; i < card_list.length; i++) {
        list.push(card_list[i]._id);
    }
    saveToFile(filename, list);
}
function saveToFile(filename, obj) {
    fs.writeFile(filename, JSON.stringify(obj), err => {
        // Checking for errors 
        if (err) throw err;
        console.log("Done writing"); // Success 
    });
}
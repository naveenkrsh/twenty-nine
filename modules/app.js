var Game = require('./Game');
var Channels = require('./Channels');
const { subscriber, publisher } = require('./PubSub');

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
            game.setRound(obj.trump, obj.bidderTeam, obj.bidPoint)
            game.deal();
            console.log(game);
            break;
        case Channels.CARD_PLAYED:
            game.addMove(obj.playerId,obj.card);
            if (game.getCurrentHandMoveCount() == 4) {
                publisher.publish(Channels.HAND_FINISHED, "");
            }
            break;
        case Channels.HAND_FINISHED:
            var handWinner = game.setTeamPoint();
            game.resetHand();

            break;

    }
});
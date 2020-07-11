function Move(playerId,card){
    this._playerId= playerId;
    this._card = card;
}

Move.prototype.getCard= function(){
    return this._card;
}
Move.prototype.getPlayerId= function(){
    return this._playerId;
}

module.exports = Move;
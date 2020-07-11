function Player(name, id,teamName) {
    this._name = name;
    this._id = id;
    this._cards = [];
    this._teamName= teamName;
}

Player.prototype.addCard = function (card) {
    this._cards.push(card);
}
Player.prototype.removeCard = function (card) {

}
Player.prototype.getName=function(){
    return this._name;
}

Player.prototype.getId=function(){
    return this._id;
}
Player.prototype.getTeamName=function(){
    return this._teamName;
}

module.exports = Player;
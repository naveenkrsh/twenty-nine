function Player(name, id, teamName) {
    this._name = name;
    this._id = id;
    this._cards = [];
    this._teamName = teamName;
}

Player.prototype.getCards = function () {
    return this._cards;
}

Player.prototype.addCard = function (card) {
    this._cards.push(card);
}
Player.prototype.removeCard = function (card) {
    const index = this._cards.indexOf(card)
    if (index > -1) {
        this._cards.splice(index, 1);
    }
}
Player.prototype.getName = function () {
    return this._name;
}

Player.prototype.getId = function () {
    return this._id;
}
Player.prototype.getTeamName = function () {
    return this._teamName;
}

module.exports = Player;

function Card(suit,key,point,precedence){
    this._suit = suit;
    this._key = key;
    this._point = point;
    this._precedence = precedence;
    this._id = this._suit+"-"+key;
}

Card.prototype.getSuit = function() {
    return this._suit;
};
Card.prototype.getKey = function() {
    return this._key;
};

Card.prototype.getPoint = function() {
    return this._point;
};

Card.prototype.getPrecedence = function() {
    return this._precedence;
};
Card.prototype.getId = function() {
    return this._id;
};

module.exports = Card;
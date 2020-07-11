function Round(trump,bidderTeam,bidPoint){
    this._trump =trump
    this._bidderTeam = bidderTeam;
    this._bidPoint = bidPoint;
    this._isTrumpOpen = false;
}

Round.prototype.isTrumpOpen= function(){
    return this._isTrumpOpen;
}
Round.prototype.getTrumpSuit = function(){
    return this._trump;
}

module.exports = Round

function Team(name){
    this._name=name;
    this._players = [];
    this._point=0;
    this._current_round_point=0;
}

Team.prototype.addPlayer=function(player){
    this._players.push(player);
}
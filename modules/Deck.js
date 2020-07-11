function Deck(cards){
    this._cards = [...cards];
    this._top = this._cards.length-1;
}

Deck.prototype.shuffle = function() {
    for (let i = this._top; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [this._cards[i], this._cards[j]] = [this._cards[j], this._cards[i]];
    }
};

Deck.prototype.getCards= function(){
    return [...this._cards];
}

Deck.prototype.nextCard= function(){
    if (this._top == -1) {
        console.log("Deck is empty");
        return;
    }

    var card = this._cards[this._top];
    this._top--;
    return card;
}

Deck.prototype.count= function() {
    return this._top + 1;
}

Deck.prototype.reset = function(){
    this._top = this._cards.length-1;
    //this.shuffle();
}

module.exports= Deck;
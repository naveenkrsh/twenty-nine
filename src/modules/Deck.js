export default class Deck {
    constructor(cards, $elem) {
        this._cards = cards;
        this.$elem = $elem;
    }
    createView() {
        for (var i = 0; i < this._cards.length; i++) {
            var card = this._cards[i];
            var suit = card._suit;
            suit = suit.substring(0, suit.length - 1);
            var key = card._key;
            if(key=="J"){
                key = "11-JACK";
            }
            if(key=="Q"){
                key = "12-QUEEN";
            }
            if(key=="K"){
                key = "13-KING";
            }
            if(key=="A"){
                key = "1";
            }
            var cardName = suit+"-"+key;
            cardName = cardName.toUpperCase();

            var cardElem = this.createCardElem(cardName,card._id);
            this.$elem.appendChild(cardElem);
        }
       
    }

    createCardElem(cardName,id) {
        var cardHolder = document.createElement('div');
        cardHolder.className = "card-holder";

        var back = document.createElement('div');
        back.className = "back";

        var card = document.createElement('div');
        card.className = "card";
        card.style.cssText="background-image:url('./images/cards/"+cardName+".svg');";
        card.setAttribute('data-card-id',id);

        card.addEventListener("click",this.onClick);

        cardHolder.appendChild(back);
        cardHolder.appendChild(card);

        return cardHolder;
    }

    onClick(event){
        var $elem = event.target;
        console.log($elem.getAttribute('data-card-id'));
    }
}
const fs = require("fs"); 
const createCards = require('./modules/createCards');
const Deck = require('./modules/Deck');

var cards = createCards();
var deck = new Deck(cards);
deck.shuffle();
fs.writeFile("cards.json", JSON.stringify(deck.getCards()), err => { 
    // Checking for errors 
    if (err) throw err;  
    console.log("Done writing"); // Success 
}); 
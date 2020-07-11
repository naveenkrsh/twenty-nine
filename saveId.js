const fs = require("fs"); 
const card_list = require("./cards");

var list =[];
for(var i =0; i< card_list.length; i++){
    list.push(card_list[i]._id);
}

fs.writeFile("cardsId.json", JSON.stringify(list), err => { 
    // Checking for errors 
    if (err) throw err;  
    console.log("Done writing"); // Success 
}); 
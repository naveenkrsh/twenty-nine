// const { subscriber, publisher } = require('./PubSub');
// var Channels = require('./Channels');

// var players = [{
//     name: "naveen",
//     id: "naveen",
//     team: "red"
// },
// {
//     name: "rajeev",
//     id: "rajeev",
//     team: "blue"
// }, {
//     name: "verma",
//     id: "verma",
//     team: "blue"
// }, {
//     name: "avijeet",
//     id: "avijeet",
//     team: "red"
// }, {
//     name: "x",
//     id: "x",
//     team: "red"
// }]

// for(var i =0 ; i< players.length; i++){
//     publisher.publish(Channels.JOIN_PLAYER, JSON.stringify(players[i]));
// }

// subscriber.quit();
// publisher.quit();
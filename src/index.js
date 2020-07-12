import { MDCDialog } from '@material/dialog';
import { MDCTextField } from '@material/textfield';

import ls from 'local-storage'

import Deck from './modules/Deck';

const socket = io('ws://localhost:3000');
const USER_NAME_KEY = 'username'

socket.on('connect', () => {
    console.log("connected")
    socket.emit('player', "naveen");
});

let counter = 1;
socket.emit('hey', { counter });

socket.on('hello', (counter) => {
    console.log(`hello - ${counter}`);
});

const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
const username = new MDCTextField(document.querySelector('.username'));


if (ls(USER_NAME_KEY) == null) {
    dialog.open();
}
else {
    setUserName(ls(USER_NAME_KEY));
}

dialog.listen('MDCDialog:closing', (event) => {
    if (event.detail.action == 'save-user-name') {
        ls(USER_NAME_KEY, username.value);
        setUserName(username.value);
    }
});

function setUserName(username) {
    document.querySelector('.show-username').innerHTML = 'Welcome ' + username;
}

var $deckElem = document.querySelector('.deck')

var cards = [
    {
        "_suit": "HEARTS",
        "_key": "7",
        "_point": 0,
        "_precedence": 0,
        "_id": "HEARTS-7"
    },
    {
        "_suit": "SPADES",
        "_key": "J",
        "_point": 3,
        "_precedence": 7,
        "_id": "SPADES-J"
    },
    {
        "_suit": "DIAMONDS",
        "_key": "K",
        "_point": 0,
        "_precedence": 5,
        "_id": "DIAMONDS-K"
    },
    {
        "_suit": "CLUBS",
        "_key": "J",
        "_point": 3,
        "_precedence": 7,
        "_id": "CLUBS-J"
    },
    {
        "_suit": "SPADES",
        "_key": "A",
        "_point": 1,
        "_precedence": 6,
        "_id": "SPADES-A"
    },
    {
        "_suit": "HEARTS",
        "_key": "8",
        "_point": 0,
        "_precedence": 1,
        "_id": "HEARTS-8"
    },
    {
        "_suit": "DIAMONDS",
        "_key": "A",
        "_point": 1,
        "_precedence": 6,
        "_id": "DIAMONDS-A"
    },
    {
        "_suit": "SPADES",
        "_key": "8",
        "_point": 0,
        "_precedence": 1,
        "_id": "SPADES-8"
    },
    {
        "_suit": "HEARTS",
        "_key": "J",
        "_point": 3,
        "_precedence": 7,
        "_id": "HEARTS-J"
    },
    {
        "_suit": "CLUBS",
        "_key": "7",
        "_point": 0,
        "_precedence": 0,
        "_id": "CLUBS-7"
    },
    {
        "_suit": "DIAMONDS",
        "_key": "Q",
        "_point": 0,
        "_precedence": 4,
        "_id": "DIAMONDS-Q"
    },
    {
        "_suit": "SPADES",
        "_key": "9",
        "_point": 2,
        "_precedence": 2,
        "_id": "SPADES-9"
    },
    {
        "_suit": "HEARTS",
        "_key": "Q",
        "_point": 0,
        "_precedence": 4,
        "_id": "HEARTS-Q"
    },
    {
        "_suit": "DIAMONDS",
        "_key": "10",
        "_point": 1,
        "_precedence": 3,
        "_id": "DIAMONDS-10"
    },
    {
        "_suit": "CLUBS",
        "_key": "Q",
        "_point": 0,
        "_precedence": 4,
        "_id": "CLUBS-Q"
    },
    {
        "_suit": "CLUBS",
        "_key": "8",
        "_point": 0,
        "_precedence": 1,
        "_id": "CLUBS-8"
    },
    {
        "_suit": "CLUBS",
        "_key": "10",
        "_point": 1,
        "_precedence": 3,
        "_id": "CLUBS-10"
    },
    {
        "_suit": "SPADES",
        "_key": "10",
        "_point": 1,
        "_precedence": 3,
        "_id": "SPADES-10"
    },
    {
        "_suit": "CLUBS",
        "_key": "A",
        "_point": 1,
        "_precedence": 6,
        "_id": "CLUBS-A"
    },
    {
        "_suit": "HEARTS",
        "_key": "9",
        "_point": 2,
        "_precedence": 2,
        "_id": "HEARTS-9"
    },
    {
        "_suit": "HEARTS",
        "_key": "A",
        "_point": 1,
        "_precedence": 6,
        "_id": "HEARTS-A"
    },
    {
        "_suit": "SPADES",
        "_key": "K",
        "_point": 0,
        "_precedence": 5,
        "_id": "SPADES-K"
    },
    {
        "_suit": "HEARTS",
        "_key": "10",
        "_point": 1,
        "_precedence": 3,
        "_id": "HEARTS-10"
    },
    {
        "_suit": "DIAMONDS",
        "_key": "7",
        "_point": 0,
        "_precedence": 0,
        "_id": "DIAMONDS-7"
    },
    {
        "_suit": "SPADES",
        "_key": "7",
        "_point": 0,
        "_precedence": 0,
        "_id": "SPADES-7"
    },
    {
        "_suit": "SPADES",
        "_key": "Q",
        "_point": 0,
        "_precedence": 4,
        "_id": "SPADES-Q"
    },
    {
        "_suit": "DIAMONDS",
        "_key": "J",
        "_point": 3,
        "_precedence": 7,
        "_id": "DIAMONDS-J"
    },
    {
        "_suit": "CLUBS",
        "_key": "9",
        "_point": 2,
        "_precedence": 2,
        "_id": "CLUBS-9"
    },
    {
        "_suit": "DIAMONDS",
        "_key": "9",
        "_point": 2,
        "_precedence": 2,
        "_id": "DIAMONDS-9"
    },
    {
        "_suit": "CLUBS",
        "_key": "K",
        "_point": 0,
        "_precedence": 5,
        "_id": "CLUBS-K"
    },
    {
        "_suit": "HEARTS",
        "_key": "K",
        "_point": 0,
        "_precedence": 5,
        "_id": "HEARTS-K"
    },
    {
        "_suit": "DIAMONDS",
        "_key": "8",
        "_point": 0,
        "_precedence": 1,
        "_id": "DIAMONDS-8"
    }
]

var cards_8=[    {
    "_suit": "HEARTS",
    "_key": "7",
    "_point": 0,
    "_precedence": 0,
    "_id": "HEARTS-7"
},
{
    "_suit": "SPADES",
    "_key": "J",
    "_point": 3,
    "_precedence": 7,
    "_id": "SPADES-J"
},
{
    "_suit": "DIAMONDS",
    "_key": "K",
    "_point": 0,
    "_precedence": 5,
    "_id": "DIAMONDS-K"
},
{
    "_suit": "CLUBS",
    "_key": "J",
    "_point": 3,
    "_precedence": 7,
    "_id": "CLUBS-J"
},
{
    "_suit": "SPADES",
    "_key": "A",
    "_point": 1,
    "_precedence": 6,
    "_id": "SPADES-A"
},
{
    "_suit": "HEARTS",
    "_key": "8",
    "_point": 0,
    "_precedence": 1,
    "_id": "HEARTS-8"
},
{
    "_suit": "DIAMONDS",
    "_key": "A",
    "_point": 1,
    "_precedence": 6,
    "_id": "DIAMONDS-A"
},
{
    "_suit": "SPADES",
    "_key": "8",
    "_point": 0,
    "_precedence": 1,
    "_id": "SPADES-8"
}]

var deckObj = new Deck(cards_8, $deckElem);
deckObj.createView();
import './styles/main.css';

const socket = io('ws://localhost:3000');

socket.on('connect', () => {
    console.log("connected")
    socket.emit('player', "naveen"); 
});

let counter = 1;
socket.emit('hey', { counter });

socket.on('hello', (counter) => {
    console.log(`hello - ${counter}`);
});
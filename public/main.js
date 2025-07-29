const socket = io()

const totalClients = document.getElementById('clients-total');
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const messageForm = document.getElementById('message-form');
const nameInput = document.getElementById('name-input');

messageForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    sendMessage();
})

function sendMessage(){
    console.log(messageInput.value)
    const data = {
        name : nameInput.value,
        message : messageInput.value,
        dateTime : new Date()
    }
    socket.emit('message', data);
}

socket.on('chat-message', (data)=>{
    console.log(data);
})

socket.on('clients-total',(data)=>{
    totalClients.innerText = `Total clients : ${data}`;
})
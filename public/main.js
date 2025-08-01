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
    if(messageInput.value === '')return;
    console.log(messageInput.value)
    const data = {
        name : nameInput.value,
        message : messageInput.value,
        dateTime : new Date()
    }
    socket.emit('message', data);
    addMessageToUI(true,data);
    messageInput.value = '';
}

function addMessageToUI(isOwnMessage, data){
    clearFeedback()
    const element = 
        `
            <li class="${isOwnMessage ? "message-right"  : "message-left"}">
                <p class="message">
                    ${data.message}
                    <span>${data.name} ● ${moment(data.dateTime)}</span>
                </p>
            </li>
        `
    messageContainer.innerHTML += element
    scrollBottom();
}
socket.on('chat-message', (data)=>{
    // console.log(data);
    addMessageToUI(false, data);
})

socket.on('clients-total',(data)=>{
    totalClients.innerText = `Total clients : ${data}`;
})

function scrollBottom(){
    messageContainer.scrollBy(0, messageContainer.scrollHeight);
}

messageInput.addEventListener('focus', (e)=>{
    socket.emit('feedback', {
        feedback : `${nameInput.value} is typing`
    })
})
messageInput.addEventListener('keypress', (e)=>{
    socket.emit('feedback', {
        feedback : `${nameInput.value} is typing`
    })
})
messageInput.addEventListener('blur', (e)=>{
    socket.emit('feedback', {
        feedback : ''
    })
})

socket.on('feedback', (data)=>{
    clearFeedback()
    const element =
    `
        <li class="message-feedback">
        <p class="feedback" id="feedback">${data.feedback}</p>
        </li>    
    `
    messageContainer.innerHTML += element;
})

function clearFeedback(){
    document.querySelectorAll('li.message-feedback').forEach(element=>{
        element.parentNode.removeChild(element);
    })
}
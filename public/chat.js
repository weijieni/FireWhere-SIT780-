const socket = io('http://localhost:8080')
var messageContainer = document.getElementById('message-container')
var messageForm = document.getElementById('send-container')
var messageInput = document.getElementById('message-input')

const name = document.getElementById('chat-name')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(data)
})

messageForm.addEventListener('submit', e=> {
    e.preventDefault()
    var message = messageInput.value
    $(".message-container").append("<div>"+message+"</div>")
    console.log(message)
    socket.emit('send-chat-message', message)
    messageInput.value=''
})

function appendMessage(message) {
    // var messageElement = document.createElement('div')
    // messageElement.innerText = message
    // messageContainer.append(messageElement)
    $(".message-container").append("<div>"+message+"</div>")
}
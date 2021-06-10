const socket = io('http://40j2u94005.oicp.vip')
var messageContainer = document.getElementById('message-container')
var messageForm = document.getElementById('send-container')
var messageInput = document.getElementById('message-input')

let times

appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(data)
})

messageForm.addEventListener('submit', e=> {
    times = new Date().toLocaleTimeString()
    e.preventDefault()
    var message = messageInput.value
    $(".message-container").append("<div>" + times + " --- " +message  + "</div>")

    console.log(message)
    socket.emit('send-chat-message', message)
    messageInput.value=''
})

function appendMessage(message) {
    // var messageElement = document.createElement('div')
    // messageElement.innerText = message
    // messageContainer.append(messageElement)
    times = new Date().toLocaleTimeString()
    $(".message-container").append("<div>" + times + " --- " +message  + "</div>")
}
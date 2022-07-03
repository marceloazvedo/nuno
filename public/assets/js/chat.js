const socket = io()
const formWithMessage = document.getElementsByTagName('form')[0]
const messagesPanel = document.getElementById('messages')

const sendMessage = (event) => {
    const messageInput = document.getElementById('m')
    const messageValue = messageInput.value
    socket.emit('new-message', messageValue)
    messageInput.value = ''
    event.preventDefault()
}

const processReceivedMessage = (message) => {
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(message))
    messagesPanel.appendChild(li)
}

formWithMessage.addEventListener('submit', sendMessage)

socket.on('new-message', processReceivedMessage)
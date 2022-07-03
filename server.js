const PORT = process.env.port || 4000

const express = require('express')
const http = require('http')
const socket = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socket(server)

app.use(express.static('public'))

io.on('connection', (socket) => {
    const NEW_MESSAGE_EVENT = 'new-message'
    
    console.log('Client connected.')
    socket.on('disconnect', () => {
        console.log('Cliente was disconected!')
    })

    socket.on(NEW_MESSAGE_EVENT, (message) => {
        io.emit(NEW_MESSAGE_EVENT, message)
    })

})

server.listen(PORT, () => {
    console.log(`Server linten on ${PORT}`)
})
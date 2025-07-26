const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 4000
const server = app.listen(PORT, ()=> console.log(`server started on port : ${PORT}`))
const io = require('socket.io')(server)
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', onConnected )

let socketsConnected = new Set()
function onConnected(socket){
    console.log(socket.id)
    socketsConnected.add(socket.id)
    io.emit('clients-total', socketsConnected.size)

    socket.on('disconnect', ()=>{
        console.log('socket disconnected : ', socket.id)
        socketsConnected.delete(socket.id)
        io.emit(
            'clients-total' , socketsConnected.size
        )
    })
}

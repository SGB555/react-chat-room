const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const User = model.getModel('user')
// work with express
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', socket => {
    // console.log('user login');
    // socket为当前请求，io为全局请求
    socket.on('sendMsg', (data) => {
        const { from, to, msg } = data
        const chatId = [from, to].sort().join('_')
        let obj = {
            chatId,
            from,
            to,
            content: msg
        }
        Chat.create(obj, function (err, doc) {
            io.emit('recvMsg', Object.assign({}, doc._doc))
        })
    })
})

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>')
})
server.listen(9093, function () {
    console.log('Node app start at port 9093')
})




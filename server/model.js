const mongoose = require('mongoose')
// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc-chat'
mongoose.connect(DB_URL)

const models = {
    user: {
        'user': { type: String, 'require': true },
        'pwd': { type: String, 'require': true },
        'type': { type: String, 'require': true },
        // 头像
        'avatar': { 'type': String },
        'desc': { 'type': String },
        'title': { 'type': String },
        'company': { 'type': String },
        'money': { 'type': String }
    },
    chat: {
        'chatId': { 'type': String, 'require': true },
        'from': { 'type': String, 'require': true },
        'to': { 'type': String, 'require': true },
        'read': { 'type': Boolean, 'default': false },
        'content': { 'type': String, 'require': true, 'default': '' },
        'create_time': { 'type': Number, 'default': new Date().getTime() },
    }
}

for (let i in models) {
    mongoose.model(i, new mongoose.Schema(models[i]))
}
module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}
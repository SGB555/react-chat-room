const express = require('express')
const Router = express.Router()
const model = require('./model')
//设置为0则不返回
const _filter = { 'pwd': 0, '__v': 0 }
const User = model.getModel('user')
const utils = require('utility')
const Chat = model.getModel('chat')
Router.get('/list', (req, res) => {
    // User.remove({}, function (e, d) { })
    const type = req.query.type
    User.find({ type }, (err, doc) => {
        return res.json({ code: 0, data: doc })
    })
})
Router.get('/getMsgList', (req, res) => {
    const userId = req.cookies.userId

    User.find({}, function (e, userdoc) {
        let users = {}
        userdoc.forEach(item => {
            users[item._id] = { name: item.user, avatar: item.avatar }
        })
        Chat.find({ '$or': [{ from: userId }, { to: userId }] }, (err, doc) => {
            if (!err) {
                return res.json({ code: 0, msgs: doc, users: users })
            }
        })
    })

})
Router.post('/login', (req, res) => {
    const { user, pwd } = req.body
    User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, (e, d) => {
        console.log(md5Pwd(pwd));
        if (!d) {
            return res.json({ code: 1, msg: '用户名或者密码错误' })
        }
        res.cookie('userId', d._id)
        return res.json({ code: 0, data: d })
    })
})
Router.post('/register', (req, res) => {
    const { user, pwd, type } = req.body
    User.findOne({ user }, (e, d) => {
        if (d) {
            return res.json({ code: 1, msg: '用户名重复' })
        }
        const userModel = new User({ user, type, pwd: md5Pwd(pwd) })
        userModel.save((e, d) => {
            if (e) {
                return res.json({ code: 1, msg: '后端出错了' })
            }
            const { user, type, _id } = d
            res.cookie('userId', _id)
            return res.json({ code: 0, data: { user, type, _id } })
        })
    })
})
Router.get('/info', (req, res) => {
    const { userId } = req.cookies
    if (!userId) {
        return res.json({ code: 1 })
    }
    User.findOne({ _id: userId }, _filter, (e, d) => {
        if (e) {
            return res.json({ code: 1, msg: '后端出错了' })
        }
        if (d) {
            return res.json({ code: 0, data: d })
        }
    })
})
Router.post('/update', (req, res) => {
    const userId = req.cookies.userId
    if (!userId) {
        return json.dumps({ code: 1 })
    }
    const body = req.body
    User.findByIdAndUpdate(userId, body, (err, doc) => {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        console.log(data);
        return res.json({ code: 0, data })
    })
})

const md5Pwd = pwd => {
    const salt = utils.md5('alalalal2...3.45')
    return utils.md5(utils.md5(pwd + salt))
}
module.exports = Router
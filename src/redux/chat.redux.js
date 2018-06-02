import io from 'socket.io-client'
import axios from 'axios'
const socket = io('ws://localhost:9093')
// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取消息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatMsg: [],
    users: {},
    unread: 0
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                chatMsg: action.payload.msgs,
                users: action.payload.users,
                unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userId).length
            }
        case MSG_RECV:
            const unReadNum = action.payload.to === action.payload.userId ? 1 : 0;
            return {
                ...state,
                chatMsg: [...state.chatMsg, action.payload],
                unread: state.unread + unReadNum
            }
        case MSG_READ:
        default:
            return state
    }
}
function msgList(msgs, users, userId) {
    return { type: MSG_LIST, payload: { msgs, users, userId } }
}
function msgRecv(msg, userId) {
    return { type: MSG_RECV, payload: { msg, userId } }
}
export function recvMsg() {
    return (dispatch, getState) => {
        const userId = getState().user._id
        console.log(getState());
        socket.on('recvMsg', function (data) {
            dispatch(msgRecv(data, userId))
        })
    }
}
export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getMsgList').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const userId = getState().user._id
                console.log(getState());
                dispatch(msgList(res.data.msgs, res.data.users, userId))
            }
        }).catch(err => {
            throw err
        })
    }
}
export function sendMsg({ from, to, msg }) {
    return dispatch => {
        socket.emit('sendMsg', ...arguments)
    }
}
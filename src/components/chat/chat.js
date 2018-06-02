import React from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
const socket = io('ws://localhost:9093')
@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
)
// todo: 
// 发送聊天内容后滚动列表至最后
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
    }
    componentDidMount() {
        if (!this.props.chat.chatMsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    handlerSumbit() {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({ from, to, msg })
        this.setState({ text: '' });
    }
    render() {
        const userId = this.props.match.params.user
        const Item = List.Item
        const userList = this.props.chat.users
        if (!userList[userId]) {
            return null
        }
        const chatId = getChatId(userId, this.props.user._id)
        const charMsgs = this.props.chat.chatMsg.filter(item => item.chatId === chatId)
        return (
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    icon={<Icon type='left' />}
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {userList[userId].name}
                </NavBar>
                <div className='scroll-container'>
                    {charMsgs.map(v => {
                        const avatar = require(`../img/${userList[v.from].avatar}.png`)
                        if (v.content) {
                            return v.from === userId ? (
                                <List key={v._id}>
                                    <Item
                                        thumb={avatar}
                                    >{v.content}</Item>
                                </List>
                            ) : (
                                    <List key={v._id}>
                                        <Item
                                            extra={<img src={avatar} />}
                                            className='chat-me'
                                        >{v.content}</Item>
                                    </List>
                                )
                        }
                    })}
                </div>

                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={item => { this.setState({ text: item }) }}
                            extra={
                                <span onClick={() => this.handlerSumbit()}> 发送 </span>
                            }
                        >
                            信息
                    </InputItem>
                    </List>
                </div>
            </div>
        )
    }
}
export default Chat
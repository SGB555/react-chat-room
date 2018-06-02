import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../navLink/navLink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import UserInfo from '../userInfo/userInfo'
import { getMsgList, recvMsg } from '../../redux/chat.redux'
function msg() {
    return <h2>消息列表</h2>
}

@connect(
    state => state,
    { getMsgList, recvMsg }
)
class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chatMsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    render() {
        const pathName = this.props.location.pathname
        const user = this.props.user
        const navlist = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/message',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: msg,
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: UserInfo,
            }
        ]

        return (
            <div className='dashboard-wrap'>
                <NavBar mode='dard' className='fixed-header'>
                    {navlist.find(item => item.path === pathName) ? navlist.find(item => item.path === pathName).title : null}
                </NavBar>
                <div className='dashboard-content'>
                    <Switch>
                        {
                            navlist.map(item =>
                                <Route
                                    key={item.path}
                                    path={item.path}
                                    component={item.component}
                                >
                                </Route>
                            )
                        }
                    </Switch>
                </div>
                <NavLinkBar data={navlist} className=''></NavLinkBar>
            </div>
        )
    }
}
export default Dashboard
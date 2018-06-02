import React from 'react'
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { loginEvent } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import imoocForm from "../../components/imoocForm/imoocForm";
@connect(
    state => state.user,
    { loginEvent }
)
@imoocForm
class login extends React.Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this)
    }
    componentWillMount() {
        console.log(this.props);

        if (document.cookie.includes('userId') && this.props.location.pathname === '/login') {
            this.props.history.goBack()
        }
    }
    register() {
        this.props.history.push('/register')
    }
    handleLogin() {
        this.props.loginEvent(this.props.state)
    }
    render() {
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <h1>登录</h1>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem onChange={(v) => this.props.handleChange('user', v)}>用户</InputItem>
                        <WhiteSpace />
                        <WhiteSpace />
                        <InputItem onChange={(v) => this.props.handleChange('pwd', v)} type='password'>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type='primary' onClick={() => this.handleLogin()}>登录</Button>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default login
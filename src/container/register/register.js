import React from 'react'
import Logo from '../../components/logo/logo'
import { List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { registerEvent } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import imoocForm from "../../components/imoocForm/imoocForm";
@connect(
    state => state.user,
    { registerEvent }
)
@imoocForm
class register extends React.Component {
    componentDidMount() {
        this.props.handleChange('type', 'genius')
    }
    handleRegister() {
        this.props.registerEvent(this.props.state)
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <List>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <InputItem
                        onChange={(v) => this.props.handleChange('user', v)}
                    >用户名</InputItem>
                    <WhiteSpace />
                    <InputItem
                        onChange={(v) => this.props.handleChange('pwd', v)}
                        type='password'
                    >密码</InputItem>
                    <WhiteSpace />
                    <InputItem
                        onChange={(v) => this.props.handleChange('repeatpwd', v)}
                        type='password'
                    >确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem
                        checked={this.props.state.type === 'genius'}
                        onChange={() => this.props.handleChange('type', 'genius')}
                    >
                        genius
                    </RadioItem>
                    <WhiteSpace />
                    <RadioItem
                        checked={this.props.state.type === 'boss'}
                        onChange={() => this.props.handleChange('type', 'boss')}
                    >
                        boss
                    </RadioItem>
                    <WhiteSpace />
                    <Button
                        type='primary'
                        onClick={() => this.handleRegister()}
                    >register</Button>
                </List>
            </div>
        )
    }
}
export default register

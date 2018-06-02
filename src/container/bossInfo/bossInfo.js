import React from 'react'
import { NavBar, InputItem, TextareaItem, Button, WhiteSpace } from 'antd-mobile'
import AvatatSelector from '../../components/avatarSelector/avatarSelector'
import './bossInfo.css'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
    state => state.user,
    { update }
)
class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            company: '',
            money: '',
            desc: '',
            avatar: ''
        }
        this.selectAvatar = this.selectAvatar.bind(this)
    }
    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    selectAvatar(imgName) {
        this.setState({
            avatar: imgName
        })
    }
    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            < div className='bossInfo-wrap' >
                {redirect && redirect !== path ? <Redirect to={redirect}></Redirect> : null}
                <div className='bossInfo-main'>
                    <NavBar mode="dark">BOSS完善信息页</NavBar>
                    <AvatatSelector selectAvatar={this.selectAvatar}></AvatatSelector>
                    <InputItem onChange={(v) => this.onChange('title', v)}>
                        招聘职位
                    </InputItem>
                    <InputItem onChange={(v) => this.onChange('company', v)}>
                        公司名称
                    </InputItem>
                    <InputItem onChange={(v) => this.onChange('money', v)}>
                        职位薪资
                    </InputItem>
                    <TextareaItem
                        title="职位要求"
                        placeholder="请输入职位要求"
                        autoHeight
                        row={3}
                        onChange={(v) => this.onChange('desc', v)}
                    />
                    <WhiteSpace size='lg' />
                </div>
                <div className='bossInfo-footer'>
                    <Button
                        type='primary'
                        onClick={() => {
                            this.props.update(this.state)
                        }}
                    >确定</Button>
                </div>
            </div >
        )
    }
}

export default BossInfo 
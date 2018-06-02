import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../userCard/userCard'

@connect(
    state => state.chatUser,
    { getUserList }
)
class Boss extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentWillMount() {
        this.props.getUserList('boss')
    }
    render() {
        return (
            <UserCard userList={this.props.userList}></UserCard>
        )
    }
}
export default Boss
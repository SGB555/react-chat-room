import React from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'
@withRouter
@connect(
    state => state.user,
    { loadData }
)
class AuthRoute extends React.Component {
    
    componentDidMount() {

        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;
        if (publicList.includes(pathname)) {
            return null
        }
        axios.get('/user/info')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        // console.log(this.props, res.data.data);

                        this.props.loadData(res.data.data)
                    } else {
                        this.props.history.push('/login')
                    }
                }
            })
    }
    render() {
        return null
    }
}
export default AuthRoute
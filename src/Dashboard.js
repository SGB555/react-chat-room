import React from 'react'
import { Link, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import App from './App'
import { logout } from './Auth.redux.js'
const kwok = function () {
    return <h1>kwok</h1>
}
const pok = function () {
    return <h1>pok</h1>
}
@connect(
    state => state.auth,
    { logout }
)
class Dashboard extends React.Component {
    render() {
        const redirectToLogin = <Redirect to='/login'></Redirect>
        const match = this.props.match
        const app = (
            <div>
                <h1>独立团</h1>
                {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
                <ul>
                    <li>
                        <Link to={`${match.url}/`}>shum</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/kwok`}>kwok</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/pok`}>pok</Link>
                    </li>
                </ul>
                <Route path={`${match.url}/`} component={App} exact></Route>
                <Route path={`${match.url}/kwok`} component={kwok}></Route>
                <Route path={`${match.url}/pok`} component={pok}></Route>
            </div>
        )
        return this.props.isAuth ? app : redirectToLogin
    }
}

export default Dashboard


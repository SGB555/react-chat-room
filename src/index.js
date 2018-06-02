import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {
    BrowserRouter,
    Route,
    // Redirect,
    Switch
} from 'react-router-dom'

import reducers from './reducer'
import './config'
import Register from './container/register/register'
import Login from './container/login/login'
import 'antd-mobile/dist/antd-mobile.css';
import AuthRoute from './components/authRoute/authRoute'
import './index.css'
import BossInfo from './container/bossInfo/bossInfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import Dashboard from './components/dashboard/dashboard'
import Chat from './components/chat/chat'
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))
//boss genius mine msg 4个页面
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div className='wh100'>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/chat/:user' component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>)
    , document.getElementById('root')
); 
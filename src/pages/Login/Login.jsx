import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import MainPage from '../UserCenter/MainPage'   //任务领取界面
import LoginInterface from './LoginInterface'

import Signup from './Signup'


export default class Login extends Component {
    render() {
        return (
                <Switch>
                    <Route path="/UserCenter" component={MainPage}></Route>
                    <Route path="/LoginInterface" component={LoginInterface}></Route>
                    <Route path="/Signup" component={Signup}></Route>
                    <Redirect to="/LoginInterface"></Redirect>
                </Switch>
        )
    }
}



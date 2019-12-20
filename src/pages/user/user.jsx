import React, {Component} from 'react'
import {Switch,Route,Redirect} from "react-router-dom";
import UserAddUpdate from './add-update'
import UserDetail from './detail'
import UserHome from './home'
import './user.less'
/*
用户路由
 */
export default class User extends Component {
    render() {
        return(
            <Switch>
                <Route path='/user' component={UserHome} exact/>    /*6.1 需要使用路径完全匹配,不用逐层匹配*/
                <Route path='/user/addupdate' component={UserAddUpdate} exact/>
                <Route path='/user/detail' component={UserDetail} exact/>
                <Redirect to='/user'/>
            </Switch>
        )
    }
}
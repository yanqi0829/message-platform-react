import React, {Component} from 'react'
import {Switch,Route} from "react-router-dom";
import TemplateAddUpdate from './add-update'
import TemplateDetail from './detail'
import TemplateHome from './home'

/*
模版路由组件
 */
export default class Template extends Component {
    render() {
    return(
        <Switch>
            <Route path='/template' component={TemplateHome} exact/>    /*6.1 需要使用路径完全匹配,不用逐层匹配*/
            <Route path='/template/addupdate' component={TemplateAddUpdate} exact/>
            <Route path='/template/detail' component={TemplateDetail} exact/>
        </Switch>
    )
    }
}
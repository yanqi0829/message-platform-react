/*
1.3 React表面没有使用，但必须引入，Component是React对象的一个属性
    如果不引入Component，需要使用 extends React.Component
* */
import React,{Component} from 'react'
// 1.7 引入antd   yarn add antd
import {Button, message} from 'antd'
//2.2引入路由
import  {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
/*
1.2应用的根组件
简单的组件用函数定义，复杂的组件用类定义，区别在于有没有状态
 */
export default class App extends Component{

    handleClick=()=>{
        message.success('Click OK')
    }

    // 1.4类组件必须有一个函数render,render必须返回一个虚拟DOM对象(使用jsx标签语法)
    render() {
        return(
            /*1.8 antd的Button组件， 组件一般开头大写,添加回调函数handleClick
            <Button type="primary" onClick={this.handleClick}>Primary</Button>
            2.3 路由标签  与路由器标签*/
            <BrowserRouter>
                <Switch>   {/*只匹配其中一个*/}
                <Route path='/login'  component={Login}></Route>
                <Route path='/'  component={Admin}></Route>
                </Switch>
            </BrowserRouter>

        )
    }
}
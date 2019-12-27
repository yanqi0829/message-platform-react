import React,{Component} from 'react'
import  memoryUtils from '../../utils/memoryUtils'
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd';
import  Header from '../../components/header'
import  LeftNav from '../../components/left-nav'
import Home from '../home/home'
import User from '../user/user'
import Template from '../template/template'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Category from '../category/category'
import CategoryAudit from '../category/audit'
const {  Footer, Sider, Content } = Layout;

// import {Button} from "antd";
/*
* 3.1后台管理的路由组件
* */

export  default  class Admin extends Component{
    render() {
        const user = memoryUtils.user
        /*如果内存中没有存储user==》没有登录*/
        // if(!user||!user._id){
        // console.log(user,user._id)
        // console.log('属性个数',Object.getOwnPropertyNames(user).length)
        if(Object.getOwnPropertyNames(user).length===0){
        /*在render()中自动跳转到登录界面  和事件回调函数的跳转history不一样*/
            return <Redirect to={'/login'}/>
        }
        return(
            /*style后面跟两个大括号  第一个为js代码  第二个为js对象*/
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin:'20px',backgroundColor:'white'}}>
                    {/*4.2嵌入各个路由
                        发放的路由地址不符合 直接Redirect /home
                    */}
                    <Switch>
                        <Route path='/home' component={Home}/>
                        <Route path='/category' component={Category}/>
                        <Route path='/gatewayAudit' component={CategoryAudit}/>
                        <Route path='/template' component={Template}/>
                        {/*<Route path='/adminAudit' component={TemplateAudit}/>*/}
                        <Route path='/user' component={User}/>
                        <Route path='/role' component={Role}/>
                        <Route path='/charts/bar' component={Bar}/>
                        <Route path='/charts/pie' component={Pie}/>
                        <Route path='/charts/line' component={Line}/>
                            <Redirect to='/home'/>
                    </Switch>
                    </Content>
                    {/*<Footer>Footer</Footer>*/}
                </Layout>
            </Layout>
        )
    }
}
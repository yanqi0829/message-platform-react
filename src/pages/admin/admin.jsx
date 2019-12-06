import React,{Component} from 'react'
import  memoryUtils from '../../utils/memoryUtils'
import {Redirect} from 'react-router-dom'
import { Layout } from 'antd';
import  Header from '../../components/header'
import  LeftNav from '../../components/left-nav'
const {  Footer, Sider, Content } = Layout;
// import {Button} from "antd";
/*
* 3.1后台管理的路由组件
* */

export  default  class Admin extends Component{
    render() {
        const user = memoryUtils.user
        /*如果内存中没有存储user==》没有登录*/
        // if(!user||!user._id){   不好使
        // console.log(user,user._id)
        console.log('属性个数',Object.getOwnPropertyNames(user).length)
        if(Object.getOwnPropertyNames(user).length==0){
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
                    <Content style={{backgroundColor:'white'}}>Content</Content>
                    {/*<Footer>Footer</Footer>*/}
                </Layout>
            </Layout>
        )
    }
}
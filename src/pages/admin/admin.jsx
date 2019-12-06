import React,{Component} from 'react'
import  memoryUtils from '../../utils/memoryUtils'
import {Redirect} from 'react-router-dom'
// import {Button} from "antd";
/*
* 3.1后台管理的路由组件
* */

export  default  class Admin extends Component{
    render() {
        const user = memoryUtils.user
        //如果内存中没有存储user==》没有登录
        if(!user||!user._id){
        //在render()中自动跳转到登录界面  和事件回调函数的跳转history不一样
            return <Redirect to={'/login'}/>
        }
        return(
          <div>Hello {user.username} </div>
        )
    }
}
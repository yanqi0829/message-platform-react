import React, {Component} from 'react'
import './index.less'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import {Modal} from 'antd';
import  LinkButton from '../link-button'

const {confirm} = Modal;

/*
4.1 左侧导航组件
 */
class Header extends Component {
    state = {
        currentTime: formateDate(Date.now())
    }

    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title
                }
            }

        })
        return title
    }

    logout = () => {
        confirm({
            content: '确定退出嘛？',
            onOk:()=> {   //箭头函数使用外部的this
              //删除保存的user数据
                storageUtils.removeUser()
                memoryUtils.user={}
                //跳转到登录页
                this.props.history.replace('/login')
            }
        })
    }


    /*
     第一次render之后执行一次，一般在次执行异步操作 ajax 或定时器
    * */
    componentDidMount() {
       this.intervalId= setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        }, 1000)
    }
    /* 当前组件卸载之前*/
    componentWillUnmount() {
       //清除定时器
        clearInterval(this.intervalId)
    }

    render() {
        const {currentTime} = this.state
        const username = memoryUtils.user.username
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.logout}>退出 </LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'> {title}</div>
                    <div className='header-bottom-right'></div>

                    <span>{currentTime}</span>
                    {/* <img src="" alt=""/>
            <span>晴天</span>*/}
                </div>
            </div>
        )
    }


}

export default withRouter(Header)
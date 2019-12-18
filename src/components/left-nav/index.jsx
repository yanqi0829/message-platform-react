import React, {Component} from 'react'
import './index.less'
import {Link, withRouter} from 'react-router-dom'
import logo from "../../assets/images/logo.png";
import {Menu, Icon, Button} from 'antd';
import menuList from '../../config/menuConfig'

const {SubMenu} = Menu;

/*
4.1 左侧导航组件
    Menu组件使用antd，在pages中创建各路由组件， admin管理页去映射
 */
class LeftNav extends Component {
    /*
        根据menu的数据数组生成对应的标签数组
         {
            title: '首页', // 菜单标题名称
            key: '/home', // 对应的path
            icon: 'home', // 图标名称
        } 映射为
        <Menu.Item key="/home">
         <Link to='/home'>
           <Icon type="pie-chart"/>
            <span>首页</span>
          </Link>
        </Menu.Item>

    */
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname
        return menuList.map(item => {
                if (!item.children) {
                    return (
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>

                    )
                } else {
                    //查找一个与当前请求路径匹配的子Item
                    // const cItem = item.children.find(cItem => cItem.key === path)
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                    if (cItem) {
                        this.openKey = item.key  //得到父的key
                    }
                    return (
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </span>
                            }
                        >
                            {this.getMenuNodes(item.children)}
                        </SubMenu>

                    )
                }


            }
        )
    }

    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }


    render() {
        // debugger
        //得到当前请求的路径
        let path = this.props.location.pathname
        if (path.indexOf('/template') === 0) {
            path = '/template'
        }
        //得到需要打开的菜单项的key
        const openKey = this.openKey

        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo"/>
                    <h1>短信平台</h1>
                </Link>
                <Menu
                    // defaultSelectedKeys={[path]}
                    selectedKeys={[path]}   // 刷新页面，依然选中原有菜单项  因为 leftNav 组件更新
                    defaultOpenKeys={[openKey]}   //默认展开
                    mode="inline"
                    theme="dark"
                >
                    {/* 4.3点击标签跳转到指定路由地址， Menu.Item下使用Link包裹
                    <Menu.Item key="/home">
                        <Link to='/home'>
                            <Icon type="pie-chart"/>
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                <Icon type="mail"/>
                <span>商品</span>
              </span>
                        }
                    >
                        <Menu.Item key="/category">
                            <Link to='/category'>
                                <Icon type="mail"/>
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/template">
                            <Link to='/template'>
                                <Icon type="mail"/>
                                <span>模版管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/user">
                        <Link to='/user'>
                            <Icon type="pie-chart"/>
                            <span>用户管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/role">
                        <Link to='/role'>
                            <Icon type="pie-chart"/>
                            <span>角色管理</span>
                        </Link>
                    </Menu.Item>*/}
                    {/* 4.4动态生成 菜单*/}
                    {
                        this.menuNodes
                    }


                </Menu>


            </div>
        )
    }
}

/* 4.5withRouter 高阶组件  返回新的组件  传递3个属性 history location match
   使得刷新页面仍然选中之前标签
* */
export default withRouter(LeftNav)


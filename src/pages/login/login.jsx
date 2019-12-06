import React, {Component} from 'react'
import {Form, Icon, Input, Button,Checkbox} from 'antd';
// 2.6引入样式
import './login.less'
import logo from './images/logo.png'
import {reqLogin} from '../../api'

const Item = Form.Item   //不能写在import之前 会报错
/*
* 2.1登录的路由组件
* */

class Login extends Component {

    // 2.12提交事件函数
    handleSubmit = (event) => {
        //阻止时间的默认行为  提交表单行为
        event.preventDefault()
        const {form} = this.props
        //获取表单项的输入数据
        const values = form.getFieldsValue()
        //对所有表单项进行验证
        this.props.form.validateFields(async (err, values) => {
            //校验成功
            if (!err) {

                const{username,password}=values
                //3.4使用async await 替换promise  async 写在await所在函数定义的左侧
                // try {
                    const response = await reqLogin(username, password)
                    console.log('请求成功' + response.data.respCode)
                    console.log('请求成功' + response.data.respDesc)
                // }catch (error) {
                //     console.log('请求出错',error)
                // }
                //3.3 ajax请求登录
                  /* reqLogin(username,password).then(response=>{     //为什么是response:github 中axios案例返回 respnose和error
                        console.log('成功了',response.data)
                        console.log('成功了',response)
                    }
                ).catch(error=>{
                    console.log('失败了',error)
                })*/

                // console.log('提交登录的请求: ', values);
            }else{
                console.log('登录校验表单失败')
            }
        });

    }

    // 2.11.2表单验证 自定义验证密码
    validatePwd=(rule, value, callback)=>{
       if(!value){
           callback('密码必须输入')//验证失败提示文本
       }else if(value.length<4){
           callback('密码长度不能小于4')
       }else if(value.length>30){
           callback('密码长度不能大于20')
       }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
           callback('密码必须是英文、数字或下划线组成')
       }else{
           callback()//验证通过
       }
    }

    render() {
        const {form} = this.props
        const {getFieldDecorator} = form
        return (
            <div className="login">
                <header className="login-header">
                    {/*2.8  react不支持这种语法 需要引入
                      <img src="./images/logo.png" alt=""/>
                    */}
                    <img src={logo} alt="logo"/>
                    <h1>短信平台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    {/*2.9 Form 表单 粘贴antd代码*/}
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {/*2.11.1表单验证 声明式验证用户名
                                用户名/密码的的合法性要求
                            1). 必须输入
                            2). 必须大于等于4 位
                            3). 必须小于等于30 位
                            4). 必须是英文、数字或下划线组成
                            getFieldDecorator为高阶函数
                            同时下方为js代码  需要大括号
                            获取输入框的值需要使用第一个参数 即username 标示名称
                            */}
                            {getFieldDecorator('username', {  //属性名是特定的一些名称
                                //声明式验证:直接使用定义好的验证规则进行验证
                                rules: [{required: true, message: '入用户名必须输入'},
                                    {min: 4, message: '用户名至少4位'},
                                    {max: 20, message: '用户名最多20位'},
                                    {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'},
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="用户名"
                                />,
                            )}
                        </Item>
                        <Item>

                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        validator:this.validatePwd
                                    }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}

                        </Item>
                        <Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住帐号</Checkbox>)}
                            {/*<a className="login-form-forgot" href="">
                                Forgot password
                            </a>*/}

                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>

                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}

/*2.10 将form作为属性传递给Login组件
            create()返回一个函数，函数执行接收组件 最终返回一个新的组件
  包装Form组件生成一个新的组件：Form（Login）
  新的组件会向Login组件传递一个强大的对象属性：form

    高阶函数：参数是一个函数类型 或 返回值是一个函数    Form.create()()为高阶函数  getFieldDecorator()()
    高阶组件： 本质是一个函数，接收一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定属性
                包装组件Form（Login）为被包装组件Login的父组件
            作用：扩展属性功能   create()为高阶组件  getFieldDecorator（）不是高阶组件 因为它传的是一个标签
            */
const WrapLogin = Form.create()(Login)
export default WrapLogin
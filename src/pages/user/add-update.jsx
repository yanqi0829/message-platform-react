import React, {Component} from 'react'
import {
    Card,
    Form, Icon,
    Input,
    Button, message, Row, Col, Select,
} from "antd";
import LinkButton from "../../components/link-button";
import {addGateway, reqAddOrUpdateTemplate, reqAddOrUpdateUser} from "../../api";
import memoryUtils from '../../utils/memoryUtils'

const Item = Form.Item
const TextArea = Input.TextArea
const Option=Select.Option

/*
添加更新子路由组件
 */
class TemplateAddUpdate extends Component {
    submit = () => {
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // 1. 收集数据, 并封装成对象
                const {department, groupName,systemCode,systemName,name,username,password,email,role,serialNumber} = values
                let user
                if (this.isUpdate) {
                    user = {department, groupName,systemCode,systemName,name,username,password,email,role,serialNumber,updateBy:memoryUtils.user.name}
                } else {
                    user = {department, groupName,systemCode,systemName,name,username,password,email,role,serialNumber,createBy:memoryUtils.user.name}
                }
                // console.log("待提交模版信息",template)
                // 如果是更新, 需要添加_id
                if (this.isUpdate) {
                    user.flag = true
                }
                // 2. 调用接口请求函数去添加/更新
                const result = await reqAddOrUpdateUser(user)
                // console.log("调用模版更新添加接口",result)
                // 3. 根据结果提示
                if (result.respCode === 0) {
                    message.success(`${this.isUpdate ? '更新' : '添加'}用户成功!`)
                    this.props.history.goBack()
                } else {
                    message.error(`${this.isUpdate ? '更新' : '添加'}用户失败!`)
                }
            }
        })
    }


    componentWillMount() {
        // 取出携带的数据
        const user = this.props.location.state //如果是添加  没值
        this.isUpdate = !!user  //是否是更新标识
        this.user = user || {}
    }

    render() {
        const {isUpdate, user} = this
        console.log("修改用户信息render",user)
        const {getFieldDecorator} = this.props.form
        const title = (
            <span className='left'>
                <LinkButton onClick={() => this.props.history.goBack()}>
                <Icon type='arrow-left' style={{marginRight: 15, fontSize: 20}}></Icon>
                </LinkButton>
                <span>{isUpdate ? '修改用户信息' : '新增用户'}</span>
            </span>
        )

        /*const formItemLayout = {
            labelCol: {
                span: 2
            },
            wrapperCol: {
                span: 8
            },
        };*/
        return (
            <Card title={title}>
                <Form>
                    <Row>
                        <Col span={12}>
                            <Item label="单位名称">
                                {getFieldDecorator('department', {
                                    initialValue: user.department,
                                    rules: [{required: true, message: '必须填写单位名称'},
                                    ],
                                })(
                                    <Input placeholder="请输入单位名称" style={{width: 300}}/>,
                                )}
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="项目组">
                                {getFieldDecorator('groupName', {
                                    initialValue: user.groupName,
                                    rules: [{required: true, message: '必须填写项目组'},
                                    ],
                                })(
                                    <Input placeholder="请输入单位名称" style={{width: 150}}/>,
                                )}
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Item label="系统编码">
                                {getFieldDecorator('systemCode', {
                                    initialValue: user.systemCode,
                                    rules: [{required: true, message: '必须填写系统编码'},
                                    ],
                                })(
                                    <Input placeholder="请输入统编码" style={{width: 150}}/>,
                                )}
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="用户名">
                                {getFieldDecorator('username', {
                                    initialValue: user.username,
                                    rules: [{required: true, message: '必须填写用户名'},
                                    ],
                                })(
                                    <Input placeholder="请输入用户名" disabled={isUpdate} style={{width: 150}}/>,
                                )}
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Item label="姓名">
                                {getFieldDecorator('name', {
                                    initialValue: user.name,
                                    rules: [{required: true, message: '必须填写姓名'},
                                    ],
                                })(
                                    <Input placeholder="请输入姓名"  style={{width: 150}}/>,
                                )}
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="密码">
                                {getFieldDecorator('password', {
                                    initialValue: user.password,
                                    rules: [{required: true, message: '必须填写密码'},
                                    ],
                                })(
                                    <Input placeholder="请输入密码" type="password" style={{width: 150}}/>,
                                )}
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Item label="邮箱">
                                {getFieldDecorator('email', {
                                    initialValue: user.email,
                                    rules: [{required: true, message: '必须填写邮箱'},
                                    ],
                                })(
                                    <Input placeholder="请输入邮箱" style={{width: 250}}/>,
                                )}
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="角色">
                                {getFieldDecorator('role', {
                                    initialValue: user.role,
                                    rules: [{required: true, message: '必须填写角色'},
                                    ],
                                })(
                                    <Select  placeholder="请选择角色" style={{width:150}}>
                                        <Option value="user">用户</Option>
                                        <Option value="admin">管理员</Option>
                                        <Option value="manager">总院管理层</Option>
                                    </Select>

                                )}
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                    <Item label="手机号">
                        {getFieldDecorator('serialNumber', {
                            initialValue: user.serialNumber,
                            rules: [{required: true, message: '必须填写手机号'},
                            ],
                        })(
                            <Input placeholder="请输入手机号" style={{width: 150}}/>,
                        )}
                    </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="系统名称">
                                {getFieldDecorator('systemName', {
                                    initialValue: user.systemName,
                                    rules: [{required: true, message: '必须填写系统名称'},
                                    ],
                                })(
                                    <Input placeholder="请输入系统名称" style={{width: 100}}/>,
                                )}
                            </Item>
                        </Col>
                        </Row>

                    <Item>
                        <Button type="primary" style={{marginLeft: "30%"}} onClick={this.submit}>提交</Button>
                    </Item>
                </Form>

            </Card>
        )
    }
}

export default Form.create()(TemplateAddUpdate)
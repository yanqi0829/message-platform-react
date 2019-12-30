import React, {Component} from 'react'
import {
    Card,
    Form, Icon,
    Input,
    Button, message
} from "antd";
import LinkButton from "../../components/link-button";
import {addGateway, reqAddOrUpdateTemplate} from "../../api";
import memoryUtils from '../../utils/memoryUtils'

const Item = Form.Item
const TextArea = Input.TextArea

/*
添加更新子路由组件
 */
class TemplateAddUpdate extends Component {
    submit = () => {
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // 1. 收集数据, 并封装成product对象
                const {gatewayCode, templateComment, couldSend} = values
                const {systemCode,name,role} = memoryUtils.user
                console.log()
                let template
                if (this.isUpdate) {
                    const {templateId} = this.props.location.state
                    template = {gatewayCode, templateComment, couldSend, templateId,systemCode,applyBy:name,role}
                } else {
                    template = {gatewayCode, templateComment, couldSend,systemCode,applyBy:name}
                }
                // console.log("待提交模版信息",template)
                // 如果是更新, 需要添加_id
                if (this.isUpdate) {
                    template.flag = true
                }
                // 2. 调用接口请求函数去添加/更新
                const result = await reqAddOrUpdateTemplate(template)
                // console.log("调用模版更新添加接口",result)
                // 3. 根据结果提示
                if (result.respCode === 0) {
                    message.success(`${this.isUpdate ? '更新' : '新增'}模版申请成功!`)
                    this.props.history.goBack()
                } else {
                    message.error(`${this.isUpdate ? '更新' : '新增'}模版失败!`)
                }
            }
        })
    }

    validatorCount = (rule, value, callback) => {

        if (value * 1 > 0) {
            callback()
        } else {
            callback("条数必须大于0")
        }
    }

    componentWillMount() {
        // 取出携带的数据
        const template = this.props.location.state //如果是添加  没值
        this.isUpdate = !!template  //是否是更新标识
        this.template = template || {}
    }

    render() {
        const {isUpdate, template} = this
        const {getFieldDecorator} = this.props.form
        const title = (
            <span className='left'>
                <LinkButton onClick={() => this.props.history.goBack()}>
                <Icon type='arrow-left' style={{marginRight: 15, fontSize: 20}}></Icon>
                </LinkButton>
                <span>{isUpdate ? '修改模版' : '申请模版'}&nbsp;&nbsp;&nbsp;{template.templateId}</span>
            </span>
        )

        const formItemLayout = {
            labelCol: {
                span: 2
            },
            wrapperCol: {
                span: 8
            },
        };


        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="网关编码">
                        {getFieldDecorator('gatewayCode', {
                            initialValue: template.gatewayCode,
                            rules: [{required: true, message: '必须选择网关'},
                            ],
                        })(
                            <Input placeholder="请输入网关编码" disabled={isUpdate} style={{width: 150}}/>,
                        )}
                    </Item>
                    <Item label="模版内容">
                        {getFieldDecorator('templateComment', {
                            initialValue: template.templateComment,
                            rules: [{required: true, message: '必须填写模版内容'},
                            ],
                        })(
                            <TextArea autoSize={{minRows: 3, maxRows: 3}}/>
                        )}
                    </Item>
                    <Item label="发送数量(条)">
                        {getFieldDecorator('couldSend', {
                            initialValue: template.couldSend,
                            rules: [{required: true, message: '必须填写发送条数'},
                                {validator: this.validatorCount}
                            ],
                        })(
                            <Input addonAfter="条" style={{width: 150}}/>
                        )}
                    </Item>
                    <Item>
                        <Button type="primary" style={{marginLeft: "60%"}} onClick={this.submit}>提交</Button>
                    </Item>
                </Form>

            </Card>
        )
    }
}

export default Form.create()(TemplateAddUpdate)
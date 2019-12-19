import React, {Component} from 'react'
import {
    Card,
    Form, Icon,
    Input,
    Button
} from "antd";
import LinkButton from "../../components/link-button";

const Item = Form.Item
const TextArea = Input.TextArea

/*
添加更新子路由组件
 */
class TemplateAddUpdate extends Component {
    submit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("验证", values)
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
        this.template=template||{}
    }

    render() {
        const {isUpdate,template} = this
        const {getFieldDecorator} = this.props.form
        const title = (
            <span className='left'>
                <LinkButton onClick={() => this.props.history.goBack()}>
                <Icon type='arrow-left' style={{marginRight: 15, fontSize: 20}}></Icon>
                </LinkButton>
                <span>{isUpdate?'修改模版':'申请模版'}&nbsp;&nbsp;&nbsp;{template.templateId}</span>
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
                            initialValue:template.gatewayCode,
                            rules: [{required: true, message: '必须选择网关'},
                            ],
                        })(
                            <Input placeholder="请输入网关编码" disabled={isUpdate} style={{width: 150}}/>,
                        )}
                    </Item>
                    <Item label="模版内容">
                        {getFieldDecorator('templateComment', {
                            initialValue:template.templateComment,
                            rules: [{required: true, message: '必须填写模版内容'},
                            ],
                        })(
                            <TextArea autoSize={{minRows: 3, maxRows: 3}}/>
                        )}
                    </Item>
                    <Item label="发送数量(条)">
                        {getFieldDecorator('couldSend', {
                            initialValue:template.couldSend,
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
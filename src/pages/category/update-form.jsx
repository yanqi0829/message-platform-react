import React, {Component} from 'react'
import {
    Form,
    Select,
    Input
} from "antd";
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option
const { TextArea } = Input;
/*
* 5.7
* 网关管理的添加组件
* */
class UpdateForm extends Component {
    //5.8.2声明接收属性并显示内容
    static  propTypes = {
        gatewayInfo: PropTypes.object.isRequired,
        setForm:PropTypes.func.isRequired
    }
    //5.8.6
    componentWillMount() {
        //将form对象通过setForm传递父组件
        this.props.setForm(this.props.form)
    }

    render() {
        const {gatewayInfo} = this.props
        const {getFieldDecorator} = this.props.form
        return (
            <div>
                <Form>
                    <Item>
                        <span >网关编码</span>
                        {
                            getFieldDecorator('gatewayCode', {
                                initialValue: gatewayInfo.gatewayCode,
                                rules: [{required: true, message: '网关编码必须输入'}],
                            })(
                                <Input disabled={true}/>
                            )
                        }
                    </Item>
                    <Item>
                        <span >网关名称</span>
                        {
                            getFieldDecorator('gatewayName', {
                                initialValue: gatewayInfo.gatewayName,
                                rules: [{required: true, message: '网关名称必须输入'}],
                            })(
                                <Input/>
                            )
                        }
                    </Item>
                    <Item>
                        <span >网关描述</span>
                        {
                            getFieldDecorator('detail', {
                                initialValue: gatewayInfo.detail,
                                rules: [{required: true, message: '必须包含描述信息'}],
                            })(
                                <TextArea autoSize/>
                            )
                        }
                    </Item>

                </Form>

            </div>
        )
    }

}

/*5.7.2 验证表单需要使用高阶组件*/

export default Form.create()(UpdateForm)


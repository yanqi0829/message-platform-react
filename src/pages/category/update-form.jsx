import React, {Component} from 'react'
import {
    Form,
    Select,
    Input
} from "antd";
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option

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
                                initialValue: gatewayInfo.gatewayCode
                            })(
                                <Input/>
                            )
                        }
                    </Item>
                    <Item>
                        {
                            getFieldDecorator('detail', {
                                initialValue: gatewayInfo.detail
                            })(
                                <Input/>
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


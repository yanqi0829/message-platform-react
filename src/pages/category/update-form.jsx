import React, {Component} from 'react'
import {
    Form,
    Select,
    Input
} from "antd";

const Item = Form.Item
const Option = Select.Option
/*
* 5.7
* 网关管理的添加组件
* */
class UpdateForm extends Component {
    render() {

        const {getFieldDecorator} = this.props.form
        return (
            <div>
                <Form>
                    <Item>
                        {
                            getFieldDecorator('gatewayCode',{
                                initialValue:'0'
                            })(
                                <Input placeholder='请输入网关编码'/>
                            )
                        }
                    </Item>
                </Form>

            </div>
        )
    }

}
/*5.7.2 验证表单需要使用高阶组件*/

export default  Form.create()(UpdateForm)


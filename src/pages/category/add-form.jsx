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
class AddForm extends Component {
    render() {

        const {getFieldDecorator} = this.props.form
        return (
            <div>
                <Form>
                    {/*5.7.1 需要把组件用Item包裹，增加间隔*/}
                   {/* <Item>
                        {
                            getFieldDecorator('parentId',{
                                initialValue:oneId
                            })(
                                <Select>
                                    { options.map((item)=> <Option value={item.id}>item.name</Option>)}
                                </Select>
                            )
                        }
                    </Item>*/}
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

export default  Form.create()(AddForm)


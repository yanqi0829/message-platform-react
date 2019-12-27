import React, {Component} from 'react'
import {
    Form,
    Select,
    Input
} from "antd";
import PropTypes from "prop-types";

const Item = Form.Item
const Option = Select.Option
const {TextArea} = Input;

/*
* 5.7
* 网关管理的添加组件
* */
class AddForm extends Component {
    static  propTypes = {
        // gatewayInfo: PropTypes.object.isRequired,
        setForm:PropTypes.func.isRequired
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

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
                            getFieldDecorator('gatewayCode', {
                                initialValue: '',
                                rules: [{required: true, message: '网关编码必须输入'}],
                            })(
                                <Input placeholder='请输入网关编码'/>
                            )
                        }
                    </Item>
                    <Item>
                        {
                            getFieldDecorator('gatewayName', {
                                initialValue: '',
                                rules: [{required: true, message: '网关名称必须输入'}],
                            })(
                                <Input placeholder='请输入网关名称'/>
                            )
                        }
                    </Item>
                    <Item>
                        {
                            getFieldDecorator('detail', {
                                initialValue: '',
                                rules: [{required: true, message: '必须包含描述信息'}],
                            })(
                                <TextArea placeholder='请输入网关描述' autoSize/>
                            )
                        }
                    </Item>
                </Form>

            </div>
        )
    }
}

/*5.7.2 验证表单需要使用高阶组件*/
export default Form.create()(AddForm)


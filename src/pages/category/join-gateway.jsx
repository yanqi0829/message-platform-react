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


class JoinGateway extends Component {
    static  propTypes = {
        gatewayInfo: PropTypes.object.isRequired,
        setForm:PropTypes.func.isRequired
    }

    validatorCount = (rule, value, callback) => {

        if(!/^[1-9][0-9_]+$/.test(value)){
            callback("填写大于1的数字且不能以0开头")
        }else{
            callback()
        }
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const {getFieldDecorator} = this.props.form
        const {gatewayInfo} = this.props
        // console.log("申请接入打印",gatewayInfo)
        return (
            <div>
                <Form>
                    <Item>
                        {
                            getFieldDecorator('description', {
                                initialValue: '',
                                rules: [{required: true, message: '请填写申请说明，不多于200字'},
                                    {max: 200, message: '最多200字'},
                                ],
                            })(
                                <TextArea placeholder='请填写申请说明，不多于200字' autoSize={{minRows: 3, maxRows: 3}}/>
                            )
                        }
                    </Item>

                    <Item>
                        {
                            getFieldDecorator('couldSend', {
                                initialValue: '',
                                rules: [{required: true, message: '填写申请条数'},
                                    {validator: this.validatorCount}
                                ],
                            })(
                                <Input addonAfter="条"  placeholder="申请条数" style={{width: 150}}/>
                            )
                        }
                    </Item>
                </Form>

            </div>
        )
    }
}

export default Form.create()(JoinGateway)


import React, {Component} from 'react'
import {
    Form,
    Select,
    List,
    Input, Row, Col, Card,
} from "antd";
import PropTypes from "prop-types";
import  './audit.less'

const Item = Form.Item
const Option = Select.Option
const {TextArea} = Input;


export default class AuditForm extends Component {
    static  propTypes = {
        auditInfo: PropTypes.object.isRequired,
    }
    render() {


        const auditInfo= this.props.auditInfo
        const {systemName,gatewayCode,description,couldSend}=auditInfo
        return (
            <List>
                <Row>
                    <Col span={12}>
                        <Item>
                            <span className='left'>系统名称：</span>
                            <span>{systemName}</span>
                        </Item>
                    </Col>
                    <Col span={12}>
                        <Item>
                            <span className='left'>网关编码：</span>
                            <span>{gatewayCode}</span>
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Item>
                            <span className='left'>申请说明：</span>
                            <span>{description}</span>
                        </Item>
                    </Col>

                </Row>
                <Row>
                    <Col span={12}>
                        <Item>
                            <span className='left'>申请条数：</span>
                            <span>{couldSend}</span>
                        </Item>
                    </Col>
                </Row>
            </List>
        )
    }
}


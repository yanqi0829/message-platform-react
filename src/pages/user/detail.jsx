import React, {Component} from 'react'
import {
    Card,
    Icon,
    List,
    Input, Row, Col,
} from 'antd'
import LinkButton from '../../components/link-button'

const Item = List.Item
const TextArea = Input.TextArea
/*
详情页子路由组件
 */
export default class TemplateDetail extends Component {
    render() {
        console.log("接收到的数据为", this.props.location.state)
        const {department, groupName, systemCode, systemName,name, username, email, role, createBy,serialNumber} = this.props.location.state

        const title = (
            <span className='left'>
                <LinkButton onClick={() => this.props.history.goBack()}>
                <Icon type='arrow-left' style={{marginRight: 15, fontSize: 20}}></Icon>
                <span>用户详情</span>
                </LinkButton>
            </span>
        )
        return (
            <Card title={title} className='user-detail'>
                <List>
                    <Row>
                        <Col span={12}>
                            <Item>
                                <span className='left'>单位名称：</span>
                                <span>{department}</span>
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item>
                                <span className='left'>&nbsp;&nbsp;&nbsp;项目组：</span>
                                <span>{groupName}</span>
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Item>
                                <span className='left'>系统编码：</span>
                                <span>{systemCode}</span>
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item>
                                <span className='left'>&nbsp;&nbsp;&nbsp;姓名：</span>
                                <span>{name}</span>
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Item>
                                <span className='left'>用户名：</span>
                                <span>{username}</span>
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item>
                                <span className='left'>&nbsp;&nbsp;&nbsp;邮箱：</span>
                                <span>{email}</span>
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Item>
                                <span className='left'>&nbsp;&nbsp;&nbsp;角色：</span>
                                <span>{role}</span>
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item>
                                <span className='left'>&nbsp;&nbsp;创建者：</span>
                                <span>{createBy}</span>
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Item>
                                <span className='left'>&nbsp;&nbsp;&nbsp;手机号：</span>
                                <span>{serialNumber}</span>
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item>
                                <span className='left'>系统名称：</span>
                                <span>{systemName}</span>
                            </Item>
                        </Col>
                    </Row>

                </List>
            </Card>
        )
    }
}
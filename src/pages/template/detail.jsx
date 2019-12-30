import React, {Component} from 'react'
import {
    Card,
    Icon,
    Button,
    List,
    Input, message
} from 'antd'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils'
import {auditTemplate} from '../../api/'

const Item = List.Item
const TextArea = Input.TextArea
/*
详情页子路由组件
 */
export default class TemplateDetail extends Component {
    submitOk=async ()=>{
        const {gatewayCode, templateId, joinFlag} = this.props.location.state
        const  auditInfo={gatewayCode, templateId, joinFlag,name:memoryUtils.user.name,type:0}
        const result = await auditTemplate(auditInfo)
        // this.setState({loading: false})
        if (result.respCode === 0) {
            message.success("操作成功")
            this.props.history.goBack()
        }else{
            message.success("操作失败")
        }
    }

    submitCancle=async ()=>{
        const {gatewayCode, templateId, joinFlag} = this.props.location.state
        const  auditInfo={gatewayCode, templateId, joinFlag,name:memoryUtils.user.name,type:1}
        const result = await auditTemplate(auditInfo)
        // this.setState({loading: false})
        if (result.respCode === 0) {
            message.success("操作成功")
            this.props.history.goBack()
        }else{
            message.success("操作失败")
        }
    }




    render() {
        //读取携带过来的属性
        const {gatewayCode, templateId, templateComment, couldSend, sendedSum, joinFlag} = this.props.location.state
        const user = memoryUtils.user
        const title = (
            <span className='left'>
                <LinkButton onClick={() => this.props.history.goBack()}>
                <Icon type='arrow-left' style={{marginRight: 15, fontSize: 20}}></Icon>
                <span>模版详情</span>
                </LinkButton>
            </span>
        )
        return (
            <Card title={title} className='template-detail'>
                <List>
                    <Item>
                        <span className='left'>所属网关：</span>
                        <span>{gatewayCode}</span>
                    </Item>
                    <Item>
                        <span className='left'>&nbsp;&nbsp;&nbsp;模版ID：</span>
                        <span>{templateId}</span>
                    </Item>
                    <Item>
                        <span className='left'>模版内容：</span>
                        <TextArea style={{color: "#ffa651"}} autoSize={{minRows: 5, maxRows: 5}} className='text-area'
                                  value={templateComment} disabled/>
                    </Item>
                    <Item>
                        <span className='left'>发送总量：</span>
                        <span>{couldSend}</span>
                    </Item>
                    <Item>
                        <span className='left'>已发送量：</span>
                        <span>{sendedSum}</span>
                    </Item>

                    {
                        "admin" == user.role && (joinFlag === "0" || joinFlag === "1") ?
                            <Item> <Button type="primary" style={{marginLeft: "30%"}} onClick={this.submitOk}>通过</Button>
                                <Button style={{marginLeft: "60px"}} onClick={this.submitCancle}>拒绝</Button> </Item> : ""
                    }


                </List>
            </Card>
        )
    }
}
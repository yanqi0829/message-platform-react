import React, {Component} from 'react'
import{
    Card,
    Icon,
    List,
    Input
} from 'antd'
import LinkButton from '../../components/link-button'
const Item=List.Item
const TextArea = Input.TextArea
/*
详情页子路由组件
 */
export default class TemplateDetail extends Component {
    render() {
            //读取携带过来的属性
           const {gatewayCode,templateId,templateComment,couldSend,sendedSum} =this.props.location.state

        const title=(
            <span className='left'>
                <LinkButton onClick={()=>this.props.history.goBack()}>
                <Icon type='arrow-left' style={{marginRight:15,fontSize:20}}></Icon>
                <span>模版详情</span>
                </LinkButton>
            </span>
        )
        return(
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
                        <TextArea  style={{color:"#ffa651"}} autoSize={{ minRows: 7, maxRows: 7 }} className='text-area' value={templateComment} disabled/>
                    </Item>
                    <Item>
                        <span className='left'>发送总量：</span>
                        <span >{couldSend}</span>
                    </Item>
                    <Item>
                        <span className='left'>已发送量：</span>
                        <span >{sendedSum}</span>
                    </Item>
                </List>
            </Card>
        )
    }
}
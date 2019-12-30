import React, {Component} from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table
} from 'antd'
import LinkButton from "../../components/link-button";
import {reqTemplates, reqAllTemplates} from '../../api/'
import {PAGE_SIZE} from '../../utils/constants'
import {formateDate} from "../../utils/dateUtils";
import memoryUtils from '../../utils/memoryUtils'

const Option = Select.Option
/*
默认子路由组件
 */
export default class TemplateHome extends Component {
    state = {
        templates: [],  //模版列表
        total: 0,//模版总数量
        loading: false,
    }
    initColumns = () => {
        this.columns = [
            {
                title: '网关编码',
                dataIndex: 'gatewayCode',
                key: 'gatewayCode',
            },
            {
                title: '模版ID',
                dataIndex: 'templateId',
                key: 'templateId',
            },

            {
                title: '模版内容',
                dataIndex: 'templateComment',
                key: 'templateComment',
                onCell: () => {
                    return {
                        style: {
                            maxWidth: 150,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                        }
                    }
                }
            },
            {
                title: '申请时间',
                dataIndex: 'applyTime',
                key: 'applyTime',
                render: (applyTime) => formateDate(applyTime)
            },
            {
                title: '审核时间',
                dataIndex: 'auditTime',
                key: 'auditTime',
                render: (auditTime) => formateDate(auditTime)
            },
            {
                width: 100,
                title: '状态',
                dataIndex: 'joinFlag',
                key: 'joinFlag',
                render: (joinFlag) => {
                    switch (joinFlag) {
                        case "0":
                            return "未审核";
                            break;
                        case "1":
                            return "修改待审核";
                            break;
                        case "2":
                            return "已审核";
                            break;
                        case "3":
                            return "审核未通过";
                            break;
                        default:
                            return "";
                    }
                }
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                width: 150,
                render: (template) => (   /*5.5 事件函数传参数*/
                    <span>
                        {/*本组件是路由组件 可以用history*/}
                        <LinkButton onClick={() => this.props.history.push('/template/detail',template)}>详情</LinkButton>
                        {template.joinFlag==="2" ?  <LinkButton onClick={() => this.props.history.push('/template/addupdate',template)}>修改</LinkButton>:""}
            </span>
                ),
            },
        ];
    }

    /*为第一次render准备数据*/
    componentWillMount() {
        this.initColumns()
    }

    /*获取指定页码的列表数据显示*/
    getTemplates = async (pageNum) => {
        this.pageNum=pageNum
        this.setState({loading: true})
        const {role,systemCode}=memoryUtils.user
        const pageInfo={pageNum,pageSize:PAGE_SIZE,role,systemCode}
        const result = await reqTemplates(pageInfo)
        this.setState({loading: false})
        if (result.respCode === 0) {
            const list = result.data
            const total = result.total
            this.setState({
                templates: list,
                total,
            })
        }

    }

    componentDidMount() {
        this.getTemplates(1)   //默认获取第一页数据
    }

    render() {
        const {templates, loading, total} = this.state
        const title = (
            <span>
                {/*模版列表*/}
                <Select value='1' style={{width: 150}}>
                    <Option value='1'>按网关搜索</Option>
                    <Option value='2'>按模版ID搜索</Option>
                </Select>
                    <Input placeholder='关键字' style={{width: 150, margin: '0 15px'}}/>
                    <Button type='primary'>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={()=>this.props.history.push("/template/addupdate")}>
                <Icon type='plus'></Icon>
                模版申请
            </Button>
        )
        return (
            <Card  extra={extra}>
           {/* <Card title={title} extra={extra}>*/}
                <Table dataSource={templates}
                       columns={this.columns}
                       bordered
                       loading={loading}
                    // rowKey='templateId'
                       pagination={{
                           total,
                           defaultPageSize: PAGE_SIZE,
                           showQuickJumper: true,
                            onChange: (pageNum) => {
                                this.getTemplates(pageNum)
                            }     /*点击页数监听*/
                       }}
                />
            </Card>
        )
    }
}
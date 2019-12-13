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
import {reqTemplates} from '../../api/'
import {PAGE_SIZE} from '../../utils/constants'

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
                title: '网关名称',
                dataIndex: 'gatewayName',
                key: 'gatewayName',
            },
            {
                title: '模版ID',
                dataIndex: 'templateId',
                key: 'templateId',
            },

            {
                title: '模版内容',
                dataIndex: 'templateContent',
                key: 'templateContent',
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
                dataIndex: 'requestTime',
                key: 'requestTime',
            },
            {
                title: '审核时间',
                dataIndex: 'verifyTime',
                key: 'verifyTime',
            },
            {
                width: 100,
                title: '状态',
                dataIndex: 'status',
                key: 'status',

            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                width: 150,
                render: (template) => (   /*5.5 事件函数传参数*/
                    <span>
         {/*  <LinkButton onClick={this.queryDetail(gateway)}>查看</LinkButton>  可以发现刷新直接执行6次*/}
                        {/*如何向事件回调函数传参：先定义匿名函数，再调用函数*/}
                        <LinkButton onClick={() => this.queryDetail(template)}>详情</LinkButton>
                        {/*{1===2 ? <LinkButton>修改</LinkButton>:null}*/}
                        <LinkButton onClick={() => this.showUpdate(template)}>修改</LinkButton>
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
        this.setState({loading: true})
        const result = await reqTemplates(pageNum, PAGE_SIZE)
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
        this.getTemplates(1)
    }

    render() {
        const {templates, loading, total} = this.state
        const title = (
            <span>
                模版列表
              {/*  <Select value='1' style={{width: 150}}>     查询分页略 --62
                    <Option value='1'>按网关搜索</Option>
                    <Option value='2'>按模版ID搜索</Option>
                </Select>
                    <Input placeholder='关键字' style={{width: 150, margin: '0 15px'}}/>
                    <Button type='primary'>搜索</Button>*/}
            </span>
        )
        const extra = (
            <Button type='primary'>
                <Icon type='plus'></Icon>
                模版申请
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table dataSource={templates}
                       columns={this.columns}
                       bordered
                    // loading={true}
                       loading={loading}
                       rowKey='templateId'
                       pagination={{
                           total,
                           defaultPageSize: PAGE_SIZE,
                           showQuickJumper: true,
                           onChange: (pageNum) => {
                               this.getTemplates(pageNum)
                           }  /*点击页数监听*/
                       }}
                />
            </Card>
        )
    }
}
import React, {Component} from 'react'
import {
    Card,
    Table,
    Button,
    Icon,
    message,
    Modal
} from 'antd'
import './index.less'
import LinkButton from '../../components/link-button'
import {reqGatewayInfo} from '../../api/'

const dataSource = [
    {
        gatewayCode: '342',
        detail: '全网网关',
        joinTime: '2019',
    },
    {
        gatewayCode: '10017',
        detail: '本网网关',
        joinTime: '2019',
    },
];


/*
5.1网关分类路由  Card 嵌套Table
 */
export default class Category extends Component {
    //5.2 列表信息放在组件的状态里面，只要状态更新组件就会重新渲染
    state = {
        gateways: [],  //网关列表
        loading: false   //5.4.1 是否正在获取数据中

    }
    //5.3初始化table所有列的数组
    initColumns = () => {
        this.columns = [
            {
                title: '网关编码',
                dataIndex: 'gatewayCode',
                key: 'gatewayCode',
            },
            {
                title: '网关描述',
                dataIndex: 'detail',
                key: 'detail',
            },
            {
                title: '对接时间',
                dataIndex: 'joinTime',
                key: 'joinTime',
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                width: 200,
                render: (gateway) => (   /*5.5 事件函数传参数*/
                    <span>
         {/*  <LinkButton onClick={this.queryDetail(gateway)}>查看</LinkButton>  可以发现刷新直接执行6次*/}
                        {/*如何向事件回调函数传参：先定义匿名函数，再调用函数*/}
                        <LinkButton onClick={() => this.queryDetail(gateway)}>查看</LinkButton>
                        {/*{1===2 ? <LinkButton>修改</LinkButton>:null}*/}
                        <LinkButton>修改</LinkButton>
            </span>
                ),
            },
        ];
    }

    queryDetail = (gateway) => {
        message.success('ok')
    }

    /*异步获取网关信息*/
    getGateways = async () => {
        //5.4.2 在发送请求前 显示loading
        this.setState({loading: true})
        const result = await reqGatewayInfo()
        this.setState({loading: false})
        if (result.respCode === 0) {
            this.setState({    ////题外话：setState可跟随一个回调函数： 在状态更新且render后执行
                gateways: result.data,    ////setState不能立即获取最新的状态，因为setState是异步更新的
            })
        } else {
            message.error('获取网关列表失败')
        }

    }

    /*为第一次render准备数据*/
    componentWillMount() {
        this.initColumns()
    }

    //发送异步ajax请求
    componentDidMount() {
        this.getGateways()
    }

    render() {
        const {gateways, loading} = this.state
        const title = '网关列表'
        const extra = (
            <Button type='primary'>
                <Icon type='plus'/>
                添加
            </Button>

        )
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table dataSource={gateways}
                           columns={this.columns}
                           bordered
                        // loading={true}
                           loading={loading}
                           rowKey='key'
                           pagination={{defaultPageSize: 6, showQuickJumper: true}}
                    />
                </Card>
            </div>
        )
    }
}
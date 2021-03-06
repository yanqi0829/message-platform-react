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
import {reqGatewayInfo, updateGatewayInfo, addGateway,joinGateway} from '../../api/'
import AddForm from './add-form'
import UpdateForm from './update-form'
import  JoinGateway from './join-gateway'
import memoryUtils from '../../utils/memoryUtils'
import {formateDate} from '../../utils/dateUtils'

/*
5.1网关分类路由  Card 嵌套Table
 */
export default class Category extends Component {
    //5.2 列表信息放在组件的状态里面，只要状态更新组件就会重新渲染
    state = {
        gateways: [],  //网关列表
        loading: false,   //5.4.1 是否正在获取数据中
        showStatus: 0,   //表示添加、修改的确认框是否显示  0都不显示， 1显示添加 2显示修改  3查看信息 4 申请接入页

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
                title: '网关名称',
                dataIndex: 'gatewayName',
                key: 'gatewayName',
            },
            {
                title: '网关描述',
                dataIndex: 'detail',
                key: 'detail',
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
                title: '接口规范编码',
                dataIndex: 'gatewayType',
                key: 'gatewayType',
            },
            {
                title: '网关接入时间',
                dataIndex: 'createTime',
                key: 'createTime',
                render: (createTime) => formateDate(createTime)
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                width: 150,
                render: (gateway) => (   /*5.5 事件函数传参数 gateway 为当前行的参数*/
                    <span>
         {/*  <LinkButton onClick={this.queryDetail(gateway)}>查看</LinkButton>  可以发现刷新每渲染一行执行一次*/}
                        {/*如何向事件回调函数传参：先定义匿名函数，再调用函数*/}

                        <LinkButton onClick={() => this.queryDetail(gateway)}>查看</LinkButton>
                        {/*{1===2 ? <LinkButton>修改</LinkButton>:null}*/}
                        {memoryUtils.user.role != "user" ?
                            <LinkButton onClick={() => this.showUpdate(gateway)}>修改</LinkButton> :
                            gateway.joinFlag=="1"? <LinkButton disabled>审核中</LinkButton>:
                                gateway.joinFlag=="2"? <LinkButton disabled>审核通过</LinkButton>:
                            <LinkButton onClick={() => this.join(gateway)}>{
                            }申请接入</LinkButton>}
                        {/*<LinkButton onClick={()=>this.showUpdate(gateway)}>修改</LinkButton>*/}
            </span>
                ),
            },
        ];
    }
    /*  网关接入申请*/
    join = (gateway) => {
        const user = memoryUtils.user
        this.gateway =gateway
        this.setState({
            showStatus: 4
        })

    }


    /*显示查看确认框*/
    queryDetail = (gateway) => {
        this.gateway = gateway
        this.setState({
            showStatus: 3
        })

    }

    /*异步获取网关信息*/
    getGateways = async () => {
        //5.4.2 在发送请求前 显示loading
        this.setState({loading: true})
        const {role,systemCode}=memoryUtils.user
        const result = await reqGatewayInfo(role,systemCode)
        this.setState({loading: false})
        if (result.respCode === 0) {
            this.setState({    ////题外话：setState可跟随一个回调函数： 在状态更新且render后执行
                gateways: result.data,    ////setState不能立即获取最新的状态，因为setState是异步更新的
            })
        } else {
            message.error('获取网关列表失败')
        }
    }
    /*显示修改的确认框*/
    showUpdate = (gateway) => {
        // console.log('showUpdate',gateway)
        //保存网关对象
        this.gateway = gateway
        //更新状态
        this.setState({
            showStatus: 2
        })
    }

    /*显示添加的确认框*/
    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }
    /*响应点击取消 隐藏确定框*/
    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
        //清除输入数据
        this.form.resetFields()
    }
    /*添加(网关)*/
    addCategory = () => {
        // 表单验证
        this.form.validateFields(async (err, values) => {
            if (!err) {
                const gatewayInfo = this.gateway
                this.setState({
                    showStatus: 0
                })
                const addInfo = this.form.getFieldsValue()
                console.log("添加的网关内容为",addInfo)
                //清除输入数据
                this.form.resetFields()
                const result = await addGateway(addInfo)
                if (result.respCode === 0) {
                    message.success("添加成功！")
                    this.getGateways()
                } else {
                    message.error("添加失败！")
                }
            }
        })
    }


    /*更新分类（网关）*/
    updateCategory = () => {
        //进行表单验证
        this.form.validateFields(async (err, values) => {
            if (!err) {
                const gatewayInfo = this.gateway
                //5.8.3隐藏确定框
                this.setState({
                    showStatus: 0
                })
                //5.8.4 发送请求
                const updateInfo = this.form.getFieldsValue()
                //清除输入数据
                this.form.resetFields()
                const result = await updateGatewayInfo(updateInfo)
                if (result.respCode === 0) {
                    //5.8.5重新显示列表
                    message.success("修改成功！")
                    this.getGateways()
                } else {
                    message.error("修改失败！")
                }
            }
        })
    }

    joinGateway=()=>{
        //进行表单验证
        this.form.validateFields(async (err, values) => {
            if (!err) {
                const gatewayInfo = this.gateway
                this.setState({
                    showStatus: 0
                })
                const joinInfo = this.form.getFieldsValue()
                //清除输入数据
                this.form.resetFields()
                const  {systemCode,systemName,name}= memoryUtils.user
                const {gatewayCode}=gatewayInfo
                const {couldSend,description}=joinInfo
                console.log("此处打印",gatewayInfo,joinInfo)
                const joinGatewayInfo={systemCode,systemName,gatewayCode,applyBy:name,couldSend,description}
                const result = await joinGateway(joinGatewayInfo)
                if (result.respCode === 0) {
                    message.success("申请成功！")
                    this.getGateways()
                } else {
                    message.error("申请失败！")
                }
            }
        })

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
        const {gateways, loading, showStatus} = this.state
        //读取指定的网关this.gateway
        const gateway = this.gateway || {} //如果还没有指定一个空对象  因为上来 column中render会先渲染
        const title = '网关列表'
        const extra = (
            <Button type='primary' disabled={memoryUtils.user.role == "user"} onClick={this.showAdd}>
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
                    {/*5.6  确认框*/}
                    <Modal
                        title="添加网关"
                        visible={showStatus === 1}
                        onOk={this.addCategory}
                        onCancel={this.handleCancel}
                    >
                        <AddForm
                                 setForm={(form) => {
                                     this.form = form
                                 }}/>

                    </Modal>

                    <Modal
                        title={gateway.gatewayName}
                        visible={showStatus === 3}
                        footer={null}
                        // okButtonProps={{ disabled: true }}
                        // cancelButtonProps={{ disabled: true }}
                        onOk={() => {
                            this.setState({
                                showStatus: 0
                            })
                        }}
                        onCancel={() => {
                            this.setState({
                                showStatus: 0
                            })
                        }}

                    >
                        <p>{gateway.detail}</p>
                    </Modal>
                    <Modal
                        title="修改信息"
                        visible={showStatus === 2}
                        onOk={this.updateCategory}
                        onCancel={this.handleCancel}
                    >
                        {/*5.8.1 修改网关信息  gatewayInfo是父组件传给子组件的  那么子组件如何传父组件？--函数传参 */}
                        <UpdateForm gatewayInfo={gateway}
                                    setForm={(form) => {
                                        this.form = form
                                    }}/>

                    </Modal>

                    <Modal
                        title="申请接入网关"
                        visible={showStatus === 4}
                        onOk={this.joinGateway}
                        onCancel={this.handleCancel}
                    >
                        <JoinGateway gatewayInfo={gateway}
                                    setForm={(form) => {
                                        this.form = form
                                    }}/>

                    </Modal>

                </Card>
            </div>
        )
    }
}
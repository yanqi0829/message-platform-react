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
import {reqGatewayInfo, updateGatewayInfo, reqAuditGatewayInfo, addGateway, auditOk, auditCancle} from '../../api/'
import AuditForm from './audit-form'
import memoryUtils from '../../utils/memoryUtils'
import {formateDate} from '../../utils/dateUtils'


export default class CategoryAudit extends Component {
    state = {
        audits: [],
        loading: false,
        showStatus: 0,  //0 不显示  1显示审核框

    }

    initColumns = () => {
        this.columns = [
            {
                title: '系统名称',
                dataIndex: 'systemName',
                key: 'systemName',
            },
            {
                title: '网关编码',
                dataIndex: 'gatewayCode',
                key: 'gatewayCode',
            },
            {
                title: '申请说明',
                dataIndex: 'description',
                key: 'description',
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
                title: '申请人',
                dataIndex: 'applyBy',
                key: 'applyBy',
            },
            {
                title: '申请时间',
                dataIndex: 'applyTime',
                key: 'createTime',
                render: (createTime) => formateDate(createTime)
            },
            {
                title: '申请条数',
                dataIndex: 'couldSend',
                key: 'couldSend',
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
                            return "已审核";
                            break;
                        case "2":
                            return "已拒绝";
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
                render: (audit) => (   /*5.5 事件函数传参数 gateway 为当前行的参数*/
                    <span>

                        <LinkButton onClick={() => this.queryDetail(audit)}>查看</LinkButton>

            </span>
                ),
            },
        ];
    }
    /*显示查看确认框*/
    queryDetail = (audit) => {
        this.audit = audit
        this.setState({
            showStatus: 1
        })

    }


    getAuditGateways = async () => {
        this.setState({loading: true})
        //获取当前角色和系统
        const {role,systemCode}=memoryUtils.user
        const result = await reqAuditGatewayInfo(role,systemCode)
        this.setState({loading: false})
        if (result.respCode === 0) {
            // console.log(result)
            this.setState({    ////题外话：setState可跟随一个回调函数： 在状态更新且render后执行
                audits: result.data,    ////setState不能立即获取最新的状态，因为setState是异步更新的
            })
        } else {
            message.error('获取网关列表失败')
        }
    }
    handleCancelIng=()=>{
        this.setState({
            showStatus: 0
        })
    }

    /*响应点击取消 隐藏确定框*/
    handleCancel = async () => {
        const audit = this.audit
        this.setState({
            showStatus: 0
        })
        const auditInfo = {...audit, auditBy: memoryUtils.user.name}
        // console.log("auditInfo", auditInfo)
        const result = await auditCancle(auditInfo)
        if (result.respCode === 0) {
            message.success("操作成功！")
            this.getAuditGateways()
        } else {
            message.error("操作失败！")
        }

    }
    /*通过网关申请*/
    handleOk = async () => {
        const audit = this.audit
        this.setState({
            showStatus: 0
        })

        const auditInfo = {...audit, auditBy: memoryUtils.user.name}
        // console.log("auditInfo", auditInfo)
        const result = await auditOk(auditInfo)
        if (result.respCode === 0) {
            message.success("操作成功！")
            this.getAuditGateways()
        } else {
            message.error("操作失败！")
        }
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getAuditGateways()
    }

    render() {
        const {audits, loading, showStatus} = this.state
        const audit = this.audit || {} //如果还没有指定一个空对象  因为上来 column中render会先渲染
        const title = '网关审核列表'

        return (
            <div>
                <Card title={title}>
                    <Table dataSource={audits}
                           columns={this.columns}
                           bordered
                           loading={loading}
                           rowKey='key'
                           pagination={{defaultPageSize: 6, showQuickJumper: true}}
                    />
                    <Modal
                        title="审核"
                        visible={showStatus === 1}
                        onOk={this.auditGateway}
                        onCancel={this.handleCancelIng}
                        footer={memoryUtils.user.role == "manager" &&audit.joinFlag=="0"?[
                            <Button key="back" onClick={this.handleCancel} style={{marginLeft: "50px"}}>
                                拒绝
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                同意
                            </Button>,
                        ]:null}
                    >
                        <AuditForm auditInfo={audit}
                        />
                    </Modal>
                </Card>
            </div>
        )
    }
}
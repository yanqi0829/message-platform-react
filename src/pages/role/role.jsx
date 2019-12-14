import React, {Component} from 'react'
import {Card, Button, Table, Modal} from 'antd'
import {reqRolesInfo} from '../../api'
import AddForm from "./add-form";
/*
角色路由
 */
export default class Role extends Component {
    state = {
        roles: [],
        loading: false,
        role: {},//当前选中
        showStatus:0  //0隐藏  1添加
    }

    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'role_name',
                key: 'role_name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                key: 'auth_time',
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
                key: 'auth_name',
            },
        ]
    }

    getRoles = async () => {
        const result = await reqRolesInfo()
        if (result.respCode === 0) {
            const roles = result.data
            this.setState({
                roles
            })
        }
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getRoles()
    }

    onRow = (role) => {
        return {
            onClick: event => {
                this.setState({
                    role
                })
            },
        }
    }

    /*响应点击取消 隐藏确定框*/
    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
        //清除输入数据
        this.form.resetFields()
    }

    addRole=()=>{

    }

    render() {
        const {loading, roles,role,showStatus} = this.state
        const title = (
            <span>
                <Button type='primary' onClick={()=>{this.setState({showStatus:1})}}>创建角色</Button> &nbsp;&nbsp;
                <Button type='primary' disabled={!role._id}>设置角色权限</Button>
            </span>
        )
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return (
            <div>
                <Card title={title}>
                    <Table dataSource={roles}
                           columns={this.columns}
                           rowSelection={{
                               type: 'radio',
                               selectedRowKeys:[role._id]   //role 1.3 单选框 行选中点亮  与rowKey有关
                               /* onChange: (selectedRowKeys, selectedRows) => {
                                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                                }, getCheckboxProps: record => ({
                                    disabled: record.name === 'Disabled User', // Column configuration not to be checked
                                    name: record.name,
                                })*/
                           }}    //role 1.1  表格是否可选配置
                           onRow={this.onRow}   ////role 1.2  点击行选中
                           bordered
                           rowKey='_id'
                           loading={loading}
                           pagination={{defaultPageSize: 5, showQuickJumper: true}}
                    />
                    <Modal
                        title="添加角色"
                        visible={showStatus === 1}
                        onOk={this.addRole}
                        onCancel={this.handleCancel}
                    >
                        <AddForm
                        setForm={(form)=>{this.form=form}}
                        />

                    </Modal>
                </Card>


            </div>
        )
    }
}
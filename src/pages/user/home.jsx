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
import {reqUsers} from '../../api/'
import {PAGE_SIZE} from '../../utils/constants'
import {formateDate} from "../../utils/dateUtils";

const Option = Select.Option
/*
默认子路由组件
 */
export default class userHome extends Component {
    state = {
        users: [],  //模版列表
        total: 0,//模版总数量
        loading: false,
    }
    initColumns = () => {
        this.columns = [
            {
                title: '单位名称',
                dataIndex: 'department',
                key: 'department',
            },
            {
                title: '项目组',
                dataIndex: 'groupName',
                key: 'groupName',
            },
            {
                title: '系统名称',
                dataIndex: 'systemName',
                key: 'systemName',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '角色',
                dataIndex: 'role',
                key: 'role',
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                width: 150,
                render: (user) => (
                    <span>
                        {/*本组件是路由组件 有 history属性 可以用history*/}
                        <LinkButton onClick={() => this.props.history.push('/user/detail', user)}>详情</LinkButton>
                        <LinkButton onClick={() => this.props.history.push('/user/addupdate', user)}>修改</LinkButton>
            </span>
                ),
            },
        ];
    }

    componentWillMount() {
        this.initColumns()
    }

    /*获取指定页码的列表数据显示*/
    getusers = async (pageNum) => {
        this.pageNum = pageNum
        this.setState({loading: true})
        const result = await reqUsers(pageNum, PAGE_SIZE)
        this.setState({loading: false})
        if (result.respCode === 0) {
            const list = result.data
            const total = result.total
            this.setState({
                users: list,
                total,
            })
        }

    }

    componentDidMount() {
        this.getusers(1)   //默认获取第一页数据
    }

    render() {
        const {users, loading, total} = this.state
        const title = (
            <span>
                <Select value='1' style={{width: 150}}>
                    <Option value='1'>按网关搜索</Option>
                    <Option value='2'>按模版ID搜索</Option>
                </Select>
                    <Input placeholder='关键字' style={{width: 150, margin: '0 15px'}}/>
                    <Button type='primary'>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={() => this.props.history.push("/user/addupdate")}>
                <Icon type='plus'></Icon>
                添加用户
            </Button>
        )
        return (
            <Card extra={extra}>
                {/* <Card title={title} extra={extra}>*/}
                <Table dataSource={users}
                       columns={this.columns}
                       bordered
                       loading={loading}
                    // rowKey='userId'
                       pagination={{
                           total,
                           defaultPageSize: PAGE_SIZE,
                           showQuickJumper: true,
                           onChange: (pageNum) => {
                               this.getusers(pageNum)
                           }     /*点击页数监听*/
                       }}
                />
            </Card>
        )
    }
}
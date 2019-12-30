import Mock from 'mockjs'
import ajax from "../api/ajax";
import {updateGatewayInfo} from "../api";

Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})





Mock.mock('/gateway/audit', {
        respCode: 0,
        respDesc: "查询成功",
        data: [{
            _id:"3475837456879",
            systemName: "会员中心",
            gatewayCode: "10017",
            description: "我要申请",
            systemCode: "A800",
            joinFlag:"0",
            applyBy:"用户1",
            applyTime: 2131246123746,
            couldSend: 900,
        }]
    }
)


Mock.mock('/gateway/auditOk', {
        respCode: 0,
        respDesc: "成功",
    }
)
Mock.mock('/gateway/auditCancle', {
        respCode: 0,
        respDesc: "成功",
    }
)


Mock.mock('/template/audit', {
        respCode: 0,
        respDesc: "成功",
    }
)

Mock.mock('/gateway/queryJoin', {
        respCode: 0,
        respDesc: "成功",
    data:[
        {gatewayCode:"10017",key:1},
        {gatewayCode:"342",key:2},
    ]
    }
)

Mock.mock('/login/login', {
        respCode: 0,
        respDesc: "登录成功",
        data: {
            username: "user",
            password: "asdasd",
            systemCode: "A800",
            systemName: "会员中心",
            name: "延期",
            role: "admin",
            // role:"test",
            serialNumber: "123412415"
        }
    }
)
Mock.mock('/gateway/query', {
        respCode: 0,
        respDesc: "查询成功",
        data: [
            {

                gatewayCode: '342',
                gatewayName: '342全网网关',
                detail: '全网网关阿萨德和数据库就好丰盛的接口和圣诞节开发红色经典看收到就好是 对接好使的接口和时间的话收到就好收到接口和是可见回复蜀客多积货时刻',
                createTime: 1576478282000,
                joinFlag:"1"
            },
            {
                gatewayCode: '10017',
                gatewayName: '10017网关',
                detail: '本网网关',
                createTime: 1576478282000,
                joinFlag:"2"
            },
            {
                gatewayCode: '10017',
                gatewayName: '10017网关',
                detail: '本网网关',
                createTime: 1576478282000,
            },
            {
                gatewayCode: '10017',
                gatewayName: '10017网关',
                detail: '本网网关',
                createTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                createTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                createTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                createTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                createTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                createTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                createTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                createTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                createTime: '2019',
            },
        ]
    }
)
Mock.mock('/gateway/update', {
        respCode: 0,
        respDesc: "更新成功",
    }
)

Mock.mock('/gateway/add', {
        respCode: 0,
        respDesc: "插入成功",
    }
)

Mock.mock('/template/query', {
        respCode: 0,
        respDesc: "查询成功",
        total: 20,
        data: [
            {
                gatewayCode: '342',
                templateId: '999999123111',
                templateComment: '2019阿萨德按时',
                applyTime: 1576478282000,
                auditTime: '2019',
                joinFlag: '0',
                couldSend: 50000,
            },
            {
                gatewayCode: '342',
                templateId: '123123132123',
                templateComment: '2019阿萨德按时',
                applyTime: 1576478282000,
                auditTime: '2019',
                joinFlag: '0',
            },
            {
                gatewayCode: '342',
                templateId: '123123132123',
                templateComment: '2019阿萨德按时',
                applyTime: 1576478282000,
                auditTime: '2019',
                joinFlag: '1',
            },
            {
                gatewayCode: '342',
                templateId: '123123132123',
                templateComment: '2019阿萨德按时',
                applyTime: 1576478282000,
                auditTime: '2019',
                joinFlag: '2',
            },  {
                gatewayCode: '342',
                templateId: '123123132123',
                templateComment: '2019阿萨德按时',
                applyTime: 1576478282000,
                joinFlag: '3',
            },
        ]
    }
)


Mock.mock('/gateway/role', {
        respCode: 0,
        respDesc: "查询成功",
        data: [
            {role_name: "经理", create_time: '2019年十一', auth_time: "2020年年", auth_name: '经理人', _id: "asdasdafasfsdf"},
            {role_name: "sdjh ", create_time: '2019年十一', auth_time: "2020年年", auth_name: '经理人', _id: "7a523sd4as4d"},
            {role_name: "asd ", create_time: '2019年十一', auth_time: "2020年年", auth_name: '经理人', _id: "asd84as56d4sdf"},
        ]
    }
)

Mock.mock('/template/update', {
        respCode: 0,
        respDesc: "更新成功",
    }
)


Mock.mock('/gateway/join', {
        respCode: 0,
        respDesc: "申请成功",
    }
)

Mock.mock('/template/add', {
        respCode: 0,
        respDesc: "添加成功",
    }
)

Mock.mock('/user/query', {
        respCode: 0,
        respDesc: "查询成功",
        total: 20,
        data: [
            {
                username: 'admin1',
                password: '123456',
                name: '测试人员',
                serialNumber: '13945444444',
                systemCode: 'A800',
                systemName: '会员中心',
                groupName: '自然人',
                department: '哈尔滨软件研究院',
                email: '61263123@111.com',
                role: 'admin',
                createBy: 'wang',
                updateBy: 'wang',
            },
            {
                username: 'admin1',
                password: '123456',
                name: '测试人员',
                serialNumber: '13945444444',
                systemCode: 'A800',
                groupName: '自然人',
                department: '哈尔滨软件研究院',
                email: '61263123@111.com',
                role: 'admin',
                createBy: 'wang',
                updateBy: 'wang',
            }, {
                username: 'admin1',
                password: '123456',
                name: '测试人员',
                serialNumber: '13945444444',
                systemCode: 'A800',
                groupName: '自然人',
                department: '哈尔滨软件研究院',
                email: '61263123@111.com',
                role: 'admin',
                createBy: 'wang',
                updateBy: 'wang',
            }, {
                username: 'admin1',
                password: '123456',
                name: '测试人员',
                serialNumber: '13945444444',
                systemCode: 'A800',
                groupName: '自然人',
                department: '哈尔滨软件研究院',
                email: '61263123@111.com',
                role: 'admin',
                createBy: 'wang',
                updateBy: 'wang',
            }, {
                username: 'admin1',
                password: '123456',
                name: '测试人员',
                serialNumber: '13945444444',
                systemCode: 'A800',
                groupName: '自然人',
                department: '哈尔滨软件研究院',
                email: '61263123@111.com',
                role: 'admin',
                createBy: 'wang',
                updateBy: 'wang',
            }, {
                username: 'admin1',
                password: '123456',
                name: '测试人员',
                serialNumber: '13945444444',
                systemCode: 'A800',
                groupName: '自然人',
                department: '哈尔滨软件研究院',
                email: '61263123@111.com',
                role: 'admin',
                createBy: 'wang',
                updateBy: 'wang',
            }, {
                username: 'admin1',
                password: '123456',
                name: '测试人员',
                serialNumber: '13945444444',
                systemCode: 'A800',
                groupName: '自然人',
                department: '哈尔滨软件研究院',
                email: '61263123@111.com',
                role: 'admin',
                createBy: 'wang',
                updateBy: 'wang',
            },
        ]
    }
)


Mock.mock('/user/update', {
        respCode: 0,
        respDesc: "更新成功",
    }
)

Mock.mock('/user/add', {
        respCode: 0,
        respDesc: "添加成功",
    }
)
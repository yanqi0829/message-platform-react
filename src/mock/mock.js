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

Mock.mock('/login/login', {
        respCode: 0,
        respDesc: "登录成功",
        data: {
            username: "hahaha",
            password: "asdasd",
            role:"admin"
        }
    }
)
Mock.mock('/gateway/query', {
        respCode: 0,
        respDesc: "查询成功",
        data: [
            {

                gatewayCode: '342',
                gatewayName:'342全网网关',
                detail: '全网网关阿萨德和数据库就好丰盛的接口和圣诞节开发红色经典看收到就好是 对接好使的接口和时间的话收到就好收到接口和是可见回复蜀客多积货时刻',
                createTime: 1576478282000,
            },
            {
                gatewayCode: '10017',
                gatewayName:'10017网关',
                detail: '本网网关',
                createTime: 1576478282000,
            },
            {
                gatewayCode: '10017',
                gatewayName:'10017网关',
                detail: '本网网关',
                createTime: 1576478282000,
            },
            {
                gatewayCode: '10017',
                gatewayName:'10017网关',
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
                joinFlag: '0',
            },
            {
                gatewayCode: '342',
                templateId: '123123132123',
                templateComment: '2019阿萨德按时',
                applyTime: 1576478282000,
                auditTime: '2019',
                joinFlag: '0',
            }, {
                gatewayCode: '342',
                templateId: '123123132123',
                templateComment: '2019阿萨德按时',
                applyTime: 1576478282000,
                auditTime: '2019',
                joinFlag: '0',
            }, {
                gatewayCode: '342',
                templateId: '123123132123',
                templateComment: '2019阿萨德按时',
                applyTime: 1576478282000,
                joinFlag: '0',
            },
        ]
    }
)



Mock.mock('/gateway/role', {
        respCode: 0,
        respDesc: "查询成功",
        data: [
            {role_name: "经理", create_time: '2019年十一', auth_time: "2020年年", auth_name: '经理人',_id:"asdasdafasfsdf"},
            {role_name: "sdjh ", create_time: '2019年十一', auth_time: "2020年年", auth_name: '经理人',_id:"7a523sd4as4d"},
            {role_name: "asd ", create_time: '2019年十一', auth_time: "2020年年", auth_name: '经理人',_id:"asd84as56d4sdf"},
        ]
    }
)
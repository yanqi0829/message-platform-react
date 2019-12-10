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
        }
    }
)
Mock.mock('/gateway/query', {
        respCode: 0,
        respDesc: "查询成功",
        data: [
            {

                gatewayCode: '342',
                detail: '全网网关阿萨德和数据库就好丰盛的接口和圣诞节开发红色经典看收到就好是 对接好使的接口和时间的话收到就好收到接口和是可见回复蜀客多积货时刻',
                joinTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                joinTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                joinTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                joinTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                joinTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                joinTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                joinTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                joinTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                joinTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                joinTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                joinTime: '2019',
            },
            {
                gatewayCode: '10017',
                detail: '本网网关',
                joinTime: '2019',
            },
        ]
    }
)
Mock.mock('/gateway/update', {
        respCode: 0,
        respDesc: "登录成功",
    }
)


Mock.mock('/template/query', {
        respCode: 0,
        respDesc: "查询成功",
        total: 6,
        data: [
            {
                gatewayName: '342',
                templateId: '123123132123',
                templateContent: '2019阿萨德按时',
                requestTime: '2019',
                status: '0',
            },
            {
                gatewayName: '10017',
                templateId: '123124153132123',
                templateContent: '2019阿萨德按时',
                requestTime: '2019',
                status: '0',
            },
            {
                gatewayName: '342',
                templateId: '12312311232123',
                templateContent: '2019阿萨德按时',
                requestTime: '2019',
                status: '0',
            },
            {
                gatewayName: '342',
                templateId: '1231231456451232123',
                templateContent: '2019阿萨德按时',
                requestTime: '2019',
                status: '0',
            }, {
                gatewayName: '10017',
                templateId: '123123112454532123',
                templateContent: '2019阿萨德按时',
                requestTime: '2019',
                status: '0',
            }, {
                gatewayName: '342',
                templateId: '1231456452311232123',
                templateContent: '2019阿萨德按时',
                requestTime: '2019',
                status: '0',
            },
        ]
    }
)
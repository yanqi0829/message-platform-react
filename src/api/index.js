/*
3.2包含应用中所有接口请求函数的模块
每个接口的返回都是promise
 */
import ajax from './ajax'
//登录
/*
export function reqLogin(username,password) {
    return ajax('/login',{username,password},'POST')
}*/
export  const  reqLogin=(username,password)=>ajax('/login/login',{username,password},'POST')

//添加用户
export  const  reqAddUser=(user)=>ajax('/manage/user/add',user,'POST')

//查询网关信息 查询使用get请求
export  const  reqGatewayInfo=()=>ajax('/gateway/query')

//新增网关
export  const  addGateway=(gatewayInfo)=>ajax('/gateway/add',gatewayInfo,'POST')

//更新网关信息
export  const  updateGatewayInfo=(gatewayInfo)=>ajax('/gateway/update',gatewayInfo,'POST')

//获取模版分页列表  mock get 传参未解决
// export  const  reqTemplates=(pageNum,pageSize)=>ajax('/template/query',{pageNum,pageSize})
export  const  reqTemplates=(pageNum,pageSize)=>ajax('/template/query')
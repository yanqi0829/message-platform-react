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

//添加用户 user是个对象
export  const  reqAddUser=(user)=>ajax('/manage/user/add',user,'POST')
//分页查询用户  mock get 传参未解决   生产打包需要打开注释
export  const  reqUsers=(pageNum,pageSize)=>ajax('/user/query',{pageNum,pageSize})
// export  const  reqUsers=(pageNum,pageSize)=>ajax('/user/query')

//查询网关信息 查询使用get请求
export  const  reqGatewayInfo=(role,systemCode)=>ajax('/gateway/query',{role,systemCode},'POST')

//新增网关
export  const  addGateway=(gatewayInfo)=>ajax('/gateway/add',gatewayInfo,'POST')

//更新网关信息
export  const  updateGatewayInfo=(gatewayInfo)=>ajax('/gateway/update',gatewayInfo,'POST')

//获取模版分页列表  mock get 传参未解决   生产打包需要打开注释
export  const  reqTemplates=(pageInfo)=>ajax('/template/query',pageInfo,'POST')
// export  const  reqTemplates=(pageNum,pageSize)=>ajax('/template/query',)

export  const  reqAllTemplates=()=>ajax('/template/query')

//获取所有角色列表 查询使用get请求
export  const  reqRolesInfo=()=>ajax('/gateway/role')

//获取所有角色列表 查询使用get请求
export  const  reqAddRole=(name)=>ajax('/gateway/role/add',{name},"POST")
//添加 修改用户
export const reqAddOrUpdateTemplate = (template) => ajax( '/template/' + ( template.flag?'update':'add'), template, 'POST')
//添加 修改用户
export const reqAddOrUpdateUser = (user) => ajax( '/user/' + ( user.flag?'update':'add'), user, 'POST')

//申请接入网关
export const joinGateway = (joinGatewayInfo) => ajax('/gateway/join',joinGatewayInfo,'POST')

//审核网关列表
export  const  reqAuditGatewayInfo=(role,systemCode)=>ajax('/gateway/audit',{role,systemCode},'POST')

export const auditOk = (auditInfo) => ajax('/gateway/auditOk',auditInfo,'POST')

export const auditCancle = (auditInfo) => ajax('/gateway/auditCancle',auditInfo,'POST')

export const auditTemplate=(auditInfo) => ajax('/template/audit',auditInfo,'POST')



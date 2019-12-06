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
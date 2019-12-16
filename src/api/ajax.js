/*
3.1能发送ajax请求的函数模块
封装axios
函数的返回值是promise对象
详情参看github axios
 */
import axios from 'axios'
import  {message} from 'antd'
/*
3.4引入mockjs
 */
import  '../mock/mock'
export  default  function ajax(url,data={},type='GET' ) {
    // console.log(url,data)
    /*3.5 统一处理请求异常  在外层包一个promise对象
    在请求出错时，不reject（error） 而是显示错误提示  注释掉3.4的 try catch*/
    return new Promise((resolve,reject)=>{
        let promise
            //1.执行ajax请求
        if(type==='GET'){
            promise= axios.get(url,{
                params: data  //指定请求参数
            })
        }else{
            promise= axios.post(url,data)
        }
        //2.如果成功 调用resolve（value）
        promise.then(response=>{
            resolve(response.data)  //此处优化，后续得到不是response 而是data
            console.log("调用接口返回内容",response.data)
            //3.如果失败，不调用reject（reason），而是提示异常信息
        }).catch(error=>{
            //reject(error)
            message.error('请求出错了：'+error.message)
        })

    })


}



/*
1.1入口js
* */
import React from 'react'
//1.5 渲染App标签,必须引入ReactDOM ，引入自定义模块要加 ./
import ReactDOM from 'react-dom'
import App from './App'
//1.9 引入antd 样式
// import 'antd/dist/antd.css'
//3.7读取数据中保存的user，保存到内存中
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'

const user = storageUtils.getUser()
memoryUtils.user = user

//1.6 将App组件标签渲染到 主页面index的div上
ReactDOM.render(<App/>, document.getElementById('root'))
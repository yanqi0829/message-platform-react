import React, {Component} from 'react'
import ReactEcharts from 'echarts-for-react'
import './index.less'
import {Card} from "antd";
/*
首页路由
 */
export default class Home extends Component {



    getOption = () => {
        return {
            title : {
                text: '短信接入系统',
                // subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['活动中心','权益中心','策略中心','运营平台','自然人']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'权益中心'},
                        {value:310, name:'活动中心'},
                        {value:234, name:'策略中心'},
                        {value:135, name:'自然人'},
                        {value:1548, name:'运营平台'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

    }



    render() {

        return (
            <div>
                <div className='home'>欢迎使用短信平台管理系统</div>
                <ReactEcharts option={this.getOption()} style={{height: 300}}/>            </div>
        )
    }
}
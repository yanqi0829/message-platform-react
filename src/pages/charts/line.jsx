import React, {Component} from 'react'
import ReactEcharts from "echarts-for-react";
/*
折线图路由
 */
export default class Line extends Component {
    state = {
        sales: [5, 20, 36, 10, 10, 20],
        inventorys: [15, 30, 46, 20, 20, 40]
    }

    getOption = (sales, inventorys) => {

        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {    //上方说明
                data:['销量', '库存']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data:sales
            }, {
                name: '库存',
                type: 'line',
                data: inventorys
            }]
        }
    }

    render() {
        const {sales, inventorys} = this.state
        return (
            <div>
                <ReactEcharts option={this.getOption(sales, inventorys)} style={{height: 300}}/>
            </div>
        )
    }
}
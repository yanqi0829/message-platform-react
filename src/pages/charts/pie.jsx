import React, {Component} from 'react'
import ReactEcharts from 'echarts-for-react'
import {
    Icon,
    Card,
    Statistic,
    DatePicker,
    Timeline
} from 'antd'
import moment from 'moment'
import Line from './line'
import Bar from './bar'


const dateFormat = 'YYYY/MM/DD'
const {RangePicker} = DatePicker

/*
后台管理的饼图路由组件
 */
export default class Pie extends Component {

    state = {
        isVisited: true
    }

    handleChange = (isVisited) => {
        return () => this.setState({isVisited})
    }

    getOption = () => {
        return {
            title : {
                text: '某站点用户访问来源',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
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

    getOption2 = () => {
        return {
            backgroundColor: '#2c343c',

            title: {
                text: 'Customized Pie',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name:'访问来源',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'活动中心'},
                        {value:310, name:'权益中心'},
                        {value:274, name:'策略中心'},
                        {value:235, name:'运营平台'},
                        {value:400, name:'搜索引擎'}
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
    }

    render() {
        const {isVisited} = this.state
        return (
            <div>
                <Card title='饼图一'>
                    <ReactEcharts option={this.getOption()} style={{height: 300}}/>
                </Card>
                <Card title='饼图二'>
                    <ReactEcharts option={this.getOption2()} style={{height: 300}}/>
                </Card>

                {/*其他常见场景*/}
                <Card
                    className="home-card"
                    title="商品总量"
                    extra={<Icon style={{color: 'rgba(0,0,0,.45)'}} type="question-circle"/>}
                    style={{width: 250}}
                    headStyle={{color: 'rgba(0,0,0,.45)'}}
                >
                    <Statistic
                        value={1128163}
                        suffix="个"
                        style={{fontWeight: 'bolder'}}
                    />
                    <Statistic
                        value={15}
                        valueStyle={{fontSize: 15}}
                        prefix={'周同比'}
                        suffix={<div>%<Icon style={{color: 'red', marginLeft: 10}} type="arrow-down"/></div>}
                    />
                    <Statistic
                        value={10}
                        valueStyle={{fontSize: 15}}
                        prefix={'日同比'}
                        suffix={<div>%<Icon style={{color: '#3f8600', marginLeft: 10}} type="arrow-up"/></div>}
                    />
                </Card>

                <Line/>

                <Card
                    className="home-content"
                    title={<div className="home-menu">
            <span className={isVisited ? "home-menu-active home-menu-visited" : 'home-menu-visited'}
                  onClick={this.handleChange(true)}>访问量</span>
                        <span className={isVisited ? "" : 'home-menu-active'} onClick={this.handleChange(false)}>销售量</span>
                    </div>}
                    extra={<RangePicker
                        defaultValue={[moment('2019/01/01', dateFormat), moment('2019/06/01', dateFormat)]}
                        format={dateFormat}
                    />}
                >
                    <Card
                        className="home-table-left"
                        title={isVisited ? '访问趋势' : '销售趋势'}
                        bodyStyle={{padding: 0, height: 275}}
                        extra={<Icon type="reload"/>}
                    >
                        <Bar/>
                    </Card>

                    <Card title='任务' extra={<Icon type="reload"/>} className="home-table-right">
                        <Timeline>
                            <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                            <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                            <Timeline.Item color="red">
                                <p>联调接口</p>
                                <p>功能验收</p>
                            </Timeline.Item>
                            <Timeline.Item>
                                <p>登录功能设计</p>
                                <p>权限验证</p>
                                <p>页面排版</p>
                            </Timeline.Item>
                        </Timeline>
                    </Card>
                </Card>
            </div>
        )
    }
}

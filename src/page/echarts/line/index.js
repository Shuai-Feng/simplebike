import React from 'react';
import {Card} from 'antd';

//新版本的好像不用引入呢
// import echarts from  'echarts/lib/echarts'

// import 'echarts/lib/chart/bar';
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/markPoint';


import ReactEcharts from 'echarts-for-react';

export default class Bar extends React.Component {
    getOption = ()=>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            legend:{
                top:10,
                right:20,
                data:['ofo','摩拜']
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}:{c}({d}%)'
            },  
            series:[
                {
                    name:'ofo',
                    type:'line',
                    data:[100,200,100,500,300,400,700]
                }
            ]
        }
        return option;
    }
    getOption2 = ()=>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            legend:{
                top:10,
                right:20,
                data:['ofo','摩拜']
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}:{c}({d}%)'
            },  
            series:[
                {
                    name:'ofo',
                    type:'line',
                    data:[100,200,100,500,300,400,700]
                },{
                    name:'摩拜',
                    type:'line',
                    data:[200,300,200,300,400,100,600]
                }
            ]
        }
        return option;
    }
    getOption3 = ()=>{
        let option = {
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        }
        return option;
    }
    render(){
        return (
            <div>
                <Card title="折线图之一">
                    <ReactEcharts
                        option = {this.getOption()}
                        style={{height:600}}
                    />
                </Card>
                <Card title="折线图之二">
                    <ReactEcharts
                        option = {this.getOption2()}
                        style={{height:600}}
                    />
                </Card><Card title="折线图之三">
                    <ReactEcharts
                        option = {this.getOption3()}
                        style={{height:600}}
                    />
                </Card>
            </div>
        )
    }
}

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
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'bar',
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
                data:['ofe','陌拜','小绿车']
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'ofe',
                    type:'bar',
                    data:[100,200,100,500,300,400,700]
                },
                {
                    name:'陌拜',
                    type:'bar',
                    data:[100,200,100,500,300,400,700]
                },
                {
                    name:'小绿车',
                    type:'bar',
                    data:[100,200,100,500,300,400,700]
                }
            ]
        }
        return option;
    }
    render(){
        return (
            <div>
                <Card title="柱状图表之一">
                    <ReactEcharts
                        option = {this.getOption()}
                        style={{height:600}}
                    />
                </Card>
                <Card title="柱状图表之二" style={{marginTop:10}}>
                    <ReactEcharts
                        option = {this.getOption2()}
                        style={{height:600}}
                    />
                </Card>
            </div>
        )
    }
}

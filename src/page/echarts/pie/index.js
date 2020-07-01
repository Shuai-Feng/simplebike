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
                text:'用户骑行订单',
                x:'center'
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}:{c}({d}%)'
            },  
            legend:{
                top:10,
                right:20,
                orient:'vertical',
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    data:[
                        {
                            value:2100,
                            name:'周一'
                        },{
                            value:1700,
                            name:'周二'
                        },{
                            value:1100,
                            name:'周三'
                        },{
                            value:2000,
                            name:'周四'
                        },{
                            value:4500,
                            name:'周五'
                        },{
                            value:3000,
                            name:'周六'
                        },{
                            value:2000,
                            name:'周日'
                        }
                    ]
                }
            ]
        }
        return option;
    }
    getOption2 = ()=>{
        let option = {
            title:{
                text:'用户骑行订单',
                x:'center'
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}:{c}({d}%)'
            },  
            legend:{
                top:10,
                right:20,
                orient:'vertical',
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    roseType: 'radius',
                    data:[
                        {
                            value:2100,
                            name:'周一'
                        },{
                            value:1700,
                            name:'周二'
                        },{
                            value:1100,
                            name:'周三'
                        },{
                            value:2000,
                            name:'周四'
                        },{
                            value:4500,
                            name:'周五'
                        },{
                            value:3000,
                            name:'周六'
                        },{
                            value:2000,
                            name:'周日'
                        }
                    ].sort((a,b)=>{return a.value - b.value}),
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
        return option;
    }
    render(){
        return (
            <div>
                <Card title="饼图之二" style={{marginTop:10}}>
                    <ReactEcharts
                        option = {this.getOption2()}
                        style={{height:600}}
                    />
                </Card>
                <Card title="饼图之一">
                    <ReactEcharts
                        option = {this.getOption()}
                        style={{height:600}}
                    />
                </Card>
            </div>
        )
    }
}

import React, { Component } from 'react';
import {Card} from 'antd';
import axios from './../../axios';
import BaseForm from '../../components/BaseForm';

class Map extends Component {
    
    formList = [
        {
            type:'城市',
            field:'city'
        },{
            type:'时间查询',
            field:'time'
        },{
            type:'SELECT',
            label:'订单状态',
            field:'order_status',
            palceholder:'全部',
            initialValue:'0',
            list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'行程结束'}]
        }
    ]

    requestList = ()=>{
        axios.ajax({
            url:'/map/bike_list',
            data:{
                param:this.param
            }
        }).then(res=>{
            if(res.code === '0'){
                this.setState({
                    totalCount:res.result.total_count
                })
                this.renderMap(res);
            }
        })
    }

    renderMap = (res)=>{
        let list = res.result.route_list;
        this.map = new window.BMap.Map('container');
        let gps1 = list[0].split(',');
        let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
        let gps2 = list[list.length - 1].split(',');
        let endPoint = new window.BMap.Point(gps2[0], gps2[1]);
        this.map.centerAndZoom(endPoint,11)

        //增加初始地点图表
        let startPointIcon = new window.BMap.Icon('/asset/start_point.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(18,42)
        });
        let bikeMarketStart = new window.BMap.Marker(startPoint,{icon:startPointIcon});
        this.map.addOverlay(bikeMarketStart)
        //增加结束地点图表
        let endPointIcon = new window.BMap.Icon('/asset/end_point.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(18,42)
        });
        let bikeMarketEnd = new window.BMap.Marker(endPoint,{icon:endPointIcon});
        this.map.addOverlay(bikeMarketEnd);

        //绘制车辆行驶路线
        let routeList = [];
        list.forEach(item=>{
            let p = item.split(',');
            routeList.push(new window.BMap.Point(p[0],p[1]))
        })
        let polyLine = new window.BMap.Polyline(routeList,{
            strokeColor:'#ef4136',
            strokeWeight:3,
            strokeOpacity:1
        })
        this.map.addOverlay(polyLine);
        
        //绘制服务区
        let servicePointList = [];
        let serviceList = res.result.service_list;
        serviceList.forEach((item)=>{
            servicePointList.push(new window.BMap.Point(item.lon,item.lat));
        })
        let polyServiceLine = new window.BMap.Polygon(servicePointList,{
            strokeColor:'#ef4136',
            strokeWeight:3,
            strokeOpacity:1,
            fillColor:'#ff8605'
        })
        this.map.addOverlay(polyServiceLine);

        //添加地图中的自行车图表
        let bikeList = res.result.bike_list;
        let bikeIcon = new window.BMap.Icon('/asset/bike.jpg',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(18,42)
        });
        bikeList.forEach(item=>{
            let p = item.split(',');
            let point = new window.BMap.Point(p[0],p[1]);
            let bikeMarker = new window.BMap.Marker(point,{
                icon:bikeIcon
            });
            this.map.addOverlay(bikeMarker);
        })  
    }

    handelFilterSubmit = (filterParam)=>{
        this.params = filterParam
        this.requestList('container');
    }
    componentDidMount(){
        this.requestList();
    }
    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handelFilterSubmit}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共100辆车</div>
                    <div id='container' style={{height:500}}></div>
                </Card>
            </div>
        );
    }

}

export default Map;
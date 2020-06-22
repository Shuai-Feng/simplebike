import React, { Component } from 'react';
import { Card  } from 'antd';  
import axios from '../../axios/index';
// import Utils from '../../util/utils';
import './detail.less'


export default class Order extends Component {
    state = {
        orderInfo:null
    }
    componentDidMount(){
        let orderId  = this.props.match.params.orderId;
        if(orderId){
            this.getDetailInfo();
        }
      
    }
    getDetailInfo(orderId){
        axios.ajax({
            url:"/order/detail",
            data:{
                params:{
                    orderId:orderId  
                }
            }
        }).then((res)=>{
            console.log(res)
            if(res.code === "0"){
                this.setState({
                    orderInfo:res.result 
                })
                this.renderMap(res.result);
            }
        })
    }

    renderMap = (result)=>{
        this.map = new window.BMap.Map('orderDetailMap');

        this.addMapControl()//add the control pannel of the map

        this.drawBikearea(result.area);
        this.drawBikeRoute(result.position_list)//draw user route

      
    }
    addMapControl = ()=>{
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_LEFT}));
        map.addControl(new window.BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_LEFT}));
    }
    drawBikeRoute = (positionList)=>{
        // let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if(positionList.length>0){
            let first = positionList[0];
     
            startPoint = new window.BMap.Point(first.lon,first.lat);
            let startIcon = new window.BMap.Icon('/asset/start_point.png',new window.BMap.Size(36,42),{
                imageSize:new window.BMap.Size(36,42),
                anchor:new window.BMap.Size(36,42) 
            });

            let startMarker = new window.BMap.Marker(startPoint,{icon:startIcon});
            this.map.addOverlay(startMarker);

            let last = positionList[positionList.length-1];
            endPoint = new window.BMap.Point(last.lon,last.lat);
            let endIcon = new window.BMap.Icon('/asset/end_point.png',new window.BMap.Size(36,42),{
                imageSize:new window.BMap.Size(36,42),
                anchor:new window.BMap.Size(36,42) 
            });

            let endMarker = new window.BMap.Marker(endPoint,{icon:endIcon});
            this.map.addOverlay(endMarker);



            let trackPoint = [];
            positionList.forEach((item)=>{
                trackPoint.push(new window.BMap.Point(item.lon,item.lat))
            })
            let polyline = new window.BMap.Polyline(trackPoint,{
                strokeColor:"#1869A0",
                strokeWeight:3,
                strokeOpacity:1
            })
            this.map.addOverlay(polyline);
            this.map.centerAndZoom(endPoint,11);
        }
    }
    drawBikearea = (positionList)=>{
        let trackPoint = [];
        positionList.forEach((item)=>{
            trackPoint.push(new window.BMap.Point(item.lon,item.lat))
        })
        let polygon = new window.BMap.Polygon(trackPoint,{
            strokeColor:"#ce0000",
            strokeWeight:4,
            strokeOpacity:1,
            fillColor:'#ff8605'
        })
        this.map.addOverlay(polygon);
    }
    render(){
        const info= this.state.orderInfo || {}
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            {/* <li>
                                 <div className="detail-form-left">用车模式</div>.
                                 <div className="detail-form-content">{orderInfo.mode === 1? '服务区' : '停车点' }</div>
                            </li> */}
                            <li>
                                 <div className="detail-form-left">订单编号</div>
                                 <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                 <div className="detail-form-left">车辆编号</div>
                                 <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                 <div className="detail-form-left">手机号</div>
                                 <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                 <div className="detail-form-left">行程起点</div>
                                 <div className="detail-form-content">{info.start_location }</div>
                            </li>
                            <li>
                                 <div className="detail-form-left">行程终点</div>
                                 <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                 <div className="detail-form-left">行驶里程</div>
                                 <div className="detail-form-content">{info.distance/1000}公里</div>
                            </li>

                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}
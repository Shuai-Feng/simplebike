import React, { Component } from 'react';
import { Row,Col } from 'antd';
import Util from '../../util/utils';
// import Axiso from '../../axios';
// import axios from 'axios';
import './index.less'
class Header extends Component {
    state={
        userName:'gale',
        sysTime:Util.formDate(new Date().getTime())
    }
    componentWillMount(){
        setInterval(() => {
            let sysTime = Util.formDate(new Date().getTime());
            this.setState({
                sysTime
            })
        }, 1000);
        this.getWeatherApIData();
    }
    getWeatherApIData(){
        // let city = '北京';
        // axios.jsonp({
        //     url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        // }).then((res)=>{
        //     if(res.status == 'success'){
        //         let data = res.results[0].weather_data[0];
        //         this.setState({
        //             dayPictureUrl:data.dayPictureUrl,
        //             weather:data.weather
        //         })
        //     }
        // })
    }
    render() {
        const menuType = this.props.menuType;
        let { sysTime,userName } = this.state;
        return (
            <div className='header'>
                <Row className='header-top'>
                    {
                        menuType?
                            <Col span={3} className="logo">
                                <img src="/asset/logo-ant.svg"  alt=""></img>
                                <span>详情界面</span>
                            </Col>:""
                    }
                    <Col span={menuType?18:24}>
                        <span>欢迎,{userName}</span>
                        <a href="/#/admin">退出</a>
                    </Col>
                </Row>  
                {
                    menuType?"":
                    <Row className="breadcrumb">
                    <Col span={4} className='breadcrumb-title'>
                        首页
                    </Col>
                    <Col span={20} className='weather'> 
                        <span className='date'> {sysTime}</span>
                        <span className='weather-img'>
                            <img alt="weatherpic" src={this.state.dayPictureUrl} ></img>
                        </span>
                        <span className='weather-detail '>
                            {this.state.weather }
                        </span>
                    </Col>
                </Row>
                }
                
            </div>
        );
    }
}

export default Header;
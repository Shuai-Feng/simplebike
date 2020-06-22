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
        // console.log('请求调用了')
        // Axiso.jsonp({
        //     url:'http://api.map.baidu.com/weather/v1/?district_id=110100&data_type=all&ak=AjgOd5cXAYtLNL2omrQq3OXXxC6IbYw5&qq-pf-to=pcqq.c2c'
        // }).then((res)=>{
        //     console.log(res);
        // })
        // axios.get('http://192.168.0.102:8080/demo8/Teacher_viewStudent').then(res=>{
        //     console.log(res)
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
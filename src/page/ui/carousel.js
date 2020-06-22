import React,{Component} from 'react';
import {Card,Carousel} from 'antd';
import './ui.less'

export default class Carousels extends Component {
    render(){
        return (
            <div>
                <Card title="文字轮播" className="card-warp">
                    <Carousel effect="fade">
                        <div><h3>火</h3></div>
                        <div><h3>风</h3></div>
                        <div><h3>水</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="slider-warp">
                    <Carousel effect="fade">
                        <div><img src="/carousel-img/carousel-1.jpg"  alt=""/></div>
                        <div><img src="/carousel-img/carousel-2.jpg"  alt=""/></div>
                        <div><img src="/carousel-img/carousel-3.jpg"  alt=""/></div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}

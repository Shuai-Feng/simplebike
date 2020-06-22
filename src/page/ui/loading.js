import React, { Component } from 'react';
import {Card,Spin,Icon,Alert} from 'antd';
import './ui.less'
class Loading extends Component {
    render() {
        const icon = <Icon type="loading" ></Icon>
        return (
            <div>
                <Card title="Spin用法" className="card-warp">
                    <Spin></Spin>
                    <Spin size="large"></Spin>
                    <Spin indicator={icon}></Spin>
                </Card>
                <Card title="内容遮罩">
                <Alert message="React" description="Rip and Tears" type="info"></Alert>
                    <Spin>
                        <Alert message="React" description="Rip and Tears" type="info"></Alert>
                    </Spin>
                    <Spin tip='少女折寿中'>
                        <Alert message="React" description="Rip and Tears" type="warning"></Alert>
                    </Spin>
                    <Alert message="React" description="Rip and Tears" type="success"></Alert>
                </Card>
            </div>
        );
    }
}

export default Loading;
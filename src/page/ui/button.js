import {Button,Card,Radio} from 'antd';
import './ui.less';
import React, { Component } from 'react';

class Buttons extends Component {
    constructor(){
        super()
        this.state = {
            loading:false,
            size:'small'
        }
        this.handleCloseLoading = this.handleCloseLoading.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleCloseLoading(){
        let { loading } = this.state;
        this.setState({
            loading:!loading
        })
    }
    handleChange(e){
        this.setState({
            size:e.target.value
        })
    }
    render() {
        let {loading} = this.state;
        return (
        <div>
            <Card title="基础按钮" className="card-warp">
                <Button type="primary">布里特安防公司</Button>
                <Button type="danger">布里特安防公司</Button>
                <Button type="dashed">布里特安防公司</Button>
                <Button loading>布里特安防公司</Button>
            </Card>
            <Card title="图形按钮" className="card-warp">
                <Button icon="plus">创建</Button>
                <Button icon="edit">编辑</Button>
                <Button icon="delete">删除</Button>
                <Button shape="circle" icon="search"></Button>
                <Button type="primary" icon="search">搜索</Button>
                <Button type="primary" icon="download"></Button>
            </Card>
            <Card title="Loading" className="card-warp">
                <Button icon="plus" loading={loading}>创建</Button>
                <Button icon="edit" loading={loading}>编辑</Button>
                <Button icon="delete" loading={loading}>删除</Button>
                <Button shape="circle" icon="search" loading={loading}></Button>
                <Button type="primary" icon="search" loading={loading}>搜索</Button>
                <Button type="primary"  onClick={this.handleCloseLoading}>换</Button>
            </Card>
            <Card title="按钮组" className="card-warp">
                <Button.Group>
                     <Button icon="left">返回</Button>
                     <Button icon="right">前进</Button>
                </Button.Group>
            </Card>
            <Card title="按钮尺寸" className="card-warp">
                <Radio.Group value={this.state.size} onChange={this.handleChange}>
                    <Radio value="small">小</Radio>
                    <Radio value="default">中</Radio>
                    <Radio value="large">大</Radio>
                </Radio.Group>
                <Button type="primary" size={this.state.size}>Imoc</Button>
                <Button type="dashed" size={this.state.size}>Imoc</Button>
                <Button type="danger" size={this.state.size}>Imoc</Button>
            </Card>
        </div> 
        );
    }
}

export default Buttons;

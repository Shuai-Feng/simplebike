import React, { Component } from 'react';
import './ui.less'
import { Card,Button,Modal } from 'antd';
class Model extends Component {
    constructor(){
        super()
        this.state={
            showModel1:false,
            showModel2:false,
            showModel3:false,
            showModel4:false
        }
    }
    handleOpen = (type)=>{
        console.log(type)
            this.setState({
                [type]:true  
            })
    }
    handleOpen = (type)=>{
        Modal[type]({
            titile:"确认",
            content:"吃个人如何",
            onOk(){
                console.log('ok')
            },
            onCancel(){
                console.log('cancle')
            }
        })
    }
    render() {
        return (
            <div>
                <Card title="基础模态框" className="card-warp">
                    <Button type="primary" onClick={()=>this.handleOpen('showModel1')}>Open</Button>
                    <Button onClick={()=>this.handleOpen('showModel2')}>自定义页脚</Button>
                    <Button onClick={()=>this.handleOpen('showModel3')}>顶部20px单矿</Button>
                    <Button onClick={()=>this.handleOpen('showModel4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框" className="card-warp">
                    <Button type="primary" onClick={()=>this.handleOpen('confirm')}>信息确认框 吃个人？</Button>
                    <Button onClick={()=>this.handleOpen('info')}>自定义页脚</Button>
                    <Button onClick={()=>this.handleOpen('success')}>好吃</Button>
                    <Button onClick={()=>this.handleOpen('warning')}> </Button>
                </Card>
                <Modal 
                    title="React"
                    visible={this.state.showModel1}
                    onCancel={()=>{
                        this.setState({
                            showModel1:false
                        })
                    }}
                >
                    <span>成了啊</span>
                </Modal>
                <Modal 
                    title="React"
                    visible={this.state.showModel2}
                    okText="完活"
                    cancelText="👴觉得不行"
                    onCancel={()=>{
                        this.setState({
                            showModel2:false
                        })
                    }}
                    onOk={()=>{
                        this.setState({
                            showModel2:false
                        })
                    }}
                >
                    <span>成了啊</span>
                </Modal>
                <Modal 
                    title="React"
                    visible={this.state.showModel3}
                    style={{top:20}}
                    okText="完活"
                    cancelText="👴觉得不行"
                    onCancel={()=>{
                        this.setState({
                            showModel3:false
                        })
                    }}
                >
                    <span>成了啊</span>
                </Modal>
                <Modal 
                    title="React"
                    visible={this.state.showModel4}
                    wrapClassName="vertical-center-modal"
                    onCancel={()=>{
                        this.setState({
                            showModel4:false
                        })
                    }}
                >
                    <span>成了啊</span>
                </Modal>
            </div>
        );
    }
}

export default Model;
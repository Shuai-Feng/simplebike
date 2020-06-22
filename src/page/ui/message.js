import React, { Component } from 'react';
import {Card,Button,message} from 'antd';
import './ui.less'
class Message extends Component {
    showMessage = (type)=>{
        message[type]("恭喜你的react晋级成功")
    }
    render() {
        return (
            <div>
                <Card title="全局提示框" className="card-warp">
                    <Button type="primary" onClick={()=>this.showMessage("success")}>Success</Button>
                    <Button onClick={()=>this.showMessage("info")}>Info</Button>
                    <Button onClick={()=>this.showMessage("warning")}>Warning</Button>
                    <Button onClick={()=>this.showMessage("error")}>Error</Button>
                    <Button onClick={()=>this.showMessage("loading")}>Loading</Button>
                </Card> 
            </div>
        );
    }
}

export default Message;
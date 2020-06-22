import React, { Component } from 'react';
import {Card,Button, notification} from 'antd';
import './ui.less'
class Notic extends Component {
    openNotification(type,direction){
        if(direction){
            notification.config({
                placement:direction
            })
        }
        notification[type]({
            message:"发工资了",
            description:"上个月考勤22天"
        })
    }
    render() {
        return (
            <div>
                <Card title="通知提醒框" className="card-warp">
                    <Button type="primary" onClick={()=>this.openNotification('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info')}>Info</Button>
                </Card>
                <Card title="通知提醒框" className="card-warp">
                    <Button type="primary" onClick={()=>this.openNotification('success','topLeft')}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error','topRight')}>Error</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning','bottomLeft')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info','bottomRight')}>Info</Button>
                </Card>
            </div>
        );
    }
}

export default Notic;
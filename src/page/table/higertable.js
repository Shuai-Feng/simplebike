import React, { Component } from 'react';
import {Card,Table,Modal,message,Button,Badge} from 'antd';
import axios from 'axios';
// import Utils from '../../util/utils';
import '../../util/myMock'

class HighTable extends Component {
    state={
        dataSource:null
    }
    request(){
        axios.get('/wbbb').then(res=>{
            let dataSource = res.data.data;
            dataSource.map((item,index)=>{
                item.key=index;
                return item;
            })
            this.setState({
                dataSource
            })
        })
    }
    handleDelete = (item)=>{
        let id = item.id;
        Modal.confirm({
            title:"确认",
            content:"确认删除",
            onOk:()=>{
                message.success('删除成功',id);
            }
        })
    }
    componentDidMount(){
        this.request();
    }


    
    render() {
        const columns = [
            {
                title:"id",
                dataIndex:"id"
            },
            {
                title:"用户名",
                dataIndex:"userName"
            },
            {
                title:"性别",
                dataIndex:"sex"
            },
            {
                title:"状态",
                dataIndex:'state'
            },
            {
                title:'爱好',
                dataIndex:'interest'
            },
            {
                title:'生日',
                dataIndex:'birthday'
            },
            {
                title:'地址',
                dataIndex:'address'
            }
        ]
        const columns2 = [
            {
                title:"id",
                dataIndex:"id",
                key:'id',
                width:80
            },
            {
                title:"用户名",
                dataIndex:"userName",
                width:80
            },
            {
                title:"性别",
                dataIndex:"sex",
                width:80
            },
            {
                title:"状态",
                dataIndex:'state',
                width:80
            },
            {
                title:'爱好',
                dataIndex:'interest',
                width:80
            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:80
            }
        ]
        const columns3 = [
            {
                title:"id",
                dataIndex:"id"
            },
            {
                title:"用户名",
                dataIndex:"userName",
                // key:'userName',
                sorter:(a,b)=>{
                    return a.userName.length - b.userName.length;
                },
                sortDirections: ['descend', 'ascend']
            },
            {
                title:"性别",
                dataIndex:"sex"
            },
            {
                title:"状态",
                key:'state',
                dataIndex:'state',
                sorter:(a,b)=>{
                    return a.state - b.state
                },
                render:function(state){
                    let config = {
                        '1': <Badge status='success' text={'正常一个人'} />,
                        '2':<Badge status='success' text={'风华才子'} />,
                        '3':<Badge status='success' text={'北大才子'} />,
                        "4":<Badge status='success' text={'百度fe'} />,
                        '5':<Badge status='success' text={'创业者'} />
                    }
                    return config[state]
                }
            },
            {
                title:'爱好',
                dataIndex:'interest'
            },
            {
                title:'生日',
                dataIndex:'birthday'
            },
            {
                title:'操作',
                render:(text,item)=>{
                    return <Button onClick={()=>{this.handleDelete(item)}}>删除</Button>
                }
            }
        ]
        return (
            <div>
                <Card title="带筛选的小玩意">
                     <Table
                      columns={columns3}
                      dataSource={this.state.dataSource}
                      scroll={{x:1600}}
                      >

                     </Table>
                </Card>
                <Card title="侧栏固定">
                     <Table
                      columns={columns2}
                      dataSource={this.state.dataSource}
                      >

                     </Table>
                </Card>
                
                <Card title="表头固定">
                     <Table
                      columns={columns}
                      dataSource={this.state.dataSource}
                      scroll={{y:300}}
                      >

                     </Table>
                </Card>
              
            </div>
        );
    }
}

export default HighTable;
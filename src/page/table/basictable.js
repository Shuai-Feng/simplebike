import React, { Component } from 'react';
import {Card,Table, Modal, Button, message} from 'antd';
import axios from './../../axios';
import Utils from '../../util/utils';

class BasicTable extends Component {
    state={
        dataSource:null,
        dataSource1:null
    }
    request(){
       axios.ajax({
           url:"/tablelist",
           data:{
               params:{
                   page:1,
                   isShowLoading:true
               }
           }
       }).then(res=>{
           if(res.code === 0){
               this.setState({
                   dataSource1:res.result
               })
           }
       })
    }
    componentDidMount(){
        let _this = this;
        let dataSource = [
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-1-1',
                address:'背景',
                time:'20：00'
            },
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-1-1',
                address:'背景',
                time:'20：00'
            },
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-1-1',
                address:'背景',
                time:'20：00'
            },
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-1-1',
                address:'背景',
                time:'20：00'
            },
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-1-1',
                address:'背景',
                time:'20：00'
            }
        ];
        let Hdata = {
            result:{
                dataSource,
                "page":5,
                "page_size":100,
                "total":1000
            }
        }
        dataSource.map((item,index)=>{
            item.key=index;
            return item;
        })
        this.setState({
            dataSource,
            pagenation:Utils.pagenation(Hdata,(current)=>{
                _this.params.page = current;
            })
        })
        // this.request();
    }
    onRowClick(record,index){
        let selectKey=[index];
        Modal.info({
            title:"信息",
            content:`用户名${record.userName} ,用户爱好${record.interest}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectItem:record
        })
    }
    handleDelete(){
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item)=>{
            ids.push(item.id);
            return item;
        })
        Modal.confirm({
            title:"删除提示",
            content:`您确定要删除这些吗？${ids.join('、')}`,
            onOk:()=>{
                message.success('删除成功')
                this.setState({
                    selectedRowKeys:[],
                    selectedRows:null
                })
            }
        })
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
            },
            {
                title:'早期时间',
                dataIndex:"time"
            }
        ]
        const rowSelection = {
            type:"radio",
            selectedRowKeys:this.state.selectedRowKeys
        }
        const rowCheckSelection = {
            type:"Checkbox",
            selectedRowKeys:this.state.selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
                console.log(this.state)
            }
        }
        return (
            <div>
                <Card>
                     <Table
                      columns={columns}
                      dataSource={this.state.dataSource}
                      >

                     </Table>
                </Card>
                <Card title="动态mock数据表格">
                     <Table
                      columns={columns}
                      dataSource={this.state.dataSource1}
                      loading={!(this.state.dataSource1)}
                      >
                     </Table>
                </Card>
                <Card title="带了单选按钮的小玩意">
                     <Table
                      bordered
                      columns={columns}
                      dataSource={this.state.dataSource}
                      loading={!(this.state.dataSource)}
                      rowSelection={rowSelection}
                      onRow={(record,index)=>{
                          return {
                              onClick:()=>{
                                  this.onRowClick(record,index)
                              }
                          }
                      }}
                      >
                     </Table>
                </Card>
                <Card title="带了多选按钮的小玩意">
                    <div>
                        <Button onClick={()=>{this.handleDelete()}}>
                            删除
                        </Button>
                    </div>
                     <Table
                      bordered
                      columns={columns}
                      dataSource={this.state.dataSource}
                      loading={!(this.state.dataSource)}
                      rowSelection={rowCheckSelection}
                      >
                     </Table>
                </Card>
                <Card title="会分页的小玩意">
                     <Table
                      bordered
                      columns={columns}
                      dataSource={this.state.dataSource}
                      loading={!(this.state.dataSource)}
                      rowSelection={rowCheckSelection}
                      pagination={this.state.pagenation}
                      >
                     </Table>
                </Card>
            </div>
        );
    }
}

export default BasicTable;
import React, { Component } from 'react';
import { Card,Button,Table,Form, Select, DatePicker, Modal, message } from 'antd';  
import axios from '../../axios/index';
import Utils from '../../util/utils';
const Option = Select.Option;
const FormItem = Form.Item;

export default class Order extends Component {
    state  = {
       dataSource:[],
       orderInfo:{},
       orderConfirmVisble:false
    }
    params = {
        page:1
    }
    componentDidMount(){
        this.request();
    }

    request = ()=>{
        // let _this = this;
        axios.ajax({
            url:"/orderlist",
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            let _this = this;
            let list = res.result.item_list.map((item,index)=>{
                item.key = index;
                return item;
            });
            this.setState({
                dataSource:list,
                pagenation:Utils.pagenation(res,(current)=>{
                    console.log('c',current)
                    _this.params.page = current;
                    _this.request();
                })
            })
        })
    }

    handleConfirm=()=>{
        let item =  this.state.selectedItem;
        if(!item){
            message.warning('请选择结束的订单')
            return;
        }
        axios.ajax({
            url:"/order/bike_info",
            data:{
                params:{
                    order_id:item.id 
                }
            }
        }).then(res=>{
             if(res.code === 0){
                 this.setState({
                     orderInfo:res.result,
                     orderConfirmVisble:true
                 })
             }
        })
        this.setState({
            orderConfirmVisble:true
        }) 
    }
    handleFinishOrder = ()=>{

        axios.ajax({
            url:"/order/finish_order",
            data:{
                params:1
            }
        }).then(res=>{
             if(res.code === 0){
                 message.success('订单结束成功')
                 this.setState({
                     orderConfirmVisble:false
                 })
                 this.request(); 
             }
        })
    }
    openOrderDetail = ()=>{
        let item =  this.state.selectedItem;
        if(!item){
            message.warning('请选择结束的订单')
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }


    onRowClick = (record, index)=>{
        let selectKey = [index];
        console.log(selectKey)
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }
    render() {
        const columns = [
            {
                title:"订单编号",
                dataIndex:'order_sn'
            },
            {
                title:"车辆编号",
                dataIndex:'bike_sn'
            },{
                title:"用户名",
                dataIndex:"user_name"
            },{
                title:"手机号",
                dataIndex:"mobile"
            },{
                title:"里程",
                dataIndex:"distance",
                render(distance){
                    return distance/1000 +"km"
                }
            },{
                title:"行驶时长",
                dataIndex:"total_time"
            },{
                title:"状态",
                dataIndex:"status"
            },{
                title:"开始时间",
                dataIndex:"start_time"
            },{
                title:"结束时间",
                dataIndex:"end_time"
            },{
                title:"订单金额",
                dataIndex:"total_fee"
            },{
                title:"实付金额",
                dataIndex:"user_pay"           
            }
        ]
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type:"radio",
            selectedRowKeys
        }
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:10
            }
        }
        return (
            <div>
                <Card>
                    <FilterForm/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" style={{margin:"0px 10px"}} onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" onClick={this.handleConfirm }>结束订单</Button>
                </Card>
                <div className="content-warp">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        rowSelection={rowSelection}
                        pagination={this.state.pagenation}
                        onRow={(record,index)=>{
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            }
                        }}
 
                    >
                    </Table>
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    width={600}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisble:false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                >
                    <Form>
                        <FormItem label="车辆编号" {...formItemLayout}>{this.state.orderInfo.bike_sn}</FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>{this.state.orderInfo.battery}</FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>{this.state.orderInfo.start_time}</FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>{this.state.orderInfo.location}</FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}


class FilterForm extends React.Component {
    render(){
       const {getFieldDecorator} = this.props.form;
       return (
        <Form layout="inline">
            <FormItem label="城市">
                {
                    getFieldDecorator('city_id')(
                        <Select placeholder="请选择城市" style={{width:"80px"}}>
                            <Option value="1">背景</Option>
                            <Option value="2">石家庄</Option>
                            <Option value="3">河北</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem label="订单时间">
                {
                    getFieldDecorator('start_time')(
                       <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                    )
                }
            </FormItem>
            <FormItem label="">
                {
                    getFieldDecorator('end_time')(
                       <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                    )
                }
            </FormItem>
            <FormItem label="订单状态">
                {
                    getFieldDecorator('op_mode')(
                        <Select placeholder="全部" style={{width:"80px"}}>
                            <Option value="">全部</Option>
                            <Option value="1">进行中</Option>
                            <Option value="2">结束行程</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem>
                <Button type="primary" style={{margin:"0 20px"}}>查询</Button>
                <Button>重置</Button>
            </FormItem>
        </Form>
       )
    }
}
FilterForm = Form.create({})(FilterForm);
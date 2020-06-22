import React from 'react';
import FormItem from 'antd/lib/form/FormItem';
import {Card,Button,Table,Form, Select,Modal,message} from 'antd';
import axios from '../../axios/index';
import Utils from './../../util/utils';
const Option = Select.Option;
export default class City extends React.Component {
    state={
        list:[],
        isShowOpenCity:false
    }
    params = {
        page:1,
      
    }
    handleOpenCity = ()=>{
        this.setState({
            isShowOpenCity:true
        })
    }
    //城市开通
    handleSubmit = ()=>{
        let cityinfo = this.cityForm.props.form.getFieldsValue();
        axios.ajax({
            url:"/open_city",
            data:{
                params:cityinfo
            }
        }).then(res=>{
            if(res.code === '0'){
                message.success('开通成功');
                this.requestList();   
            }
        })
        this.setState({
            isShowOpenCity:false
        })
    }
    requestList(){
        let _this = this;
        axios.ajax({
            url:"/open_city",
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
           this.setState({
               list:res.result.item_list.map((item,index)=>{
                   item.key = index;
                   return item;
               }),
               pagination:Utils.pagenation(res,(current)=>{
                   _this.params.page = current;
                   _this.requestList();
               })
           })
        })
    }



    componentDidMount(){
        this.requestList();
    }
    render(){
        const columns = [
            {
                title:"城市ID",
                dataIndex:"id",
            },{
                title:"城市名称",
                dataIndex:"name"
            },{
                title:"用车模式",
                dataIndex:"mode",
            },{
                title:"授权加盟商",
                dataIndex:"franchisee_name"
            },{
                title:"城市管理员",
                dataIndex:"city_admins",
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name
                    }).join(',');
                }
            },{
                title:"城市开通时间",
                dataIndex:"open_time"
            },{
                title:"操作时间",
                dataIndex:"update_time"
            },{
                title:"操作人",
                dataIndex:"sys_user_name"
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm/>    
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className="content-warp">
                    <Table 
                    columns={columns}
                    dataSource={this.state.list}
                    />
                </div>
                <Modal
                 title="开通城市"
                 visible={this.state.isShowOpenCity}
                 onCancel={()=>{
                     this.setState({
                         isShowOpenCity:false
                     })
                 }}
                 onOk={this.handleSubmit}
                 >
                <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst }}/>
                </Modal>
            </div>
        )
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
            <FormItem label="用车模式">
                {
                    getFieldDecorator('model')(
                        <Select placeholder="全部" style={{width:"120px"}}>
                            <Option value="">全部</Option>
                            <Option value="1">指定点停车模式</Option>
                            <Option value="2">禁停区模式</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem label="营运模式">
                {
                    getFieldDecorator('op_mode')(
                        <Select placeholder="全部" style={{width:"80px"}}>
                            <Option value="">全部</Option>
                            <Option value="1">自营</Option>
                            <Option value="2">加盟</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem label="加盟商授权状态">
                {
                    getFieldDecorator('op_mode')(
                        <Select placeholder="全部" style={{width:"100px"}}>
                            <Option value="">全部</Option>
                            <Option value="1">已授权</Option>
                            <Option value="2">未授权</Option>
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

class OpenCityForm extends React.Component {
    
    render(){
        const FormItemLayout  = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:10
            }
        }
        const {getFieldDecorator} = this.props.form ;
        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...FormItemLayout}>
                {
                    getFieldDecorator('city_id',{
                        initialValue:"1"
                    })(
                        <Select placeholder="请选择城市" style={{width:"100px"}}>
                            <Option value="0">背景</Option>
                            <Option value="1">石家庄</Option>
                            <Option value="2">河北</Option>
                        </Select>
                    )
                }
                </FormItem>
                <FormItem label="运营模式" {...FormItemLayout}>
                {
                    getFieldDecorator('op_mode',{
                        initialValue:"1"
                    })(
                        <Select  style={{width:"100px"}}>
                            <Option value="1">自营</Option>
                            <Option value="2">加盟</Option>
                        </Select>
                    )
                }
                   
                </FormItem>
                <FormItem label="用车模式" {...FormItemLayout}>
                {
                    getFieldDecorator('use_mode',{
                        initialValue:"1"
                    })(
                        <Select  style={{width:"100px"}}>
                            <Option value="1">指定停车地点</Option>
                            <Option value="2">禁停区</Option>
                        </Select>
                    )
                }
                </FormItem>
            </Form>
        )
    }
}
OpenCityForm = Form.create({})(OpenCityForm);

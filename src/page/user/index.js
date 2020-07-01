import React from 'react';
import {Button,Card, Modal, Form, Input, Radio, Select, DatePicker} from 'antd';
import axios from './../../axios';
import Utils from '../../util/utils';
import BaseForm from '../../components/BaseForm';
import ETable from '../../components/ETable';
import moment from 'moment';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

export default class User extends React.Component {
    params = {
        page:1
    }
    state = {
        isVisible:false
    }
    formList = [
        {
            type:'INPUT',
            label:"用户名",
            field:'user_name',
            placeholder:'请输入用户名',
            width:140
        },{
            type:'INPUT',
            label:"手机号",
            field:'user_mobile',
            placeholder:'请输入手机号',
            width:130
        },{
            type:'DATEPICKER',
            label:'日期选择器',
            field:'user_data',
            placeholder:'请输入日期'
        }
    ]

    componentDidMount(){
        this.requestList();
    }
    handleFilter = (params)=>{
        this.params = params
        this.requestList();
    }
    hadleOperate = (type)=>{
        console.log(type)
        let item = this.state.selectedItem;
        if(type === 'create'){
            this.setState({
                type,
                isVisible:true,
                title:'创建员工'
            })
        
        }else if(type === 'edit'){
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"请选择一条数据"
                })
                return ;
            }
            this.setState({
                type,
                isVisible:true,
                title:'编辑员工',
                userInfo:item
            })
        }else if(type === 'detail'){
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"请选择一条数据"
                })
                return ;
            }
            this.setState({
                type,
                isVisible:true,
                title:'员工',
                userInfo:item
            })
        }else{
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"请选择一条数据"
                })
                return ;
            }
            Modal.confirm({
                title:'确认删除',
                content:'是否删除当前用户',
                onOk:()=>{
                    axios.ajax({
                        url:'/user/delete',
                        data:{
                            param:{
                                id:item.id
                            }
                        }
                    }).then(res=>{
                        if(res.code === 0 ){
                            this.setState({
                                isVisible:false
                            })
                        }
                        this.requestList();
                    })
                }
            })
        }
       
    }
    // commit the created Form
    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.UserForm.props.form.getFieldsValue();
        axios.ajax({
            url:type ==='create'?'/user/add':'/user/edit',
            data:{
                params:data
            }
        }).then(res=>{
            if(res.code === '0'){
                this.setState({
                    isVisible:false
                });
                this.requestList();
            }
        })

    }
    requestList = ()=>{
        axios.requestList(this,'/user/list',this.params,true);
    }
   

    render(){
        const columns = [
            {
                title:"用户id",
                dataIndex:'id'
            },{
                title:"用户名",
                dataIndex:'username'
            },{
                title:"性别",
                dataIndex:'sex',
                render(sex) {
                    return sex === 1?'男':'女'
                }
            },{
                title:"状态",
                dataIndex:'state',
                //this is a very lit way,boss
                render(state){
                    return {
                        '1':'咸鱼一条',
                        '2':'风华才子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }[state]
                }
            },{
                title:"爱好",
                dataIndex:'interest',
                render(state){
                    return {
                        '1':'跑步',
                        '2':'打篮球',
                        '3':'糕点烘培',
                        '4':'吃水果',
                        '5':'园艺',
                        '6':'陶艺',
                        '7':'搞黄色',
                        '8':'搞红色'
                    }[state]
                }
            },{
                title:"生日",
                dataIndex:'birthday'
            },{
                title:"联系地址",
                dataIndex:'address'
            },{
                title:"早起时间",
                dataIndex:'time'
            }
        ]
        let footer = {};
        if(this.state.type === 'detail'){
            footer = {
                footer:null
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}} className="operate-wrap">
                    <Button type="primary" icon='plus' onClick={()=>{this.hadleOperate('create')}}>创建员工</Button>
                    <Button type="primary" icon='edit' onClick={()=>this.hadleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" icon='plus' onClick={()=>this.hadleOperate('detail')}>员工详情</Button>
                    <Button type='danger' icon='delete' onClick={()=>this.hadleOperate('delete')}>删除员工</Button>
                    
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        rowSelection='radio'
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.UserForm.props.form.resetFields();
                        this.setState({
                            isVisible:false
                        })
                      
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst)=>{this.UserForm = inst}}/>
                </Modal>
            </div>
        )
    }
}

class UserForm extends React.Component {
    getState = (state)=>{
        return {
            '1':'咸鱼一条',
            '2':'风华才子',
            '3':'北大才子',
            '4':'百度FE',
            '5':'创业者'
        }[state]
    }
    render(){
        let {type,userInfo}  = this.props;
        if(userInfo || !(type ==='create')){
            userInfo = userInfo[0];
        }else{
            userInfo = {}
        }
   
        // let userInfo = this.props.userInfo;
        
        // let type = this.props.type;
        const { getFieldDecorator } =  this.props.form || {};
        const formlayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        return (
            <Form layout='horizontal'>
                <FormItem label="用户名" {...formlayout}>
                    {
                        type === 'detail'?userInfo.username:
                        getFieldDecorator('user_name',{
                            initialValue:userInfo.username||''
                        })(
                            <Input type='text' placeholder='请输入用户名' />
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formlayout}>
                    {
                         type === 'detail'?(userInfo.sex === 1 ?'男':'女'):
                        getFieldDecorator('sex',{
                            initialValue:userInfo.sex||''
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formlayout}>
                    {
                        type === 'detail'?this.getState(userInfo.state):
                        getFieldDecorator('state',{
                            initialValue:userInfo.state||''
                        })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>北大才子</Option>
                                <Option value={4}>百度FE</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formlayout}>
                    {
                         type === 'detail'?userInfo.birthday:
                        getFieldDecorator('birthday',{
                            initialValue:moment(userInfo.birthday)||''
                        })(
                            <DatePicker/>
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formlayout}>
                    {
                         type === 'detail'?userInfo.address:
                        getFieldDecorator('address',{
                            initialValue:userInfo.address||''
                        })(
                            <TextArea rows={3} placeholder='请输入联系地址'/>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

UserForm = Form.create({})(UserForm)
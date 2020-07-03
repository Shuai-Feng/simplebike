import React, { Component } from 'react';
import {Card,Button,Badge,Input,Select,Form,Modal,message,Tree,Transfer} from 'antd';
import ETable from './../../components/ETable';
import Utils from './../../util/utils';
import axios from '../../axios';
import menuConfig from './menuConfig';
import './style.less'
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

class Permison extends Component {
    state = {
        list:[],
        isRoleVisible:false,
        isPermVisible:false
    }
    //请求方法
    requestList = ()=>{
        axios.requestList(this,'/role/list',{});
    }
    //角色创建按钮
    handleRole = ()=>{
        this.setState({
            isRoleVisible:true
        })
    }
    //创建按钮请求提交
    handleRoleSubmit = ()=>{
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url:'/role/create',
            data:{
                param:data
            }
        }).then(res=>{
            if(['0',0].includes(res.code)){
                message.success('创建成功')
                this.setState({
                    isRoleVisible:false
                })
                this.requestList();
            }
        })
    }
    
    //设置权限按钮
    handleRolePermission = ()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'请选择一个角色'
            });
            return;
        }
        item = this.state.selectedItem[0] || {};
        this.setState({
            isPermVisible:true,
            detailInfo:item,
            menuInfo:item.menus
        })
    }
    //设置权限提交
    handlePermEditSubmit = ()=>{
        let data = this.permForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        axios.ajax({
            url:'/permision/edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then(res=>{
            if(res){
                this.setState({
                    isPermVisible:false
                }) 
                this.requestList();
            }
        })
    }

    
    //用户授权
    handleUserAuth = ()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'请选择一个角色'
            });
            return;
        }
        item = this.state.selectedItem[0] || {};
        this.setState({
            isUserVisible:true,
            detailInfo:item
        })
        this.getRoleUserList(item.id);

    }
    //获得用户列表
    getRoleUserList = (id)=>{
        axios.ajax({
            url:'/role/user_list',
            data:{
                param:{
                    id
                }
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    isUserVisible:true
                })
                this.getAuthUserList(res.result)
                
            }    
        })
    }
    //筛选用户
    getAuthUserList = (dataSource)=>{
        const mockData = [];
        const targetKeys = [];
        if(dataSource && dataSource.length > 0){
            for(let i=0;i<dataSource.length;i++){
                const data = {
                    key:dataSource[i].user_id,
                    title:dataSource[i].user_name,
                    status:dataSource[i].status
                }
                if(data.status === 1){
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            }
            this.setState({
                mockData,
                targetKeys
            })
        }
    }
    handleUserSubmit = ()=>{
        let  data = {};
        data.user_ids = this.state.targetKeys
        data.role_id = this.state.selectedItem[0].id;
        axios.ajax({
            url:'/role/user_role_edit',
            data:{
                params:{
                   ...data
                }
            }
        }).then(res=>{
            if(res){
                message.success('状态已更新')
                this.setState({
                    isUserVisible:false
                })
                this.requestList();
            }
        })
    }


    componentDidMount(){
        this.requestList()
    }
    render() {
        const columns = [
            {
                title:"角色Id",
                dataIndex:'id'
            },{
                title:"角色名称",
                dataIndex:'role_name'
            },{
                title:'创建时间',
                dataIndex:'create_time',
                render(time){
                    return Utils.formDate(time);
                }
            },{
                title:'使用状态',
                dataIndex:'status',
                render:(value)=>{
                    if(value === 1){
                        return  <Badge status="success" text="已启用"/>
                    }else{
                        return  <Badge status="warning" text="未启用" />
                    }
                }
            },{
                title:'创建时间',
                dataIndex:'authorize_time',
                render(time){
                    return Utils.formDate(time);
                }
            },{
                title:'授权人',
                dataIndex:'authorize_user_name'
            }
        ]
        return (
            <div>
                <Card>
                    <Button type="primary"  onClick={this.handleRole} style={{marginRight:10}}>创建角色</Button>
                    <Button type="primary"  onClick={this.handleRolePermission} style={{marginRight:10}}>设置权限</Button>
                    <Button type="primary"  onClick={this.handleUserAuth} >用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        dataSource={this.state.list}
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                    />
                </div>
                <Modal
                    title='创建角色'
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isRoleVisible:false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst)=>this.roleForm = inst}/>
                </Modal>
                <Modal
                    title='设置权限'
                    visible={this.state.isPermVisible}
                    onOk={this.handlePermEditSubmit}
                    onCancel={()=>{
                        this.setState({
                            isPermVisible:false
                        })
                    }}
                >
                    <PerEditForm 
                    wrappedComponentRef={(inst)=>this.permForm = inst}
                    detailInfo={this.state.detailInfo}
                    menuInfo={this.state.menuInfo}
                    patchMenuInfo={(checkedKeys)=>{
                        this.setState({
                            menuInfo:checkedKeys
                        })
                    }}
                    />
                </Modal>
                <Modal
                    title='用户授权'
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={()=>{
                        this.setState({
                            isUserVisible:false
                        })
                    }}
                >
                    <RoleAuthForm 
                        wrappedComponentRef={(inst)=>this.userAuthForm = inst}
                        detailInfo={this.state.detailInfo}
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        patchUserInfo={(targetKeys)=>{
                            this.setState({
                                targetKeys
                            })
                        }}
                    />  
                </Modal>
            </div>
        );
    }
}

export default Permison;

class RoleForm extends React.Component {
    render(){
        const { getFieldDecorator } =  this.props.form || {};
        const formlayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        return (
            <Form layout='horizontal'>
                <FormItem label="用户名" {...formlayout}>
                    {
                        getFieldDecorator('user_name',{
                            initialValue:''
                        })(
                            <Input type='text' placeholder='请输入用户名' />
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formlayout}>
                    {
                        getFieldDecorator('state',{
                            initialValue:1
                        })(
                            <Select>
                                <Option value={1}>启用</Option>
                                <Option value={0}>未启用</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

RoleForm = Form.create({})(RoleForm)

class PerEditForm extends React.Component {
    onCheck = (checkedKeys)=>{
        this.props.patchMenuInfo(checkedKeys)
    }
    renderTreeNodes = (data)=>{
        return  data.map(item=>{
            if(item.children){
                return <TreeNode title={item.title} key={item.key}>
                    {
                        this.renderTreeNodes(item.children)
                    }
                </TreeNode>
            }else{
                return <TreeNode title={item.title} key={item.key}/>
            }
        })
    }
    render(){
        const { getFieldDecorator } =  this.props.form || {};

        const formItemlayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        const detail_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        return (
            <Form layout="horizontal">
                <FormItem label='角色名称' {...formItemlayout}>
                    <Input disabled placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label='状态' {...formItemlayout}>
                   {
                       getFieldDecorator('status',{
                         initialValue:detail_info.status===1?'1':'0'
                       })(
                           <Select>
                               <Option value='1'>启用</Option>
                               <Option value='0'>未启用</Option>
                           </Select>
                       )
                   }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>{
                        this.onCheck(checkedKeys)
                    }}
                    checkedKeys={menuInfo}
                >
                   <TreeNode title="平台权限" key='platform_all'>
                        {
                            this.renderTreeNodes(menuConfig)
                        }
                   </TreeNode>
                </Tree>
            </Form>
        )
    }
}
PerEditForm = Form.create({})(PerEditForm)

class RoleAuthForm extends React.Component {

    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    };
    handleChange = (targetKeys)=>{
        this.props.patchUserInfo(targetKeys)
    }
    render(){
        // const { getFieldDecorator } =  this.props.form || {};
        
        
        const formItemlayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
       
        const detail_info = this.props.detailInfo;
        const targetKeys = this.props.targetKeys;
        const mockData = this.props.mockData;
  
        return (
            <Form layout="horizontal">
                <FormItem label='角色状态' {...formItemlayout}>
                    <Input disabled placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label='角色判断' {...formItemlayout}>
                   <Transfer
                        listStyle={{width:210,height:400}}
                        dataSource={mockData}
                        titles={['待选用户','已选用户']}
                        showSearch
                        filterOption={this.filterOption}
                        targetKeys={targetKeys}
                        render={item=>item.title}
                        onChange={this.handleChange}
                   />
                </FormItem>
            </Form>
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm)
import React from 'react';
import { Card,Form,Input,Button,message,Icon, Checkbox} from 'antd';
import './ui.less';

const FormItem = Form.Item;
 class FormLogin extends React.Component{
    handleSubmit = ()=>{
        let useInfo = this.props.form.getFieldsValue();
        console.log(useInfo)
        this.props.form.validateFields((err,values)=>{
            if(!err){
                message.success(`${useInfo.User_name}的 密码是${useInfo.User_password}`);
            }
        })
    }
    render(){
        const { getFieldDecorator } =  this.props.form;
        return (
            <div>
                <Card title="用于登录的行内表单" className="card-warp">
                    <Form layout="inline">
                        {/* <Col span={3}>
                            <FormItem>
                                <Input type="text" name="user.User_username" placeholder="请输入用户名"/>
                            </FormItem> 
                        </Col> */}
                        <FormItem>
                                <Input type="text"  placeholder="请输入用户名"/>
                        </FormItem>
                        <FormItem>
                            <Input type="password"  placeholder="请输入用户名"/>  
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登陆</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="用于登录的行内表单" style={{marginTop:10}}>
                    <Form layout="horizontal" style={{width:300}}>
                        {/* <Col span={3}>
                            <FormItem>
                                <Input type="text" name="user.User_username" placeholder="请输入用户名"/>
                            </FormItem>
                        </Col> */}
                        <FormItem>
                                {
                                    getFieldDecorator('User_name',{
                                        rules:[
                                            {
                                                required:true,
                                                message:'用户名不能为空'
                                            },{
                                              min:5,
                                              max:10,
                                              message:"长度不在范围内"  
                                            },{
                                                pattern:/^\w+$/g,
                                                message:"用户名必须为英文字母"
                                            }
                                        ]
                                    })(
                                        <Input type="text" prefix={<Icon type="user"/>}  placeholder="请输入用户名"/>
                                    )
                                }
                        </FormItem>
                        <FormItem>
                                {
                                    getFieldDecorator('User_password',{
                                        rules:[
                                            {
                                                required:true,
                                                message:'密码不为空'
                                            }
                                        ]
                                    })(
                                        <Input prefix={<Icon type="lock"/>} type="password"  placeholder="请输入用户名"/>
                                    )
                                }
                            
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember',{
                                    valuePropName:"checked",
                                    initialValue:true
                                })(
                                    <Checkbox >记住密码</Checkbox>
                                )
                            }
                            <a href="https://baidu.com" style={{float:"right"}}>忘记密码</a>
                        </FormItem>
                        <FormItem> 
                            <Button type="primary" onClick={this.handleSubmit}>登陆</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(FormLogin);
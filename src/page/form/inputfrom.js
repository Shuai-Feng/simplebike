import React, { Component } from 'react';
import { Form,Input} from 'antd';
const FormItem = Form.Item
class InputForm extends Component {
    render() {
        //通过getFieldDecorator进行双向数据绑定修饰
        const { getFieldDecorator } =  this.props.form;
        return (
            <div>
                <Form>
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
                </Form>
            </div>
        );
    }
}

export default Form.create()(InputForm);
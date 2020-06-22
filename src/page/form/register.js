import React from 'react';
import {Card,Form,Button,Icon,Input,Checkbox,Radio,Select,Switch,InputNumber,DatePicker,Upload,message} from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea ;   
class FormRegister extends React.Component {
    state={
        imageUrl:null
    }
    handleSubmit = ()=>{
        let useInfo = this.props.form.getFieldsValue();
        console.log(useInfo)
        this.props.form.validateFields((err,values)=>{
            if(!err){
                console.log(JSON.stringify(useInfo));
                message.success(`${useInfo.User_name}的 密码是${useInfo.User_password}`);
            }
        })
    }
    getBase64 = (img, callback) =>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = info => {
        console.log(info.file);
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>{
            this.setState({
              imageUrl,
              loading: false,
            })},
          );
        }
      }
    render(){
        const Option = Select.Option
        const { getFieldDecorator } =  this.props.form;
        let useInfo = this.props.form.getFieldsValue();
        console.log(useInfo);
        // Boss,may be you can use this methods to manage layouts in other project
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:20
            }
        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        // const uploadprops = {
        //     name: 'file',
        //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        //     headers: {
        //       authorization: 'authorization-text',
        //     },
        //     onChange(info) {
        //       if (info.file.status !== 'uploading') {
        //         console.log(info.file, info.fileList);
        //       }
        //       if (info.file.status === 'done') {
        //         message.success(`${info.file.name} file uploaded successfully`);
        //       } else if (info.file.status === 'error') {
        //         message.error(`${info.file.name} file upload failed.`);
        //       }
        //     },
        // }

        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                        <FormItem label="用户名" {...formItemLayout}>
                        {
                            getFieldDecorator('User_name',{
                                rules:[
                                    {
                                        required:true,
                                        message:'用户名不为空'
                                    }
                                ]
                            })(
                                <Input prefix={<Icon type="user"/>} type="text"  placeholder="请输入用户名"/>
                            )
                        }
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                        {
                            getFieldDecorator('User_password',{
                                rules:[
                                    {
                                        required:true,
                                        message:'密码不为空'
                                    }
                                ]
                            })(
                                <Input prefix={<Icon type="lock"/>} type="text"  placeholder="请输入密码"/>
                            )
                        }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                        {
                            getFieldDecorator('sex',{
                                initialValue:"1",
                                rules:[
                                    {
                                        required:true,
                                        message:'必须选择性别'
                                    }
                                ]
                            })(
                              <RadioGroup>
                                <Radio value="1">男</Radio>
                                <Radio value="2">女</Radio>
                              </RadioGroup>
                            )
                        }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                        {
                            getFieldDecorator('age',{
                                initialValue:18,
                                rules:[
                                    {
                                        required:true,
                                        message:'年龄不能为空'
                                    }
                                ]
                            })(
                              <InputNumber></InputNumber>
                            )
                        }
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                        {
                            getFieldDecorator('state',{
                                initialValue:"LV1",
                                rules:[
                                    {
                                        required:true,
                                        message:'年龄不能为空'
                                    }
                                ]
                            })(
                                <Select>
                                    <Option  key="LV1">LV1</Option>
                                    <Option  key="LV2">LV2</Option>
                                    <Option  key="LV3">LV3</Option>
                                    <Option  key="LV4">LV4</Option>
                                </Select>
                            )
                        }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                        {
                            getFieldDecorator('hoby',{
                                initialValue:["打篮球","看书"],
                                rules:[
                                    {
                                        required:true,
                                        message:'年龄不能为空'
                                    }
                                ]
                            })(
                                <Select mode="multiple">
                                    <Option  key="打篮球">打篮球</Option>
                                    <Option  key="看书">看书</Option>
                                    <Option  key="RS级电影">RS级电影</Option>
                                    <Option  key="看恐怖片">看恐怖片</Option>
                                    <Option  key="吃人">吃人</Option>
                                    <Option  key="搞黄色">搞黄色</Option>
                                </Select>
                            )
                        }
                        </FormItem>
                        <FormItem label="婚否" {...formItemLayout}>
                        {
                            getFieldDecorator('marrage',{
                                valuePropName:"checked",
                                initialValue:true,   
                                rules:[
                                    {
                                        required:true,
                                    }
                                ]
                            })(
                                <Switch></Switch>
                            )
                        }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday',{
                                    initialValue:moment('2018-08-08 11:11:11')
                                })(<DatePicker
                                    showTime
                                    format="YYYY-MM-DD hh:mm:ss"
                                />)
                            }
                        </FormItem>
                        <FormItem label="练习地址" {...formItemLayout}>
                            {
                                getFieldDecorator('addredss',{
                                    rules:[
                                        {
                                            required:true,
                                            message:'联系地址'
                                        }
                                    ]
                                })(
                                    <TextArea
                                        autoSize={{minRows:4,maxRow:6}}
                                    />
                                )
                            }
                        </FormItem> 
                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('useImg')(
                                    <Upload 
                                            listType="picture-card"
                                            showUploadList={false}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            onChange={this.handleChange}

                                    >
                                        {this.state.imageUrl?<img src={this.state.imageUrl} alt=""/>:<Icon type="plus"/>}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem   {...offsetLayout}>
                            {
                                getFieldDecorator('agree')(
                                    <Checkbox>我已经阅读过<a href="https://baidu.com">布里特安防公司协议 </a></Checkbox>
                                )
                            }
                        </FormItem> 
                        <FormItem   {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(FormRegister);

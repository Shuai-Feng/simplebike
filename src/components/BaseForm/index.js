import React from 'react'
import { Input,Select,Form,Button,Checkbox,DatePicker} from 'antd';
import  Utils  from '../../util/utils';

const FormItem = Form.Item
// const Option = Select.Option

 
class BaseForm extends React.Component{
    state = {
        formList:""
    }
    handleFilterSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }
    initFormList = ()=>{
        
        const { getFieldDecorator } = this.props.form;
        const formList  = this.props.formList;
        const formItemList = [];
        
        if( formList && formList.length>0 ){
            formList.forEach((item,i)=>{
                let label = item.label;
                let field = item.field
                let initialValue = item.initialValue || ''
                let palceholder = item.placeholder
                let width = item.width
                if(item.type === '城市'){
                    const CITY  =  <FormItem label="城市选择" key={field}>
                    {
                        getFieldDecorator('city',{
                            initialValue:'0'
                        })(
                            <Select
                             placeholder={palceholder}
                             style={{width:80}}
                             >
                                {Utils.getOptionList([
                                    {id:'0',name:'全部'},
                                    {id:'1',name:'北京'},
                                    {id:'2',name:'上海'},
                                    {id:'3',name:'天津'},
                                    {id:'4',name:'杭州'},
                                ])}
                            </Select>
                        )
                    }
                    </FormItem>
                    formItemList.push(CITY);
                }else if(item.type === '时间查询'){
                    const begin_time  =  <FormItem label="订单时间" key={field+'_begin'}>
                        {
                            getFieldDecorator('begin_time')(
                                <DatePicker  showTime={true} placeholder={palceholder} format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>
                    formItemList.push(begin_time);
                    const end_time  =  <FormItem label="~" colon={false} key={field+'_end'}>
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker showTime={true} placeholder={palceholder} format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>
                    formItemList.push(end_time);
                }else if(item.type === 'INPUT'){
                    const INPUT =<FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field,{
                                initialValue:initialValue,
                            })(
                                <Input type="text" placeholder={palceholder}/>
                            )
                        }
                    </FormItem>
                    formItemList.push(INPUT);
                }else  if(item.type === 'SELECT' ){
                    console.log([field])
                    const SELECT =<FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field,{
                                initialValue:initialValue,
                            })(
                                <Select placeholder={palceholder} style={{width:width}}>
                                    {Utils.getOptionList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>
                    formItemList.push(SELECT);
                } else if(item.type === 'CHECKBOX' ){
                    const CHECKBOX =<FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                valuePropName:'checked',
                                initialValue:initialValue,
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>
                      formItemList.push(CHECKBOX);
                } else if(item.type === 'DATEPICKER' ){
                    const DATEPICKER =<FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field])(
                                <DatePicker showTime={true} placeholder={palceholder} format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>
                      formItemList.push(DATEPICKER);
                }
            })
        }
        return formItemList;
    }
    render(){
        
      return (
          <Form layout="inline">
              {
                this.initFormList()
              }
              <FormItem >
                <Button type="primary" style={{margin:"0 20px"}} onClick={this.handleFilterSubmit}>查询</Button>
                <Button onClick={this.reset}>重置</Button>
              </FormItem>
          </Form>
      )
    }
}
export default BaseForm = Form.create({})(BaseForm)
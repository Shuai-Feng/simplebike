import JsonP from 'jsonp';
import axios from 'axios';
import { Modal,message } from 'antd';
export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status === 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    }
    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading !==false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseURL ;
        if(options.isMock){
            baseURL = "https://www.fastmock.site/mock/cc1a61c8ea14b1c8ae0775b75ca1d29e/cheche";
        }else{
            baseURL = "https://www.fastmock.site/mock/cc1a61c8ea14b1c8ae0775b75ca1d29e/cheche";
        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:"get",
                baseURL:baseURL,
                timeout:5000,
                params:(options.data && options.data.params)||''
            }).then(response=>{
                if(response.status === 200){
                    let res = response.data;
                    if(res.code === "0"){
                        resolve(res)
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
                loading.style.display = 'none';
            }).catch(err=>{
                message.error(err.message);
                loading.style.display = 'none';
            })
        })
    }
    static requestList(_this,url,params,isMock){
        var data = {
            params,
            isMock
        }
        this.ajax({
            url,
            data
        }).then((data)=>{
            if(data && data.result){
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list
                })
            }
        })
    }
}
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
        let baseURL = "https://www.fastmock.site/mock/cc1a61c8ea14b1c8ae0775b75ca1d29e/cheche";
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
    static ajax2(options){
        let loading;
        if(options.data && options.data.isShowLoading !==false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseURL = "https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api";
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
                        loading.style.display = 'none';
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                        loading.style.display = 'none';
                    }
                }else{
                    reject(response.data);
                    loading.style.display = 'none';
                }
            })
        })
    }
}
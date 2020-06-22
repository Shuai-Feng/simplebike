export default {
    formDate(time){
        if(!time) return '';
        let data = new Date(time);
        let _year = data.getFullYear()+"-";
        let _month = (data.getMonth()+1)+"-";
        let _date = data.getDate()+' ';
        let _hour = data.getHours()<10?'0'+data.getHours():data.getHours();
        let _minute = data.getMinutes()<10?'0'+data.getMinutes():data.getMinutes();
        let _second = data.getSeconds()<10?'0'+data.getSeconds():data.getSeconds();
        return _year+_month+_date+_hour+':'+_minute+':'+_second+' ';
    },
    pagenation(data,callback){
        let page = {
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total_count:data.result.total_count,
            showTotal:()=>{
                return `共${data.result.total_count}条`
            },
            showQuickJumper:true
        }
        return page;
    }
}




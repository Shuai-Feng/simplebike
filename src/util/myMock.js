import Mock from 'mockjs';

Mock.mock('/wbbb',{
    'data|20'
    :[{
        "id|+1":1,
        "userName":"@name",
        "sex|1":['male','female'],
        "state|1-5":1,
        'interest|1':['mage','warrior','rouge'],
        'birthday|1':"2020-12-2",
        'address|1':"addd"
    }]
});
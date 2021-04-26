import request from '../utils/request';
//所有的向api的请求在这里写



//fetchData是以query为参数的函数，将请求参数作为参数，返回请求api的结果
export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        //这里是调用地传递过来的参数列表
        params: query
    });
};
//判断管理员登录是否成功，参数为ID和密码，返回"success"或“error”
export const managerLogin = query =>{
    return request({
        url:'managerLogin',
        method:'get',
        params:query
    });
};
//获取管理员数据，请求参数managerId
export const managerData = query=>{
    return request({
        url:'getManagerData',
        method:'get',
        params:query
    });
};



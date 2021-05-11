import request from 'utils/request';
//所有的向api的请求在这里写

//获取实体类别
export const getEntityType = () => {
    return request({
        url: `/admin/getEntityType`,
        method: 'get'
    })
};

//获取关系类别
export const getRelationsType = () => {
    return request({
        url: `/admin/getRelationsType`,
        method: 'get'
    })
};

//保存流程图json
export const serviceFlowSave = data => {
    return request({
        url: `/admin/save`,
        method: 'post',
        data: data // params 是用于添加到 url 上的参数
    })
};

//通过大概的身体部位获得详细的身体部位
export const getDetailBodyArea = data => {
    return request({
        url: `/3D/getDetailBody/${data}`,
        method: 'get'
    })
};

//通过详细的身体部位获得对应部位的症状
export const getBodySymptoms = data => {
    return request({
        url: `/3D/getBodySymptom/${data}`,
        method: 'get'
    })
};

//--------原有系统业务------------
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
export const managerLogin = data =>{
    return request({
        url:'/admin/login',
        method:'post',
        data: data
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



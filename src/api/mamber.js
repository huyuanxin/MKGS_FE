import request from '../utils/request'

export default {

//会员登录，参数memberId，返回200
loginMember(query){
    return request({
        url:'loginMember',
        method:'get',
        params:query
    });
},
}

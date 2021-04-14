import request from '@/utils/request'

export function getAnswer(params) {
  return request({
    url: `question?input=${params}`,
    method: 'get'
  })
}

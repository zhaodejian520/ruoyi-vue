import request from '@/utils/request'

// 查询在线用户列表
export function list(query) {
  return request({
    url: '/monitor/online/list',
    method: 'get',
    params: query
  })
}

// 强退用户
export function forceLogout(tokenId) {
  return request({
    url: '/monitor/online/' + tokenId,
    method: 'delete'
  })
}



export function findAll(query) {
  return request({
    url: '/productinfo/list',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getProductId(productid) {
  return request({
    url: '/productinfo/' + productid,
    method: 'get'
  })
}

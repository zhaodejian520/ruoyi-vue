import request from '@/utils/request'



// 查询文件信息列表
export function listInfo(query) {
  return request({
    url: '/shopping/goods/list',
    method: 'get',
    params: query
  })
}

// 查询文件信息详细
export function getInfo(productId) {
  return request({
    url: '/shopping/goods/' + productId,
    method: 'get'
  })
}


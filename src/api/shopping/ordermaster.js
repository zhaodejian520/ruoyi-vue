import request from '@/utils/request'


// 查询文件信息列表  listInfo, getInfo, exportInfo
export function listInfo(query) {
  return request({
    url: '/shopping/ordermaster/list',
    method: 'get',
    params: query
  })
}

// 查询文件信息详细
export function getInfo(productId) {
  return request({
    url: '/shopping/ordermaster/getInfoPid/' + productId,
    method: 'get'
  })
}

export function exportInfo(query) {
  return request({
    url: '/shopping/ordermaster/export',
    method: 'get',
    params: query
  })
}





// 以下是 商品分类的******************************************
export function listInfoPc(query) {
  return request({
    url: '/shopping/ordermaster/listpc',
    method: 'get',
    params: query
  })
}

// 查询文件信息详细
export function getInfoPc(categoryId) {
  return request({
    url: '/shopping/ordermaster/' + categoryId,
    method: 'get'
  })
}


// 以下是 商品信息的**********************************************

export function listInfopi(query) {
  return request({
    url: '/shopping/ordermaster/listpi',
    method: 'get',
    params: query
  })
}

export function listInfopiTwo(query) {
  return request({
    url: '/shopping/ordermaster/listpiTwo',
    method: 'get',
    params: query
  })
}


export function getInfopi(categoryId) {
  return request({
    url: '/shopping/ordermaster/getInfopi/' + categoryId,
    method: 'get'
  })
}


// 以下是  订单的*****************************************************

export function listInfodd(query) {
  return request({
    url: '/shopping/ordermaster/listdd',
    method: 'get',
    params: query
  })
}


export function getInfodd(orderId) {
  return request({
    url: '/shopping/ordermaster/getInfodd/' + orderId,
    method: 'get'
  })
}







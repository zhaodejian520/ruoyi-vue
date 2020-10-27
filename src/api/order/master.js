import request from '@/utils/request'

//**************  商品表 接口

// 查询商品信息列表
export function productlist(query) {
  return request({
    url: '/order/master/productlist',
    method: 'get',
    params: query
  })
}

// 查询商品信息详细
export function productlistbyid(productId) {
  return request({
    url: '/order/master/' + productId,
    method: 'get'
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(productName) {
  return request({
    url: '/order/master/type/' + productName,
    method: 'get'
  })
}


//**************  共应商 接口
// 查询供应商列表
export function listSupper(query) {
  return request({
    url: '/order/master/supplierlist',
    method: 'get',
    params: query
  })
}

export function selectSuppTypeById(supplierId) {
  return request({
    url: '/order/master/' + supplierId,
    method: 'get'
  })
}

// *****************  订单主表 接口
// 查询订单主列表
export function listMaster(query) {
  return request({
    url: '/order/master/list',
    method: 'get',
    params: query
  })
}

// 查询订单主详细
export function getMaster(orderId) {
  return request({
    url: '/order/master/' + orderId,
    method: 'get'
  })
}




// 导出订单主
export function exportMaster(query) {
  return request({
    url: '/order/master/export',
    method: 'get',
    params: query
  })
}


// 新增订单主
export function addMaster(data) {
  return request({
    url: '/system/master',
    method: 'post',
    data: data
  })
}

// 修改订单主
export function updateMaster(data) {
  return request({
    url: '/system/master',
    method: 'put',
    data: data
  })
}

// 删除订单主
export function delMaster(orderId) {
  return request({
    url: '/system/master/' + orderId,
    method: 'delete'
  })
}

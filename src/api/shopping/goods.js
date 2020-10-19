import request from '@/utils/request'


// export const findAll list(data) {
//     return axios.request({
//         url: "productinfo/findAll",
//         method: "post",
//         data:data
//     })
// }

export function findAll(data) {
  return request({
    url: '/productinfo/findAll',
    method: 'post',
    data: data
  })
}

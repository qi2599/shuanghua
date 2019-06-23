// 与后台交互模块
import ajax from './ajax'
export const queryWapBar = () => ajax('prod/getWapBars')
export const queryClass = (queryData) => ajax('prod/queryClass', queryData)
export const queryGoods = (queryData) => ajax('prod/query', queryData)
export const getHomeGoods = () => ajax('prod/getIndexProducts')
export const queryDetail = (queryData) => ajax('prod/queryById', queryData)
export const queryHotSearch = () => ajax('busi/log/queryHot')
export const queryLogin = (queryData) => ajax('cust/login', queryData)
export const queryAddCar = (queryData) => ajax('cart/add',queryData)
export const queryCarNum = (queryData) => ajax('cart/querySumProduct', queryData)
export const queryLogout = (queryData) => ajax('cust/logout',queryData)
export const queryCar = (queryData) => ajax('cart/query',queryData)
export const queryDelCar = (queryData) => ajax('cart/del',queryData)
export const queryUpdata = (queryData) => ajax('cart/update',queryData)
export const queryAuthCode = (queryData) => ajax('other/verifyImageCode',queryData)
export const queryRegister = (queryData) => ajax('cust/regist',queryData)
export const queryCustVirtual = (queryData) => ajax('cust/getCustVirtual',queryData)


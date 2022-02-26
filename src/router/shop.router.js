const Router = require('koa-router')

const {
    verifyUpdateShop,
    dealData,
    verifyGetOrders
} = require('../middleware/shop.middlewar')

const {
    getClassify,
    shopExist,
    hasShop,
    getSelfShop,
    updateShop,
    updateActivities,
    getOrdersToday,
    getOrdersAll,
    getBill,
    getSold,
    getMapData,
    getshopEvaluates
} = require('../controller/shop.controller')

const { verifyToken } = require('../middleware/common.middleware')


const shopRouter = new Router({ prefix: '/api/shop' })


// 获取店铺分类
shopRouter.get('/get_classify', verifyToken, getClassify)
// 查询店铺名是否被注册
shopRouter.post('/shop_exist', verifyToken, shopExist)
// 查询用户是否已经注册过店铺
shopRouter.get('/has_shop', verifyToken, hasShop)
// 获取个人店铺信息
shopRouter.get('/info', verifyToken, getSelfShop)
// 更新除了活动外的店铺信息
shopRouter.post('/update', verifyToken, verifyUpdateShop, dealData, updateShop)
// 更新店铺活动
shopRouter.post('/update/activities', verifyToken, verifyUpdateShop, updateActivities)
// 查询店铺今日订单
shopRouter.get('/orders/today', verifyToken, verifyGetOrders, getOrdersToday)
// 查询店铺所有订单
shopRouter.get('/orders/all', verifyToken, verifyGetOrders, getOrdersAll)
// 流水相关的数据 => 做图标用
shopRouter.get('/bill', verifyToken, verifyGetOrders, getBill)
// 获取店铺食品的已售数量
shopRouter.get('/sold', verifyToken, verifyGetOrders, getSold)
// 获取订单地点数量分布
shopRouter.get('/map_data', verifyToken, verifyGetOrders, getMapData)
// 获取店铺评价
shopRouter.post('/evaluates', getshopEvaluates)



module.exports = shopRouter
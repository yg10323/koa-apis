const Router = require('koa-router')


const {
    getShopClassify,
    getShopAll,
    getFoodAll,
    getShopByOpId,
    getShopById
} = require('../controller/front.controller')


const frontRouter = new Router({ prefix: '/api/front' })

// 获取店铺分类
frontRouter.get('/shop/classify', getShopClassify)
// 获取全部店铺
frontRouter.get('/shop/all', getShopAll)
// 根据店铺id获取店铺
frontRouter.post('/shop/by_id', getShopById)
// 获取食品信息
frontRouter.post('/shop/food', getFoodAll)
// 根据一级分类获取全部店铺
frontRouter.post('/shop/all/op_id', getShopByOpId)



module.exports = frontRouter

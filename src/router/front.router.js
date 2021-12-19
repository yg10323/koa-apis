const Router = require('koa-router')


const {
    getShopClassify,
    getShopAll,
    getFoodAll
} = require('../controller/front.controller')


const frontRouter = new Router({ prefix: '/api/front' })

// 获取店铺分类
frontRouter.get('/shop/classify', getShopClassify)
// 获取全部店铺
frontRouter.get('/shop/all', getShopAll)
// 获取食品信息
frontRouter.post('/shop/food', getFoodAll)




module.exports = frontRouter

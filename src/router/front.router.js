const Router = require('koa-router')


const {
    getShopClassify,
    getShopAll
} = require('../controller/front.controller')


const frontRouter = new Router({ prefix: '/api/front' })

// 获取店铺分类
frontRouter.get('/shop/classify', getShopClassify)
// 获取全部店铺
frontRouter.get('/shop/all', getShopAll)


module.exports = frontRouter

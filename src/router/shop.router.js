const Router = require('koa-router')

const {
    getClassify,
    shopExist,
    hasShop
} = require('../controller/shop.controller')

const { verifyToken } = require('../middleware/common.middleware')


const shopRouter = new Router({ prefix: '/api/shop' })


// 获取店铺分类
shopRouter.get('/get_classify', verifyToken, getClassify)
// 查询店铺名是否被注册
shopRouter.post('/shop_exist', verifyToken, shopExist)
// 查询用户是否已经注册过店铺
shopRouter.get('/has_shop', verifyToken, hasShop)


module.exports = shopRouter
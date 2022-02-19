const Router = require('koa-router')

const {
    verifyRegister,
    verifyLogin,
    verifySelfInfo
} = require('../middleware/buyer.middleware')

const {
    reigster,
    login,
    purchase,
    updateAddress,
    getOrder,
    evaluate
} = require('../controller/buyer.controller')

const { verifyToken } = require('../middleware/common.middleware')


const buyerRouter = new Router({ prefix: '/api/buyer' })

// 注册
buyerRouter.post('/register', verifyRegister, reigster)
// 登录
buyerRouter.post('/login', verifyLogin, login)
// 购买食品
buyerRouter.post('/purchase', verifyToken, verifySelfInfo, purchase)
// 更新收货信息
buyerRouter.post('/update/address', verifyToken, updateAddress)
// 获取订单
buyerRouter.get('/order', verifyToken, getOrder)
// 评价订单  未做校验
buyerRouter.post('/evaluate', verifyToken, evaluate)



module.exports = buyerRouter


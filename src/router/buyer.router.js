const Router = require('koa-router')

const {
    verifyRegister,
    verifyLogin,
    verifySelfInfo
} = require('../middleware/buyer.middleware')

const {
    reigster,
    login,
    purchase
} = require('../controller/buyer.controller')

const { verifyToken } = require('../middleware/common.middleware')


const buyerRouter = new Router({ prefix: '/api/buyer' })

// 注册
buyerRouter.post('/register', verifyRegister, reigster)
// 登录
buyerRouter.post('/login', verifyLogin, login)
// 购买食品
buyerRouter.post('/purchase', verifyToken, verifySelfInfo, purchase)




module.exports = buyerRouter


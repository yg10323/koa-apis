const Router = require('koa-router')
const {
    verifyRegister,
    verifyLogin
} = require('../middleware/seller.middleware')
const {
    register,
    login
} = require('../controller/seller.controller')
const { verifyToken } = require('../middleware/common.middleware')


const sellerRouter = new Router({ prefix: '/api/seller' })

// test
sellerRouter.get('/', verifyToken, (ctx, next) => {
    ctx.body = ctx.user
})

// 注册
sellerRouter.post('/register', verifyRegister, register)
// 登录
sellerRouter.post('/login', verifyLogin, login)


module.exports = sellerRouter
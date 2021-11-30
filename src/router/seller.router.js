const Router = require('koa-router')
const {
    verifyRegister,
    verifyLogin,
    verifyScanLogin
} = require('../middleware/seller.middleware')
const {
    register,
    login,
    saveDeviceId,
    scanLogin
} = require('../controller/seller.controller')
const { verifyToken } = require('../middleware/common.middleware')


const sellerRouter = new Router({ prefix: '/api/seller' })

// test
sellerRouter.get('/', verifyToken, (ctx, next) => {
    // console.log(11111111);
    ctx.body = ctx.user
})

// 注册
sellerRouter.post('/register', verifyRegister, register)
// 登录
sellerRouter.post('/login', verifyLogin, login)
// 保存app扫码后发送的device_id
sellerRouter.post('/send_deviceid', saveDeviceId)
// 扫码登录
sellerRouter.post('/scan_login', verifyScanLogin, scanLogin)

module.exports = sellerRouter
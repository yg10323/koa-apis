const Router = require('koa-router')
const {
    verifyRegister,
    verifyLogin,
    verifyScanLogin,
    verifyRealName,
    verifyCreateShop,
    dealData,
    verifyUasble
} = require('../middleware/seller.middleware')
const {
    register,
    login,
    saveDeviceId,
    scanLogin,
    createShop,
    getSelfInfo,
    updateAuthInfo
} = require('../controller/seller.controller')
const { verifyToken } = require('../middleware/common.middleware')



const sellerRouter = new Router({ prefix: '/api/seller' })


// 注册
sellerRouter.post('/register', verifyRegister, register)
// 登录
sellerRouter.post('/login', verifyLogin, verifyUasble, login)
// 保存app扫码后发送的device_id
sellerRouter.post('/send_deviceid', saveDeviceId)
// 扫码登录
sellerRouter.post('/scan_login', verifyScanLogin, verifyUasble, scanLogin)
// 查询实名状态
sellerRouter.get('/get_real_name', verifyToken, verifyRealName)
// 注册店铺
sellerRouter.post('/create_shop', verifyToken, verifyCreateShop, dealData, createShop)
// 获取个人信息
sellerRouter.get('/self_info', verifyToken, getSelfInfo)
// 更新实名信息
sellerRouter.post('/update/auth', verifyToken, updateAuthInfo)

module.exports = sellerRouter
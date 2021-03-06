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
    updateAuthInfo,
    deleteSelf,
    postFeedBack,
    getMyFeedback,
    replyEvaluate
} = require('../controller/seller.controller')
const { verifyToken } = require('../middleware/common.middleware')
const { dealAddData } = require('../middleware/role.middleware')
const { addData } = require('../controller/role.controller')

const sellerRouter = new Router({ prefix: '/api/seller' })


// 注册
sellerRouter.post('/register', verifyRegister, register)
// 登录
sellerRouter.post('/login', verifyLogin, verifyUasble, login)
// 找回密码 
// TODO
sellerRouter.post('/update/password')
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
// 注销账号 => 数据库联动将店铺一块删除
sellerRouter.delete('/delete', verifyToken, deleteSelf)
// 工单反馈
sellerRouter.post('/feedback/post', verifyToken, postFeedBack)
// 获取我的工单
sellerRouter.get('/feedback/self', verifyToken, getMyFeedback)
// 回复工单
sellerRouter.post('/feedback/reply', verifyToken, dealAddData, addData)
// 回复用户的订单评价
sellerRouter.post('/evaluate/reply', verifyToken, replyEvaluate)

module.exports = sellerRouter
const Router = require('koa-router')

const {
    verifyUser,
    verifyAdmin,
    verifyLogin,
    verifyRegister,
    verifyAdminLevel,
    dealQueryData,
    dealAddData
} = require('../middleware/role.middleware')
const {
    getMenu,
    login,
    register,
    deleteAdminById,
    deleteSellerById,
    deleteBuyerById,
    getDataByQuery,
    changeUserUsable,
    addData,
    changeShopUsable,
    deleteShopById,
    changeOrderUsable
} = require('../controller/role.controller')

const { verifyToken } = require('../middleware/common.middleware')


const roleRouter = new Router({ prefix: '/api/role' })

// 获取role_id为2的角色对应的菜单
roleRouter.get('/2/menu', verifyToken, verifyUser, getMenu)
// 获取role_id为1的角色对应的菜单
roleRouter.get('/1/menu', verifyToken, verifyAdmin, getMenu)
// admin登录
roleRouter.post('/login', verifyLogin, login)
// admin注册
roleRouter.post('/register', verifyRegister, register)
// 根据id删除admin
roleRouter.post('/admin/delete', verifyToken, verifyAdminLevel, deleteAdminById)
// 根据id删除seller
roleRouter.post('/seller/delete', verifyToken, verifyAdmin, deleteSellerById)
// 根据id删除buyer
roleRouter.post('/buyer/delete', verifyToken, verifyAdmin, deleteBuyerById)
// 根据query获取admin/seller/buyer
roleRouter.post('/user/by_query', verifyToken, verifyAdmin, dealQueryData, getDataByQuery)
// 更改user的usable
roleRouter.post('/user/usable', verifyToken, verifyAdmin, changeUserUsable)
// 添加user
roleRouter.post('/user/add', verifyToken, verifyAdmin, dealAddData, addData)
// 获取店铺信息
roleRouter.post('/shop/list', verifyToken, verifyAdmin, dealQueryData, getDataByQuery)
// 更改店铺的状态
roleRouter.post('/shop/usable', verifyToken, verifyAdmin, changeShopUsable)
// 删除店铺
roleRouter.post('/shop/delete', verifyToken, verifyAdmin, deleteShopById)
// 添加店铺  =>  因数据库字段以及此处没有图片处理, 因此请不要使用该接口
// roleRouter.post('/shop/add', verifyToken, verifyAdmin, dealAddData, addData)
// 获取订单
roleRouter.post('/order/list', verifyToken, verifyAdmin, dealQueryData, getDataByQuery)
// 更改订单状态
roleRouter.post('/order/status', verifyToken, verifyAdmin, changeOrderUsable)
// 获取工单
roleRouter.post('/feedback/list', verifyToken, verifyAdmin, dealQueryData, getDataByQuery)
// 回复工单
roleRouter.post('/feedback/reply', verifyToken, verifyAdmin, dealAddData, addData)



module.exports = roleRouter
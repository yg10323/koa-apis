const Router = require('koa-router')

const {
    verifyUser,
    verifyAdmin,
    verifyLogin,
    verifyRegister,
    verifyAdminLevel,
    dealUserQueryData,
    dealUserAddData
} = require('../middleware/role.middleware')
const {
    getMenu,
    login,
    register,
    deleteAdminById,
    deleteSellerById,
    deleteBuyerById,
    getUserByQuery,
    changeUserUsable,
    addUser
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
roleRouter.post('/user/by_query', verifyToken, verifyAdmin, dealUserQueryData, getUserByQuery)
// 更改user的usable
roleRouter.post('/user/usable', verifyToken, verifyAdmin, changeUserUsable)
// 添加user
roleRouter.post('/user/add', verifyToken, verifyAdmin, dealUserAddData, addUser)




module.exports = roleRouter
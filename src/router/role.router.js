const Router = require('koa-router')

const {
    verifyUser,
    verifyAdmin,
    verifyLogin,
    verifyRegister
} = require('../middleware/role.middleware')
const {
    getMenu,
    login,
    register
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



module.exports = roleRouter
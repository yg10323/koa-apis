const Router = require('koa-router')

const { verifyUser } = require('../middleware/role.middleware')
const { getMenu } = require('../controller/role.controller')

const { verifyToken } = require('../middleware/common.middleware')


const roleRouter = new Router({ prefix: '/api/role' })

// 获取role_id为2的角色对应的菜单
roleRouter.get('/2/menu', verifyToken, verifyUser, getMenu)



module.exports = roleRouter
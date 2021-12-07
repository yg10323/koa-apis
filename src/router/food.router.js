const Router = require('koa-router')
const {
    dealData
} = require('../middleware/food.middleware')
const {
    saveToF_FC,
    getFoodClassify
} = require('../controller/food.controller')

const { verifyUpdateShop } = require('../middleware/shop.middlewar')
const { verifyToken } = require('../middleware/common.middleware')


const foodRouter = new Router({ prefix: '/api/food' })

// 添加食品 => 添加食品, 添加分类以及相关处理都在dealData, saveToF_FC只负责往f_fc表存关系数据
foodRouter.post('/add', verifyToken, verifyUpdateShop, dealData, saveToF_FC)
// 获取食品分类
foodRouter.get('/classify', verifyToken, getFoodClassify)

module.exports = foodRouter

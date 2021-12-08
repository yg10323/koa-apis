const logger = require('../utils/logHandle');
const FoodService = require('../service/food.service')
const { staticPath } = require('../../config.json')

class FoodController {

    // 添加食品的最后一步: 往关系表存数据
    async saveToF_FC(ctx, next) {
        try {
            const { shop_id, food_id, classify_id_array } = ctx.f_fc
            const res = await FoodService.setFFC(shop_id, food_id, classify_id_array)
            if (res.length) {
                ctx.body = {
                    code: 200,
                    message: '食品添加成功啦',
                }
            }
        } catch (error) {
            logger.error('FoodController_saveToF_FC ' + error)
        }
    }

    // 获取店铺的食品分类
    async getFoodClassify(ctx, next) {
        try {
            const food_classify = await FoodService.getFoodClassify(ctx.shop_id)
            ctx.body = {
                code: 200,
                data: food_classify,
            }
        } catch (error) {
            logger.error('FoodController_getFoodClassify ' + error)
        }
    }

    // 获取店铺食品
    async getFoodList(ctx, next) {
        try {
            const res = await FoodService.getFoodList(ctx.shop_id)
            ctx.body = {
                code: 200,
                data: res
            }
        } catch (error) {
            logger.error('FoodController_getFood ' + error)
        }
    }

    // 删除店铺食品
    async deleteFood(ctx, next) {
        try {
            const { food_id } = ctx.request.body
            const res = await FoodService.deleteFood(food_id)
            if (res.affectedRows) {
                ctx.body = {
                    code: 200,
                    message: '删除成功'
                }
            }
        } catch (error) {
            logger.error('FoodController_deleteFood ' + error)
        }
    }

    // 更新食品信息
    async updateFood(ctx, next) {
        try {
            const foodInfo = ctx.foodInfo
            const food_id = ctx.food_id
            const shop_id = ctx.shopInfo.id
            const file = ctx.request.files.file;
            // 拼接图片地址
            if (file) {
                const path = staticPath + '/' + file.path.match(/upload_.*/)
                foodInfo.avatar_url = path;
            }
            // 更新food表
            const res1 = await FoodService.updateFood(foodInfo, food_id)
            // 如果有分类,先删除原先的关系表数据, 再将新关系插入
            if (ctx.classifyIdArray) {
                const res2 = await FoodService.deleteFFCByFoodId(food_id)
                const res3 = await FoodService.setFFC(shop_id, food_id, ctx.classifyIdArray)
            }

            ctx.body = {
                code: 200,
                message: '更新食品信息成功'
            }
        } catch (error) {
            logger.error('FoodController_updateFood ' + error)
        }
    }
}



module.exports = new FoodController()
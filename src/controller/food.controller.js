const logger = require('../utils/logHandle');
const FoodService = require('../service/food.service')
const ShopService = require('../service/shop.service')

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
            const { id } = ctx.user;
            const shopInfo = await ShopService.getShopBySellerId(id)
            const food_classify = await FoodService.getFoodClassify(shopInfo[0].id)
            ctx.body = {
                code: 200,
                data: food_classify
            }

        } catch (error) {
            logger.error('FoodController_getFoodClassify ' + error)
        }
    }
}



module.exports = new FoodController()
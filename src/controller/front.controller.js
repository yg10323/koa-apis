const FrontService = require('../service/front.service')
const logger = require('../utils/logHandle');

class FrontController {

    // 获取店铺分类
    async getShopClassify(ctx, next) {
        try {
            const res = await FrontService.getShopClassify();
            ctx.body = {
                code: 200,
                data: res
            }
        } catch (error) {
            logger.error('FrontController_getShopClassify ' + error)
        }
    }

    // 获取全部店铺
    async getShopAll(ctx, next) {
        try {
            const res = await FrontService.getShopAll()
            ctx.body = {
                code: 200,
                data: res
            }
        } catch (error) {
            logger.error('FrontController_getShopAll ' + error)
        }
    }

    // 根据店铺id获取店铺信息
    async getShopById(ctx, next) {
        try {
            const { shop_id } = ctx.request.body
            const res = await FrontService.getShopById(shop_id)
            ctx.body = {
                code: 200,
                data: res[0]
            }
        } catch (error) {
            logger.error('FrontController_getShopById ' + error)
        }
    }

    // 获取全部食品信息
    async getFoodAll(ctx, next) {
        try {
            const { shop_id } = ctx.request.body;
            const res = await FrontService.getFoodAll(shop_id)
            ctx.body = {
                code: 200,
                data: res
            }
        } catch (error) {
            logger.error('FrontController_getFoodAll ' + error)
        }
    }

    // 根据一级分类获取店铺
    async getShopByOpId(ctx, next) {
        try {
            const { op_id } = ctx.request.body
            const res = await FrontService.getShopByOpId(op_id)
            ctx.body = {
                code: 200,
                data: res
            }
        } catch (error) {
            logger.error('FrontController_getShopByOpId ' + error)
        }
    }
}


module.exports = new FrontController()
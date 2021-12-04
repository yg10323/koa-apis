const ShopService = require('../service/shop.service')
const logger = require('../utils/logHandle');

class ShopController {

    // 获取店铺分类
    async getClassify(ctx, next) {
        try {
            const res = await ShopService.getClassify();
            ctx.body = res
        } catch (error) {
            logger.error('ShopController_getClassify ' + error)
        }
    }

    // 获取店铺名是否被注册
    async shopExist(ctx, next) {
        try {
            const { name } = ctx.request.body
            const res = await ShopService.getShopByName(name)
            if (res.length || !name) {
                ctx.body = { exist: true }
            }
            if (name && name.length > 2 && name.length < 20) {
                ctx.body = { exist: false }
            }

        } catch (error) {
            logger.error('ShopController_shopExist ' + error)
        }
    }

    // 查询用户是否已注册过店铺
    async hasShop(ctx, next) {
        try {
            const { id } = ctx.user
            const res = await ShopService.getShopBySellerId(id)
            if (res.length) {
                ctx.body = { hasShop: true }
                return
            }
            ctx.body = { hasShop: false }
        } catch (error) {
            logger.error('ShopController_hasShop ' + error)
        }
    }
}


module.exports = new ShopController()
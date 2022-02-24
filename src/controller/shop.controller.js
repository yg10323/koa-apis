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

    // 获取个人店铺信息
    async getSelfShop(ctx, next) {
        try {
            const { id } = ctx.user;
            const res = await ShopService.getShopBySellerId(id);
            ctx.body = res
        } catch (error) {
            logger.error('ShopController_getSelfShop ' + error)
        }
    }

    // 更新除了活动外的店铺信息
    async updateShop(ctx, next) {
        try {
            const { shopInfo } = ctx.user;
            const res = await ShopService.updateShop(shopInfo);
            ctx.body = {
                code: 200,
                message: '更新信息成功啦'
            }
        } catch (error) {
            logger.error('ShopController_updateShop ' + error)
        }
    }

    // 更新店铺活动信息
    async updateActivities(ctx, next) {
        try {
            const { id } = ctx.user;
            const activities = ctx.request.body;
            const res = await ShopService.updateActivities(activities, id)
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '店铺活动更新成功'
                }
            }
        } catch (error) {
            logger.error('ShopController_updateActivities ' + error)
        }
    }

    // 获取店铺今日订单
    async getOrdersToday(ctx, next) {
        try {
            const shop_id = ctx.shop_id
            const res = await ShopService.getOrdersToday(shop_id)
            ctx.body = {
                code: 200,
                data: res
            }
        } catch (error) {
            logger.error('ShopController_getOrderstoday ' + error)
        }
    }

    // 获取店铺所有订单
    async getOrdersAll(ctx, next) {
        try {
            const shop_id = ctx.shop_id
            const res = await ShopService.getOrdersAll(shop_id)
            ctx.body = {
                code: 200,
                data: res
            }
        } catch (error) {
            logger.error('ShopController_getOrderstoday ' + error)
        }
    }

    // 获取流水相关的数据
    async getBill(ctx, next) {
        try {
            const shop_id = ctx.shop_id
            const res = await ShopService.getBill(shop_id)
            ctx.body = {
                code: 200,
                data: res
            }
        } catch (error) {
            logger.error('ShopController_getBill ' + error)
        }
    }

    // 获取店铺食品销售数量
    async getSold(ctx, next) {
        try {
            const shop_id = ctx.shop_id;
            const res = await ShopService.getSold(shop_id)
            ctx.body = {
                code: 200,
                data: res
            }
        } catch (error) {
            logger.error('ShopController_getSold ' + error)
        }
    }

    // 获取订单地点数量分布
    async getMapData(ctx, next) {
        try {
            const shop_id = ctx.shop_id;
            const res = await ShopService.getMapData(shop_id)
            ctx.body = {
                code: 200,
                data: res
            }
        } catch (error) {
            logger.error('ShopController_getMapData ' + error)
        }
    }

    // 获取店铺评价
    async getshopEvaluates(ctx, next) {
        try {
            const { shop_id } = ctx.request.body
            const res = await ShopService.getshopEvaluates(shop_id)
            if (res) {
                ctx.body = {
                    code: 200,
                    data: res
                }
            }
        } catch (error) {
            logger.error('ShopController_getshopEvaluates ' + error)
        }
    }
}


module.exports = new ShopController()
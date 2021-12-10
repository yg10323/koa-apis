const SellerService = require('../service/seller.service')
const ShopService = require('../service/shop.service')
const errorTypes = require('../constants/errorTypes')
const logger = require('../utils/logHandle')
const { staticPath } = require('../../config.json')


class ShopVerify {

    // 更新店铺信息时验证
    async verifyUpdateShop(ctx, next) {
        try {
            const { account, role_id } = ctx.user
            // 1. 用户是否存在
            const res = await SellerService.getSellerByAccount(account);
            const seller = res[0];
            if (!seller) {
                const error = new Error(errorTypes.ACCOUNT_DOES_NOT_EXIST);
                return ctx.app.emit('error', error, ctx);
            }
            // 2. 是否越权
            if (seller.role_id !== role_id) {
                const error = new Error(errorTypes.UNAUTHORIZED_OPERATION);
                return ctx.app.emit('error', error, ctx)
            }
            // 3. 账号是否可用
            if (seller.usable === 0) {
                const error = new Error(errorTypes.ACCOUNT_HAS_BEEN_DISABLED)
                return ctx.app.emit('error', error, ctx)
            }
            // 3. 是否已经实名认证
            if (!seller.name || !seller.iid || !seller.phone) {
                const error = new Error(errorTypes.INCOMPLETE_REAL_NAME_INFORMATION);
                return ctx.app.emit('error', error, ctx);
            }
            // 4. 是否拥有店铺
            const hasShop = await ShopService.getShopBySellerId(seller.id)
            if (!hasShop.length) {
                const error = new Error(errorTypes.SHOP_DOES_NOT_EXIST);
                return ctx.app.emit('error', error, ctx)
            }
            // 5. 店铺是否封禁
            if (hasShop[0].usable != 1) {
                const error = new Error(errorTypes.SHOP_HSA_BEEN_BLOCKED)
                return ctx.app.emit('error', error, ctx)
            }
            ctx.user.shop = hasShop[0];
            await next()

        } catch (error) {
            logger.error('ShopVerify_verifyUpdateShop ' + error)
        }
    }

    // 更新店铺信息时验证之后处理数据
    async dealData(ctx, next) {
        try {
            const { id } = ctx.user
            const file = ctx.request.files.file;
            const shopInfo = JSON.parse(ctx.request.body.data);
            // 拼接图片地址
            if (file) {
                const path = staticPath + '/' + file.path.match(/upload_.*/)
                shopInfo.shop_avatar_url = path;
            }
            // 格式化数据
            if (shopInfo.classify) {
                shopInfo.op_id = shopInfo.classify[0];
                shopInfo.ch_id = shopInfo.classify[1];
                delete shopInfo.classify
            }
            shopInfo.seller_id = id;
            ctx.user.shopInfo = shopInfo
            await next();
        } catch (error) {
            logger.error('ShopVerify_dealData ' + error)
        }
    }

    // 获取店铺订单时验证
    async verifyGetOrders(ctx, next) {
        try {
            const { account } = ctx.user;
            const res = await SellerService.getSellerByAccount(account);
            const seller = res[0];
            // 1. 账号是否被封禁
            if (seller.usable !== 1) {
                const error = new Error(errorTypes.SHOP_HSA_BEEN_BLOCKED)
                return ctx.app.emit('error', error, ctx)
            }
            // 2. 是否有店铺
            const hasShop = await ShopService.getShopBySellerId(seller.id)
            if (!hasShop.length) {
                const error = new Error(errorTypes.SHOP_DOES_NOT_EXIST);
                return ctx.app.emit('error', error, ctx)
            }
            // 3. 店铺是否被封禁
            if (hasShop[0].usable != 1) {
                const error = new Error(errorTypes.SHOP_HSA_BEEN_BLOCKED)
                return ctx.app.emit('error', error, ctx)
            }

            ctx.shop_id = hasShop[0].id
            await next()
        } catch (error) {
            logger.error('ShopVerify_verifyGetOrders ' + error)
        }
    }
}



module.exports = new ShopVerify()
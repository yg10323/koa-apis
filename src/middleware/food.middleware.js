const errorTypes = require('../constants/errorTypes')
const FoodService = require('../service/food.service')
const ShopService = require('../service/shop.service')
const SellerService = require('../service/seller.service')
const logger = require('../utils/logHandle')
const { staticPath } = require('../../config.json')


class FoodVerify {

    // controller之前数据处理
    async dealData(ctx, next) {
        try {
            const file = ctx.request.files.file;
            const foodInfo = JSON.parse(ctx.request.body.data)
            // 1.把要插入到food表的数据整理出来
            const path = staticPath + '/' + file.path.match(/upload_.*/)
            foodInfo.avatar_url = path;
            foodInfo.shop_id = ctx.user.shop.id
            // 2. 抽离食品分类, 插入数据到food表, 获取food_id
            const classify = foodInfo.foodClassify
            delete foodInfo.foodClassify
            const food_id = await FoodService.setFoodInfo(Object.values(foodInfo))
            // 3. 查询当前店铺的所有食品分类
            // 如果查询为空, 将前端发送来的食品分类全部插入分类表, 获取对应的classify_id
            // 如果查询不为空, 1. 获取重复分类的id 2. 插入新的分类并获取对应的classify_id
            // 将重复id与新插入后获取的id合并
            const db_classify = await FoodService.getFoodClassify(foodInfo.shop_id)
            let classifyIdArray = []
            if (!db_classify.length) {
                classifyIdArray = await FoodService.setFoodClassify(classify)
            } else {
                for (let obj of db_classify) {
                    classify.forEach((item, index) => {
                        if (item === obj.food_classify) {
                            classifyIdArray.push(obj.food_classify_id)
                            classify.splice(index, 1)
                        }
                    })
                }
                // 如果不是都重复
                if (classify.length > 0) {
                    // 将新的分类插入分类表并得到新的分类id
                    const newClassifyIdArray = await FoodService.setFoodClassify(classify)
                    // 新旧分类id合并
                    classifyIdArray = [...classifyIdArray, ...newClassifyIdArray]
                } else {
                    classifyIdArray = classifyIdArray
                }

            }
            // 4. 保存shop_id,food_id, classify_id_array, 准备往关系表f_fc写数据
            ctx.f_fc = {
                shop_id: foodInfo.shop_id,
                food_id: food_id,
                classify_id_array: classifyIdArray
            }

            await next()
        } catch (error) {
            logger.error('FoodVerify_dealData ' + error)
        }
    }

    // 获取信息的验证
    async verifyGetInfo(ctx, next) {
        try {
            const { id } = ctx.user;
            const shopInfo = await ShopService.getShopBySellerId(id)
            if (!shopInfo.length) {
                const error = new Error(errorTypes.SHOP_DOES_NOT_EXIST)
                return ctx.app.emit('error', error, ctx)
            }
            ctx.shop_id = shopInfo[0].id
            await next()
        } catch (error) {
            logger.error('FoodVerify_verifyGetInfo ' + error)
        }
    }

    // 更新食品信息验证
    async verifyUpdateFood(ctx, next) {
        try {
            const { account, role_id } = ctx.user
            const foodInfo = JSON.parse(ctx.request.body.data)
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
            // 6. 要修改的食品是否属于该店铺
            const db_shopId = await FoodService.getShopIdByFoodId(foodInfo.food_id)
            if (db_shopId[0].shop_id !== hasShop[0].id) {
                const error = new Error(errorTypes.UNAUTHORIZED_OPERATION)
                return ctx.app.emit('error', error, ctx)
            }

            ctx.shopInfo = hasShop[0]
            ctx.foodInfo = foodInfo
            ctx.food_id = foodInfo.food_id
            if (ctx.foodInfo.foodClassify) {
                ctx.foodClassify = ctx.foodInfo.foodClassify
                delete ctx.foodInfo.foodClassify
            }
            delete ctx.foodInfo.food_id
            await next()
        } catch (error) {
            logger.error('FoodVerify_verifyUpdateFood ' + error)
        }
    }

    // 更新食品信息时对分类的处理
    async dealClassify(ctx, next) {
        // 如果有更新分类
        if (ctx.foodClassify) {
            const db_classify = await FoodService.getFoodClassify(ctx.shopInfo.id)
            let classifyIdArray = []
            if (!db_classify.length) {
                classifyIdArray = await FoodService.setFoodClassify(ctx.foodClassify)
            } else {
                for (let obj of db_classify) {
                    ctx.foodClassify.forEach((item, index) => {
                        if (item === obj.food_classify) {
                            classifyIdArray.push(obj.food_classify_id)
                            ctx.foodClassify.splice(index, 1)
                        }
                    })
                }
                // 如果不是都重复
                if (ctx.foodClassify.length > 0) {
                    // 将新的分类插入分类表并得到新的分类id
                    const newClassifyIdArray = await FoodService.setFoodClassify(ctx.foodClassify)
                    // 新旧分类id合并
                    classifyIdArray = [...classifyIdArray, ...newClassifyIdArray]
                } else {
                    classifyIdArray = classifyIdArray
                }
            }
            ctx.classifyIdArray = classifyIdArray
        }

        await next()
    }
}




module.exports = new FoodVerify()
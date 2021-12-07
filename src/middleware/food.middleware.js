const errorTypes = require('../constants/errorTypes')
const FoodService = require('../service/food.service')
const logger = require('../utils/logHandle')
const { staticPath } = require('../../config.json')


class FoodVerify {

    // controller之前数据处理
    async dealData(ctx, next) {
        try {
            const file = ctx.request.files.file;
            const foodInfo = JSON.parse(ctx.request.body.data);
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
}




module.exports = new FoodVerify()
const connection = require('../db/db')
const logger = require('../utils/logHandle')

class FoodService {

    // 查询店铺的食品分类 => 去重后的
    async getFoodClassify(shop_id) {
        try {
            const statement = `SELECT f.id food_id, f.name food_name, fc.id food_classify_id, fc.classify food_classify FROM f_fc
	                            LEFT JOIN food f on f.id = f_fc.f_id
	                            LEFT JOIN food_classify fc on fc.id = f_fc.fc_id
                            WHERE f_fc.s_id = ? GROUP BY food_classify`;
            const [res] = await connection.execute(statement, [shop_id])
            return res
        } catch (error) {
            logger.error('FoodService_getFoodClassify ' + error)
        }
    }

    // 插入食品信息
    async setFoodInfo(foodInfo) {
        try {
            const statement = `INSERT INTO food (shop_id,name,cost,price,discount,extra,least,single_point,avatar_url)
						VALUES (?,?,?,?,?,?,?,?,?);`
            const [res] = await connection.execute(statement, [...foodInfo])
            return res.insertId
        } catch (error) {
            logger.error('FoodService_setFoodInfo ' + error)
        }
    }

    // 插入分类
    async setFoodClassify(classify) {
        try {
            let statement = `INSERT INTO food_classify (classify) VALUES `
            for (let item of classify) {
                statement += `('${item}'),`
            }
            statement = statement.substring(0, statement.length - 1)
            const [res] = await connection.execute(statement, [...classify])
            const classify_id = [];
            for (let i = res.insertId; i < res.insertId + res.affectedRows; i++) {
                classify_id.push(i)
            }
            // 返回分类id
            return classify_id
        } catch (error) {
            logger.error('FoodService_setFoodClassify ' + error)
        }
    }

    // 插入关系数据到f_fc表
    async setFFC(shop_id, food_id, classify_id_array) {
        try {
            const statement = `INSERT INTO f_fc(s_id, f_id, fc_id) VALUES (?, ?, ?);`
            const res = [];
            for (let classify_id of classify_id_array) {
                const [r] = await connection.execute(statement, [shop_id, food_id, classify_id])
                res.push(r)
            }
            return res
        } catch (error) {
            logger.error('FoodService_setFFC ' + error)
        }
    }

    // 获取食品数据
    async getFoodList(shop_id) {
        try {
            const statement = `SELECT f.*, fc.id food_classify_id, fc.classify food_classify FROM f_fc
	                            LEFT JOIN food f on f.id = f_fc.f_id
	                            LEFT JOIN food_classify fc on fc.id = f_fc.fc_id
                                WHERE f_fc.s_id = ? GROUP BY f.id;`
            const [res] = await connection.execute(statement, [shop_id])
            return res
        } catch (error) {
            logger.error('FoodService_getFood ' + error)
        }
    }

    // 删除食品
    async deleteFood(food_id) {
        try {
            const statement = `DELETE FROM food WHERE id = ?;`
            const [res] = await connection.execute(statement, [food_id])
            return res
        } catch (error) {
            logger.error('FoodService_deleteFood ' + error)
        }
    }

    // 根据食品id查对应的店铺
    async getShopIdByFoodId(food_id) {
        try {
            const statement = `SELECT shop_id FROM food WHERE id = ?;`
            const [res] = await connection.execute(statement, [food_id])
            return res
        } catch (error) {
            logger.error('FoodService_getFoodIdByShopId ' + error)
        }
    }

    // 更新食品信息
    async updateFood(foodInfo, food_id) {
        try {
            let statement = 'UPDATE food SET'
            for (let key in foodInfo) {
                statement += ` ${key} = ?, `
            }
            statement = statement.substr(0, statement.length - 2) + ' WHERE id = ?;'
            const [res] = await connection.execute(statement, [...Object.values(foodInfo), food_id])
            return res
        } catch (error) {
            logger.error('FoodService_updateFood ' + error)
        }
    }

    // 根据food_id删除f_fc表的数据
    async deleteFFCByFoodId(food_id) {
        try {
            const statement = `DELETE FROM f_fc WHERE f_id = ?;`
            const [res] = await connection.execute(statement, [food_id])
            return res
        } catch (error) {
            logger.error('FoodService_deleteFFCByFoodId ' + error)
        }
    }

    // 更新已售字段
    async updateSold(food_info) {
        try {
            const res = [];
            for (let item of food_info) {
                item.food_ids.forEach(async food_id => {
                    const statement = `UPDATE food SET sold = sold + 1 WHERE id = ?;`
                    const [r] = await connection.execute(statement, [food_id])
                    res.push(r)
                })
            }
            return res
        } catch (error) {
            logger.error('FoodService_updateSold ' + error)
        }
    }
}


module.exports = new FoodService()
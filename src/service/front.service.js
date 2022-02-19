const connection = require('../db/db')
const logger = require('../utils/logHandle')

class FrontService {

    // 获取店铺分类
    async getShopClassify() {
        try {
            const statement = `SELECT * FROM shop_classify GROUP BY op_id;`;
            const [res] = await connection.execute(statement);
            return res;
        } catch (error) {
            logger.error('FrontService_getShopClassify ' + error)
        }
    }

    // 获取全部店铺
    async getShopAll() {
        try {
            const statement = `SELECT * FROM shop;`;
            const [res] = await connection.execute(statement);
            return res
        } catch (error) {
            logger.error('FrontService_getShopAll ' + error)
        }
    }

    // 根据id获取店铺
    async getShopById(shop_id) {
        try {
            const statement = `SELECT * FROM shop WHERE id = ?;`
            const [res] = await connection.execute(statement, [shop_id]);
            return res
        } catch (error) {
            logger.error('FrontService_getShopById ' + errror)
        }
    }

    // 获取全部食品信息
    async getFoodAll(shop_id) {
        try {
            const statement = `SELECT f.*, fc.id food_classify_id, fc.classify food_classify FROM f_fc 
	                            LEFT JOIN food f on f.id = f_fc.f_id 
	                            LEFT JOIN food_classify fc on fc.id = f_fc.fc_id
                            WHERE f_fc.s_id = ?`
            const [res] = await connection.execute(statement, [shop_id])
            return res
        } catch (error) {
            logger.error('FrontService_getFoodAll ' + error)
        }
    }

    // 根据一级分类获取店铺
    async getShopByOpId(op_id) {
        try {
            const statement = `SELECT * FROM shop WHERE op_id = ?;`;
            const [res] = await connection.execute(statement, [op_id]);
            return res
        } catch (error) {
            logger.error('FrontService_getShopByOpId ' + error)
        }
    }
}


module.exports = new FrontService()
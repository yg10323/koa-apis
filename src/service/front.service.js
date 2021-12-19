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

}


module.exports = new FrontService()
const connection = require('../db/db')
const logger = require('../utils/logHandle')

class ShopService {

    // 获取店铺分类
    async getClassify() {
        try {
            const statement = `SELECT * FROM shop_classify;`
            const [res] = await connection.execute(statement)
            return res
        } catch (error) {
            logger.error('ShopService_getClassify ' + error)
        }
    }

    // 根据店铺名获取店铺信息
    async getShopByName(name) {
        try {
            const statement = `SELECT * FROM shop WHERE name = ?;`
            const [res] = await connection.execute(statement, [name]);
            return res
        } catch (error) {
            logger.error('ShopService_getShopByName ' + error)
        }
    }

    // 根据seller_id查询店铺
    async getShopBySellerId(seller_id) {
        try {
            const statement = `SELECT * FROM shop WHERE seller_id = ?;`
            const [res] = await connection.execute(statement, [seller_id])
            return res
        } catch (error) {
            logger.error('SellerService_getShopById ' + error)
        }
    }

    // 添加店铺
    async createShop(shopInfo) {
        try {
            const statement = `INSERT INTO shop (seller_id,name,address,start_time,end_time,mountain_plan,service,
                            delivery,activities,shop_avatar_url,business_permit_url,health_certificate_url,op_id,ch_id)
                            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
            const [res] = await connection.execute(statement, [...shopInfo])
            return res
        } catch (error) {
            logger.error('ShopService_createShop ' + error)
        }
    }
}

module.exports = new ShopService()
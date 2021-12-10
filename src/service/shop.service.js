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
            if (res.length) {
                const { ch_id } = res[0]
                const statement2 = `SELECT options,child FROM shop_classify WHERE ch_id = ?;`
                const [res2] = await connection.execute(statement2, [ch_id])
                res[0].classify = res2[0]
            }
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

    // 更新除活动以外的店铺信息
    async updateShop(shopInfo) {
        try {
            let statement = 'UPDATE shop SET'
            for (let key in shopInfo) {
                if (key !== 'seller_id') {
                    statement += ` ${key} = ?, `
                }
            }
            statement = statement.substr(0, statement.length - 2) + ' WHERE seller_id = ?;'
            const [res] = await connection.execute(statement, [...Object.values(shopInfo)])
            return res
        } catch (error) {
            logger.error('ShopService_updateInfo ' + error)
        }
    }

    // 更细店铺活动
    async updateActivities(activities, seller_id) {
        try {
            const statement = `UPDATE shop SET activities = ? WHERE seller_id = ?;`
            const [res] = await connection.execute(statement, [activities, seller_id])
            return res
        } catch (error) {
            logger.error('ShopService_updateActivities ' + error)
        }
    }

    // 获取店铺今日订单
    async getOrdersToday(shop_id) {
        try {
            const statement = `SELECT 
	                                o.*, JSON_OBJECT('name', b.name, 'address',b.address,'phone',b.phone) buyer_info,
			                        JSON_OBJECT('name',f.name,'cost', f.cost,'price',f.price,'discount',f.discount,'extra',f.extra) food_info
                               FROM o_f
	                                LEFT JOIN orders o ON o.id = o_f.o_id
	                                LEFT JOIN buyer b ON b.id = o.buyer_id
	                                LEFT JOIN food f ON f.id = o_f.f_id
                               WHERE o_f.s_id = ? AND o.update_flag = 1 `;
            const [res] = await connection.execute(statement, [shop_id])
            return res
        } catch (error) {
            logger.error('ShopService_getOrderstoday ' + error)
        }
    }

    // 获取店铺所有订单
    async getOrdersAll(shop_id) {
        try {
            const statement = `SELECT 
	                                o.*, JSON_OBJECT('name', b.name, 'address',b.address,'phone',b.phone) buyer_info,
			                        JSON_OBJECT('name',f.name,'cost',f.cost, 'price',f.price,'discount',f.discount,'extra',f.extra) food_info
                               FROM o_f
	                                LEFT JOIN orders o ON o.id = o_f.o_id
	                                LEFT JOIN buyer b ON b.id = o.buyer_id
	                                LEFT JOIN food f ON f.id = o_f.f_id
                               WHERE o_f.s_id = ? ORDER BY id`;
            const [res] = await connection.execute(statement, [shop_id])
            return res
        } catch (error) {
            logger.error('ShopService_getOrderstoday ' + error)
        }
    }

    // 获取流水相关
    async getBill(shop_id) {
        try {
            const soldStatement = `SELECT id, name ,price, sold FROM food WHERE shop_id = ?;`;
            const billStatement = ``;
            const slodRes = await connection.execute(soldStatement, [shop_id]);
            const billRes = await connection.execute(billStatement, [shop_id]);

            return { slodRes, billRes }
        } catch (error) {
            logger.error('ShopService_getBill ' + error)
        }
    }
}

module.exports = new ShopService()
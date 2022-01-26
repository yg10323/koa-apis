const connection = require('../db/db')
const logger = require('../utils/logHandle')



class BuyerService {

    // 根据account查找用户信息
    async getBuyerByAccount(account) {
        try {
            const statement = `SELECT * FROM buyer WHERE account = ?;`;
            const [res] = await connection.execute(statement, [account])
            return res
        } catch (error) {
            logger.error('BuyerService_getBuyerByAccount ' + error)
        }
    }

    // 注册
    async registerBuyer(account, password) {
        try {
            const statement = `INSERT INTO buyer (account, password) VALUES (?, ?);`
            const [res] = await connection.execute(statement, [account, password])
            return res
        } catch (error) {
            logger.error('BuyerService_registerBuyer ' + error)
        }
    }

    // 购买食品 => 创建订单
    async createOrder(order_nu, buyer_id, total_price, pay_price) {
        try {
            const statement = `INSERT INTO orders (order_number,buyer_id, total_price, pay_price) VALUES (?,?, ?, ?);`;
            const [res] = await connection.execute(statement, [order_nu, buyer_id, total_price, pay_price])
            return res
        } catch (error) {
            logger.error('BuyerService_createOrder ' + error)
        }
    }

    // 插入数据到 o_f 表
    async setOF(food_info, order_id) {
        try {
            const res = [];
            for (let item of food_info) {
                item.food_ids.forEach(async food_id => {
                    const statement = `INSERT INTO o_f (s_id, f_id, o_id) VALUES (?, ?, ?);`;
                    const [r] = await connection.execute(statement, [item.shop_id, food_id, order_id])
                    res.push(r)
                })
            }
            return res
        } catch (error) {
            logger.error('BuyerService_setOF ' + error)
        }
    }

    // 更新收货信息
    async updateAddress(address, name, phone, id) {
        try {
            const statement = `UPDATE buyer SET address = ? , name = ?, phone = ? WHERE id = ?;`
            const [res] = await connection.execute(statement, [address, name, phone, id])
            return res
        } catch (error) {
            logger.error('BuyerService_updateAddress ' + error)
        }
    }

    // 获取用户订单
    async getOrder(buyer_id) {
        try {
            const statement = `SELECT 
	                    o.*, JSON_OBJECT('name', b.name, 'address',b.address,'phone',b.phone) buyer_info,
			 JSON_OBJECT('name',f.name, 'cost',f.cost, 'price',f.price,'discount',f.discount,'extra',f.extra) food_info
            FROM o_f 
	                LEFT JOIN orders o ON o.id = o_f.o_id
	                LEFT JOIN buyer b ON b.id = o.buyer_id
	                LEFT JOIN food f ON f.id = o_f.f_id
            WHERE o.buyer_id = ? ORDER BY id`
            const [res] = await connection.execute(statement, [buyer_id])

            return res
        } catch (error) {
            logger.error('BuyerService_')
        }
    }

}



module.exports = new BuyerService()
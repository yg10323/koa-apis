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

}



module.exports = new BuyerService()
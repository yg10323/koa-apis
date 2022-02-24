const connection = require('../db/db')
const logger = require('../utils/logHandle')

class SellerService {

    // m: 判断账号是否存在
    async judgeSeller(account) {
        try {
            const statement = `SELECT account FROM seller WHERE account = ?
                                UNION ALL
                                SELECT account FROM admin WHERE account = ?`;
            const [res] = await connection.execute(statement, [account, account])
            return res
        } catch (error) {
            logger.error('SellerService_judgeSeller ' + error)
        }
    }

    // c: 添加seller
    async addSeller(account, password, sid) {
        try {
            const statement = `INSERT INTO seller (account, password,sid) VALUES (?, ?, ?);`
            const [res] = await connection.execute(statement, [account, password, sid]);
            return res
        } catch (error) {
            logger.error('SellerService_addSeller ' + error);
        }
    }

    // m: 判断seller是否存在
    async getSellerByAccount(account) {
        try {
            const statement = `SELECT * FROM seller WHERE account = ?;`
            const [res] = await connection.execute(statement, [account]);
            return res
        } catch (error) {
            logger.error('SellerService_getSellerByAccount ' + error);
        }
    }

    // 跟新实名信息
    async updateAuthInfo(authInfo) {
        try {
            const statement = `UPDATE seller SET name= ? , iid = ?, phone = ? WHERE id = ?;`
            const [res] = await connection.execute(statement, [...authInfo])
            return res
        } catch (error) {
            logger.error('ShopService_updateAuthInfo ' + error)
        }
    }

    // 删除账号
    async deleteSelfById(id) {
        try {
            const statement = `DELETE FROM seller WHERE id = ?; `
            const [res] = await connection.execute(statement, [id])
            return res
        } catch (error) {
            logger.error('SellerService_deleteSelfById ' + error)
        }
    }

    // 工单反馈
    async postFeedBack(seller_id, title, content, type) {
        try {
            const statement = `INSERT INTO feedback (title,content,seller_id,type) VALUES (?,?,?,?);`;
            const [res] = await connection.execute(statement, [title, content, seller_id, type])
            return res
        } catch (error) {
            logger.error('SellerService_postFeedBack ' + error)
        }
    }

    // 获取我的工单
    async getMyFeedback(seller_id) {
        try {
            const statement = `SELECT * FROM feedback WHERE seller_id = ?;`;
            const [res] = await connection.execute(statement, [seller_id])
            return res
        } catch (error) {
            logger.error('SellerService_getMyFeedback ' + error)
        }
    }

    // 回复订单评论
    async replyEvaluate(id, evaluate_id, reply, filed_id) {
        try {
            const statement = `UPDATE evaluate SET seller_id = ?, evaluate_id = ?, reply = ? WHERE id = ?;`
            const [res] = await connection.execute(statement, [id, evaluate_id, reply, filed_id])

            return res
        } catch (error) {
            logger.error('SellerService_replyEvaluate ' + error)
        }
    }


}


module.exports = new SellerService()
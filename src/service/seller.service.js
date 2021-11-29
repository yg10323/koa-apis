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
            logger.error('判断seller是否存在 ' + error)
        }
    }

    // c: 添加seller
    async addSeller(account, password, sid) {
        try {
            const statement = `INSERT INTO seller (account, password,sid) VALUES (?, ?, ?);`
            const [res] = await connection.execute(statement, [account, password, sid]);
            return res
        } catch (error) {
            logger.error('添加seller时 ' + error);
        }
    }

    // m: 判断seller是否存在
    async getSellerByAccount(account) {
        try {
            const statement = `SELECT * FROM seller WHERE account = ?;`
            const [res] = await connection.execute(statement, [account]);
            return res
        } catch (error) {
            logger.error('添加seller时 ' + error);
        }
    }
}


module.exports = new SellerService()
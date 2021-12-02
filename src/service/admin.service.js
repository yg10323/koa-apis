const connection = require('../db/db')
const logger = require('../utils/logHandle')

class AdminService {

    // 根据account获取admin信息
    async getAdminByAccount(account) {
        try {
            const statement = `SELECT * FROM admin WHERE account = ?;`
            const [res] = await connection.execute(statement, [account]);
            return res
        } catch (error) {
            logger.error('AdminService_getAdminByAccount ' + error);
        }
    }
}


module.exports = new AdminService()
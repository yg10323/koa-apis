const connection = require('../db/db')
const logger = require('../utils/logHandle')

class RoleService {

    // 获取菜单
    async getMenu(role_id) {
        try {
            const statement = `SELECT * FROM menu m WHERE m.pid IS NULL AND m.role_id = ?;`
            // resArray一级菜单
            const [resArray] = await connection.execute(statement, [role_id])
            // for (let [index, menu] of new Map(resArray.map((menu, index) => [index, menu]))) {}
            for (let menu of resArray) {
                const statement = `SELECT * FROM menu m WHERE m.pid = ? AND m.role_id = ?;`
                // 二级菜单,并添加进对应的父级菜单中
                const [children] = await connection.execute(statement, [menu.id, role_id])
                menu.children = children;
            }
            return resArray
        } catch (error) {
            logger.error('RoleService_getMenu ' + error);
        }
    }

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

    // 注册admin
    async addAdmin(account, password) {
        try {
            const statement = `INSERT INTO admin (account, password) VALUES (?, ?);`;
            const [res] = await connection.execute(statement, [account, password])
            return res
        } catch (error) {
            logger.error('RoleService_addAdmin ' + error)
        }
    }
}

module.exports = new RoleService()
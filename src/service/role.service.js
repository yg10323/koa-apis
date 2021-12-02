const connection = require('../db/db')
const logger = require('../utils/logHandle')

class RoleService {

    async getMenu(role_id) {
        try {
            const statement = `SELECT * FROM menu m WHERE m.pid IS NULL AND m.role_id = ?;`
            // resArray一级菜单
            const [resArray] = await connection.execute(statement, [role_id])
            // for (let [index, menu] of new Map(resArray.map((menu, index) => [index, menu]))) {}
            for (let menu of resArray) {
                const statement = `SELECT * FROM menu m WHERE m.pid = ? AND m.role_id = 2;`
                // 二级菜单,并添加进对应的父级菜单中
                const [children] = await connection.execute(statement, [menu.id])
                menu.children = children;
            }
            return resArray
        } catch (error) {
            logger.error('RoleService_getMenu ' + error);
        }
    }
}

module.exports = new RoleService()
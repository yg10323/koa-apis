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

    // 根据id删除admin
    async deleteAdminById(id) {
        try {
            const statement = `DELETE FROM admin WHERE id = ?;`;
            const [res] = await connection.execute(statement, [id])
            return res
        } catch (error) {
            logger.error('RoleService_deleteAdminById ' + error)
        }
    }

    // 根据id删除seller
    async deleteSellerById(id) {
        try {
            const statement = `DELETE FROM seller WHERE id = ?;`;
            const [res] = await connection.execute(statement, [id])
            return res
        } catch (error) {
            logger.error('RoleService_deleteAdminById ' + error)
        }
    }

    // 根据id删除buyer
    async deleteBuyerById(id) {
        try {
            const statement = `DELETE FROM buyer WHERE id = ?;`;
            const [res] = await connection.execute(statement, [id])
            return res
        } catch (error) {
            logger.error('RoleService_deleteAdminById ' + error)
        }
    }

    // 根据query获取admin/seller/buyer
    async getUserByQuery(tableName, page, offset, keys, values, timeQuery) {
        try {

            // 查询总数
            const statement1 = `SELECT COUNT(*) totalCount FROM ${tableName};`
            let [totalCount] = await connection.execute(statement1);
            totalCount = totalCount[0].totalCount

            // 查询数据
            let statement = `SELECT * FROM ${tableName} `
            // 没有时间筛选
            if (keys.length) {
                for (let i in keys) {
                    statement += `WHERE ${keys[i]} LIKE '%${values[i]}%' AND `
                    values.splice(i, 1);
                }
            }

            // 有时间筛选时
            if (JSON.stringify(timeQuery) != '{}') {
                // 只有时间筛选
                if (!keys.length) {
                    statement += `WHERE createTime BETWEEN ? AND ? `
                } else {
                    // 既有其他筛选也有时间筛选
                    statement += `createTime BETWEEN ? AND ? `
                }
                values.push(...Object.values(timeQuery))
            }


            values.push(page, offset)
            statement += 'LIMIT ?, ?'
            const [res] = await connection.execute(statement, [...values])
            // totalCount = res.length < offset ? res.length : totalCount

            return {
                totalCount,
                data: res,
            }

        } catch (error) {
            logger.error('RoleService_getUserByQuery ' + error)
        }
    }

    // 更改user的usable
    async changeUserUsable(tableName, usable, id) {
        try {
            const statement = `UPDATE ${tableName} SET usable = ? WHERE id = ?;`
            const [res] = await connection.execute(statement, [usable, id])
            return res
        } catch (error) {
            logger.error('RoleService_changeUserUsable ' + error)
        }
    }
}

module.exports = new RoleService()
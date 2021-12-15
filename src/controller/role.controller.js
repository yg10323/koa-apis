const RoleService = require('../service/role.service')
const logger = require('../utils/logHandle');
const { createToken } = require('../middleware/common.middleware')


class RoleController {

    // 根据role_id获取菜单
    async getMenu(ctx, next) {
        try {
            const { role_id } = ctx.user;
            const res = await RoleService.getMenu(role_id);
            ctx.body = {
                code: 200,
                message: "角色对应的菜单",
                menus: res
            }
        } catch (error) {
            logger.error('RoleController_getMenu ' + error)
        }
    }

    // admin下发token
    async login(ctx, next) {
        try {
            const { id, account, role_id, longKeep } = ctx.admin;
            const payload = { id, account, role_id };
            // 根据longKeep为web和app设置不同的有效期
            const expire = longKeep ? 60 * 60 * 24 * 365 * 100 : 60 * 60 * 24;
            const token = createToken(payload, expire);
            ctx.body = {
                code: 200,
                message: `${account}登录成功`,
                userInfo: { account, role_id },
                token
            }
        } catch (error) {
            logger.error('RoleController_login ' + error)
        }
    }

    // admin注册
    async register(ctx, next) {
        try {
            const { account, password } = ctx.admin;
            const res = await RoleService.addAdmin(account, password);
            ctx.body = {
                code: 200,
                id: res.insertId,
                message: '注册成功~'
            }
        } catch (error) {
            logger.error('RoleController_register ' + error)
        }
    }

    // 根据id删除admin
    async deleteAdminById(ctx, next) {
        try {
            const { id } = ctx.request.body;
            const res = await RoleService.deleteAdminById(id)
            ctx.body = {
                code: 200,
                message: '删除成功'
            }
        } catch (error) {
            logger.error('RoleController_deleteAdminById ' + error)
        }
    }

    // 根据id删除seller
    async deleteSellerById(ctx, next) {
        try {
            const { id } = ctx.request.body;
            const res = await RoleService.deleteSellerById(id)
            ctx.body = {
                code: 200,
                message: '删除成功'
            }
        } catch (error) {
            logger.error('RoleController_deleteSellerById ' + error)
        }
    }

    // 根据id删除buyer
    async deleteBuyerById(ctx, next) {
        try {
            const { id } = ctx.request.body;
            const res = await RoleService.deleteBuyerById(id)
            ctx.body = {
                code: 200,
                message: '删除成功'
            }
        } catch (error) {
            logger.error('RoleController_deleteSellerById ' + error)
        }
    }

    // 根据query获取admin/seller/buyer
    async getUserByQuery(ctx, next) {
        try {
            const { tableName, page, offset, keys, values, timeQuery } = ctx.queryInfo
            const res = await RoleService.getUserByQuery(tableName, page, offset, keys, values, timeQuery);
            ctx.body = {
                code: 200,
                data: res
            }

        } catch (error) {
            logger.error('RoleController_getUserByQuery ' + error)
        }
    }

    // 更改user的usable
    async changeUserUsable(ctx, next) {
        try {
            const { usable, id, role_id } = ctx.request.body;
            let tableName;
            if (role_id == 1) tableName = "admin"
            if (role_id == 2) tableName = "seller"
            if (role_id == 3) tableName = "buyer"
            const res = await RoleService.changeUserUsable(tableName, usable, id)
            ctx.body = {
                code: 200,
                message: '更新成功'
            }

        } catch (error) {
            logger.error('RoleController_changeUserUsable ' + error)
        }
    }

    // 添加user
    async addUser(ctx, next) {
        try {
            const tableName = ctx.tableName;
            const data = ctx.data
            const res = await RoleService.addUser(tableName, data)
            ctx.body = {
                code: 200,
                message: '添加用户成功'
            }
        } catch (error) {
            logger.error('RoleController_addUser ' + error)
        }
    }
}


module.exports = new RoleController()
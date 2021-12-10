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
}


module.exports = new RoleController()
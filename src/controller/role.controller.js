const RoleService = require('../service/role.service')
const logger = require('../utils/logHandle');


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
}


module.exports = new RoleController()
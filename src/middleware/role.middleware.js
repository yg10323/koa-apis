const errorTypes = require('../constants/errorTypes')
const SellerService = require('../service/seller.service')
const AdminService = require('../service/admin.service')
const logger = require('../utils/logHandle')


class RoleVerify {

    // 判断用户是否存在且是否可用
    async verifyUser(ctx, next) {
        try {
            const { account, role_id } = ctx.user;
            let Service;
            if (role_id === 2) {
                Service = SellerService;
            } else if (role_id === 1) {
                Service = AdminService
            }
            const res = await Service.getSellerByAccount(account);
            const user = res[0];
            if (!user) {
                const error = new Error(errorTypes.ACCOUNT_DOES_NOT_EXIST);
                return ctx.app.emit('error', error, ctx);
            }
            if (user.usable !== 1) {
                const error = new Error(errorTypes.ACCOUNT_HAS_BEEN_DISABLED);
                return ctx.app.emit('error', error, ctx)
            }

            await next()

        } catch (error) {
            logger.error('role_middleware_verifyUser ' + error)
        }
    }
}


module.exports = new RoleVerify()
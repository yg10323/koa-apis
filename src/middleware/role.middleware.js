const errorTypes = require('../constants/errorTypes')
const SellerService = require('../service/seller.service')
const RoleService = require('../service/role.service')
const logger = require('../utils/logHandle')
const { encryption } = require('./common.middleware')


class RoleVerify {

    // 判断用户是否存在且是否可用
    async verifyUser(ctx, next) {
        try {
            const { account, role_id } = ctx.user;
            const res = await SellerService.getSellerByAccount(account);
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

    // 判断用户是否存在且是否可用
    async verifyAdmin(ctx, next) {
        try {
            const { account, role_id } = ctx.user;
            const res = await RoleService.getAdminByAccount(account);
            const admin = res[0];
            if (!admin) {
                const error = new Error(errorTypes.ACCOUNT_DOES_NOT_EXIST);
                return ctx.app.emit('error', error, ctx);
            }
            if (admin.usable !== 1) {
                const error = new Error(errorTypes.ACCOUNT_HAS_BEEN_DISABLED);
                return ctx.app.emit('error', error, ctx)
            }

            await next()

        } catch (error) {
            logger.error('role_middleware_verifyUser ' + error)
        }
    }

    // admin登录验证
    async verifyLogin(ctx, next) {
        try {
            let { account, password, longKeep } = ctx.request.body
            // 1. 用户信息是否完整
            if (!account || !password) {
                const error = new Error(errorTypes.ACCOUNT_OR_PASSWORD_IS_EMPTY);
                return ctx.app.emit('error', error, ctx);
            }
            // 2. 用户是否存在
            const res = await RoleService.getAdminByAccount(account);
            const admin = res[0];
            if (!admin) {
                const error = new Error(errorTypes.ACCOUNT_DOES_NOT_EXIST);
                return ctx.app.emit('error', error, ctx);
            }
            // 3.密码是否正确
            password = encryption(password)
            if (password !== admin.password) {
                const error = new Error(errorTypes.PASSWORD_IS_WRONG)
                return ctx.app.emit('error', error, ctx)
            }
            // 4. 账号是否可用
            if (admin.usable !== 1) {
                const error = new Error(errorTypes.ACCOUNT_HAS_BEEN_DISABLED)
                return ctx.app.emit('error', error, ctx)
            }
            // 5. 保存信息, 准备下发token
            ctx.admin = { id: admin.id, role_id: admin.role_id, account, longKeep }
            await next();
        } catch (error) {
            logger.error('RoleVerify_verifyLogin ' + error)
        }
    }

    // admin注册验证
    async verifyRegister(ctx, next) {
        try {
            let { account, password } = ctx.request.body
            // 1. 用户信息是否完整
            if (!account || !password) {
                const error = new Error(errorTypes.ACCOUNT_OR_PASSWORD_IS_EMPTY);
                return ctx.app.emit('error', error, ctx);
            }
            // 2. 用户名是否存在
            const res = await SellerService.judgeSeller(account);
            if (res.length) {
                const error = new Error(errorTypes.ACCOUNT_ALREADY_EXIST);
                return ctx.app.emit('error', error, ctx);
            }
            // 3. 密码加密
            password = encryption(password);

            ctx.admin = { account, password };
            await next();

        } catch (error) {
            looger.error('RoleVerify_verifyRegister ' + error)
        }
    }
}


module.exports = new RoleVerify()
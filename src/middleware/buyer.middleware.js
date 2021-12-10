const errorTypes = require('../constants/errorTypes')
const logger = require('../utils/logHandle')
const { encryption } = require('./common.middleware')
const BuyerService = require('../service/buyer.service')


class BuyerVerify {

    // 注册验证
    async verifyRegister(ctx, next) {
        try {
            // 1. 提交的信息是否完整
            let { account, password } = ctx.request.body
            // 1. 用户信息是否完整
            if (!account || !password) {
                const error = new Error(errorTypes.ACCOUNT_OR_PASSWORD_IS_EMPTY);
                return ctx.app.emit('error', error, ctx);
            }
            // 2. 账号是否重复
            const res = await BuyerService.getBuyerByAccount(account)
            if (res.length) {
                const error = new Error(errorTypes.ACCOUNT_ALREADY_EXIST)
                return ctx.app.emit('error', error, ctx);
            }
            // 3. 密码加密
            password = encryption(password);

            ctx.buyer = { account, password };
            await next();
        } catch (error) {
            logger.error('BuyerVerify_verifyRegister ' + error)
        }
    }

    // 登录验证
    async verifyLogin(ctx, next) {
        try {
            let { account, password } = ctx.request.body
            // 1. 用户信息是否完整
            if (!account || !password) {
                const error = new Error(errorTypes.ACCOUNT_OR_PASSWORD_IS_EMPTY);
                return ctx.app.emit('error', error, ctx);
            }
            // 2. 用户是否存在
            const res = await BuyerService.getBuyerByAccount(account);
            const buyer = res[0];
            if (!buyer) {
                const error = new Error(errorTypes.ACCOUNT_DOES_NOT_EXIST);
                return ctx.app.emit('error', error, ctx);
            }
            // 3.密码是否正确
            password = encryption(password)
            if (password !== buyer.password) {
                const error = new Error(errorTypes.PASSWORD_IS_WRONG)
                return ctx.app.emit('error', error, ctx)
            }
            // 4. 账号是否可用
            if (buyer.usable !== 1) {
                const error = new Error(errorTypes.ACCOUNT_HAS_BEEN_DISABLED)
                return ctx.app.emit('error', error, ctx)
            }
            // 5. 保存信息, 准备下发token
            ctx.buyer = { id: buyer.id, role_id: buyer.role_id, account }
            await next();
        } catch (error) {
            logger.error('BuyerVerify_verifyLogin ' + error)
        }
    }

    // 验证是否有收货信息
    async verifySelfInfo(ctx, next) {
        try {
            let { account } = ctx.user;
            const res = await BuyerService.getBuyerByAccount(account)
            const buyer = res[0]
            if (!buyer.name || !buyer.address || !buyer.phone) {
                const error = new Error(errorTypes.INCOMPLETE_REAL_NAME_INFORMATION)
                return ctx.app.emit('error', error, ctx);
            }

            await next()
        } catch (error) {
            logger.error('BuyerVerify_verifySelfInfo ' + error)
        }
    }
}


module.exports = new BuyerVerify()
const errorTypes = require('../constants/errorTypes')
const SellerService = require('../service/seller.service')
const { encryption } = require('./common.middleware')
const looger = require('../utils/logHandle')

class SellerVerify {

    // 注册seller验证
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

            ctx.seller = { account, password };
            await next();

        } catch (error) {
            looger.error('注册seller的验证中间件 ' + error)
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
            const res = await SellerService.getSellerByAccount(account);
            const seller = res[0];
            if (!seller) {
                const error = new Error(errorTypes.ACCOUNT_DOES_NOT_EXIST);
                return ctx.app.emit('error', error, ctx);
            }
            // 3.密码是否正确
            password = encryption(password)
            if (password !== seller.password) {
                const error = new Error(errorTypes.PASSWORD_IS_WRONG)
                return ctx.app.emit('error', error, ctx)
            }
            // 4. 账号是否可用
            if (seller.usable === 0) {
                const error = new Error(errorTypes.ACCOUNT_HAS_BEEN_DISABLED)
                return ctx.app.emit('error', error, ctx)
            }
            // 5. 保存信息, 下发token
            ctx.seller = { id: seller.id, role_id: seller.role_id, account }
            await next();
        } catch (error) {
            looger.error('登陆seller的中间件 ' + error)
        }
    }
}



module.exports = new SellerVerify()
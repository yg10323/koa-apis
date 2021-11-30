const errorTypes = require('../constants/errorTypes')
const SellerService = require('../service/seller.service')
const { encryption } = require('./common.middleware')
const looger = require('../utils/logHandle')
const redis = require('../db/redis')
const logger = require('../utils/logHandle')
const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../constants/keys');


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
            looger.error('Seller==verifyRegister ' + error)
        }
    }

    // 登录验证
    async verifyLogin(ctx, next) {
        try {
            let { account, password, longKeep } = ctx.request.body
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
            // 5. 保存信息, 准备下发token
            ctx.seller = { sid: seller.sid, role_id: seller.role_id, account, longKeep }
            await next();
        } catch (error) {
            looger.error('Seller==verifyLogin ' + error)
        }
    }

    // 扫码登录验证
    async verifyScanLogin(ctx, next) {
        try {
            // 1. 获取手机端发来的qid、account、deviceId
            // console.log(ctx.request.body);
            const { qrinfo, token, deviceId } = ctx.request.body
            // 2. 通过查询redis判断deviceId是否一致
            const redisDeviceId = await redis.get(deviceId)
            // 当redis中的deviceId与app再次发来的不一致 或者 redis中没有找到app再次发来的deviceId
            if (redisDeviceId !== deviceId || !redisDeviceId) {
                const error = new Error(errorTypes.DEVICE_ID_DIFFERENT)
                return ctx.app.emit('error', error, ctx)
            }
            // 3. 通过查询redis判断二维码是否过期
            const redisQrinfo = await redis.get(qrinfo.sid);
            if (redisQrinfo !== JSON.stringify(qrinfo) || !redisQrinfo) {
                const error = new Error(errorTypes.QR_CODE_EXPIRED)
                return ctx.app.emit('error', error, ctx)
            }
            // 4. 解析token, 取出account
            const result = jwt.verify(token, PUBLIC_KEY, {
                algorithms: ["RS256"]
            })
            // 5. 根据token解析出的account查询数据库该用户是否存在
            const res = await SellerService.getSellerByAccount(result.account);
            const seller = res[0];
            if (!seller) {
                const error = new Error(errorTypes.ACCOUNT_DOES_NOT_EXIST);
                return ctx.app.emit('error', error, ctx);
            }
            // 6. 方行, 准备给web端下发token
            ctx.seller = {
                sid: seller.sid,
                role_id: seller.role_id,
                account: seller.account,
                longKeep: false,
                socketId: qrinfo.sid
            }
            await next();

        } catch (error) {
            logger.error('Seller==verifyScanLogin ' + error)
        }
    }
}



module.exports = new SellerVerify()
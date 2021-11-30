const SellerService = require('../service/seller.service')
const logger = require('../utils/logHandle');
const { createToken } = require('../middleware/common.middleware')
const redis = require('../db/redis')
const { BroadcastChannel } = require('broadcast-channel')


class SellerController {

    // 注册
    async register(ctx, next) {
        // console.log(ctx.request.files.avatar.path.match(/upload_.*/));
        try {
            const { account, password } = ctx.seller;
            // sid 由当前时间的时间戳生成, 几乎保证唯一性
            const sid = 'SH' + new Date().getTime()
            const res = await SellerService.addSeller(account, password, sid);
            ctx.body = {
                code: 200,
                id: res.insertId,
                message: '注册成功~'
            }
        } catch (error) {
            logger.error('注册seller时 ' + error)
        }
    }

    // 密码登录时, 下发token
    async login(ctx, next) {
        try {
            const { sid, account, role_id, longKeep } = ctx.seller;
            const payload = { sid, account, role_id };
            // 根据longKeep为web和app设置不同的有效期
            const expire = longKeep ? 60 * 60 * 24 * 365 * 100 : 60 * 60 * 24;
            const token = createToken(payload, expire);
            ctx.body = {
                code: 200,
                message: `${account}登录成功`,
                token
            }
        } catch (error) {
            logger.error('登录seller时 ' + error)
        }
    }

    // 保存device_id到redis(3分钟)
    async saveDeviceId(ctx, next) {
        const { deviceId } = ctx.request.body;
        // device_id保存十分钟
        redis.set(deviceId, deviceId, 60 * 3);
        await redis.disconnect();
    }

    // app扫码登录, 通过广播让socket给web端下发token
    // 与上方login的逻辑一致, 只是多了向socket广播下发token
    async scanLogin(ctx, next) {
        try {
            const { sid, account, role_id, longKeep, socketId } = ctx.seller;
            const payload = { sid, account, role_id };
            // 根据longKeep为web和app设置不同的有效期
            const expire = longKeep ? 60 * 60 * 24 * 365 * 100 : 60 * 60 * 24;
            const token = createToken(payload, expire);
            const obj = {
                socketId,
                req: {
                    code: 200,
                    message: `${account}登录成功`,
                    token
                }
            }
            // 广播给ScanCodeToWeb频道, 让socket下发token
            const ScanCodeToWeb = new BroadcastChannel('ScanCodeToWeb')
            ScanCodeToWeb.postMessage(obj)
            await ScanCodeToWeb.close()
        } catch (error) {
            logger.error('登录seller时 ' + error)
        }
    }
}

module.exports = new SellerController()
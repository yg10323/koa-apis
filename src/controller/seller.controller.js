const SellerService = require('../service/seller.service')
const ShopService = require('../service/shop.service')
const logger = require('../utils/logHandle');
const { createToken } = require('../middleware/common.middleware')
const redis = require('../db/redis')
const { BroadcastChannel } = require('broadcast-channel')



class SellerController {

    // 注册
    async register(ctx, next) {
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
            const { id, account, role_id, longKeep } = ctx.seller;
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
            const { id, account, role_id, longKeep, socketId } = ctx.seller;
            const payload = { id, account, role_id };
            // 根据longKeep为web和app设置不同的有效期
            const expire = longKeep ? 60 * 60 * 24 * 365 * 100 : 60 * 60 * 24;
            const token = createToken(payload, expire);
            const obj = {
                socketId,
                req: {
                    code: 200,
                    message: `${account}登录成功`,
                    userInfo: { account, role_id },
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

    // 注册店铺
    async createShop(ctx, next) {
        try {
            const shopInfo = ctx.user.arrayInfo;
            const res = await ShopService.createShop(shopInfo);
            // console.log(res);
            ctx.body = {
                code: 200,
                message: '注册店铺成功, 赶快添加食品吧~',
            }

        } catch (error) {
            logger.error('SellerController_createShop ' + error)
        }
    }

    // 获取个人信息
    async getSelfInfo(ctx, next) {
        try {
            const { id, account } = ctx.user;
            const selfInfo = await SellerService.getSellerByAccount(account);
            const shopInfo = await ShopService.getShopBySellerId(id)
            // 信息脱敏
            if (selfInfo[0].iid && selfInfo[0].phone) {
                let iid = selfInfo[0].iid,
                    phone = selfInfo[0].phone;
                iid = iid.substr(0, 2) + '*****' + iid.substr(iid.length - 2, iid.length)
                phone = phone.substr(0, 3) + '***' + phone.substr(phone.length - 2, phone.length)

                selfInfo[0].iid = iid;
                selfInfo[0].phone = phone;
            }
            ctx.body = {
                code: 200,
                data: {
                    selfInfo: selfInfo[0],
                    shopInfo
                }
            }
        } catch (error) {
            logger.error('SellerController_getSelfInfo ' + error)
        }
    }

    // 更新实名信息
    async updateAuthInfo(ctx, next) {
        try {
            const { id } = ctx.user;
            const infoObj = ctx.request.body;
            infoObj.id = id;
            const authInfo = Object.values(infoObj)
            const res = await SellerService.updateAuthInfo(authInfo)
            ctx.body = {
                code: 200,
                message: '实名认证成功, 可以注册店铺啦~'
            }
        } catch (error) {
            logger.error('SellerController_updateAuthInfo ' + error)
        }
    }

    // 注销账号
    async deleteSelf(ctx, next) {
        try {
            const { id } = ctx.user
            const res = await SellerService.deleteSelfById(id);
            ctx.body = {
                code: 200,
                message: '注销成功!'
            }
        } catch (error) {
            logger.error('SellerController_deleteSelf ' + error)
        }
    }
}

module.exports = new SellerController()
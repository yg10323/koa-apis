const SellerService = require('../service/seller.service')
const logger = require('../utils/logHandle');
const { createToken } = require('../middleware/common.middleware')

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

    // 登录, 下发token
    async login(ctx, next) {
        try {
            const { id, account, role_id } = ctx.seller;
            const payload = { id, account, role_id }
            const token = createToken(payload, 60 * 60 * 6)
            ctx.body = {
                code: 200,
                message: `${account}登录成功`,
                token
            }
        } catch (error) {
            logger.error('登录seller时 ' + error)
        }
    }
}

module.exports = new SellerController()
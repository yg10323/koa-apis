const logger = require('../utils/logHandle');
const { createToken } = require('../middleware/common.middleware')
const BuyerService = require('../service/buyer.service')
const FoodService = require('../service/food.service')


class BuyerController {

    // 注册
    async reigster(ctx, next) {
        try {
            const { account, password } = ctx.buyer;
            const res = await BuyerService.registerBuyer(account, password)
            if (res.insertId) {
                ctx.body = {
                    code: 200,
                    message: '注册成功'
                }
            }
        } catch (error) {
            logger.error('BuyerController_reigster ' + error)
        }
    }

    // 登录, 下发token
    async login(ctx, next) {
        try {
            const { id, account, role_id, longKeep } = ctx.buyer;
            const payload = { id, account, role_id };
            const expire = longKeep ? 60 * 60 * 24 * 365 * 100 : 60 * 60 * 24;
            const token = createToken(payload, expire);
            ctx.body = {
                code: 200,
                message: `${account}登录成功`,
                userInfo: ctx.buyerInfo,
                token
            }
        } catch (error) {
            logger.error('BuyerController_login ' + error)
        }
    }

    // 购买食品
    async purchase(ctx, next) {
        try {
            const { id } = ctx.user;
            const { food_info, taotal_price, pay_price } = ctx.request.body;
            const order_nu = 'OS' + new Date().getTime();
            const orderRes = await BuyerService.createOrder(order_nu, id, taotal_price, pay_price);
            if (orderRes.insertId) {
                const o_f_Res = await BuyerService.setOF(food_info, orderRes.insertId)
                const foodSoldRes = await FoodService.updateSold(food_info)
                // 更新已售字段
                ctx.body = {
                    code: 200,
                    message: '下单成功'
                }
            } else {
                ctx.body = {
                    code: 400,
                    message: '下单失败, 服务端发生异常, 请检查日志文件'
                }
            }

        } catch (error) {
            logger.error('BuyerController_purchase ' + error)
        }
    }

    // 更新收货信息
    async updateAddress(ctx, next) {
        try {
            const { id } = ctx.user;
            const { address, name, phone } = ctx.request.body
            const res = await BuyerService.updateAddress(address, name, phone, id)
            ctx.body = {
                code: 200,
                message: '更新收货信息成功'
            }
        } catch (error) {
            logger.error('BuyerController_updateAddress ' + error)
        }
    }

    // 获取个人订单
    async getOrder(ctx, next) {
        try {
            const { id } = ctx.user
            const orderData = await BuyerService.getOrder(id)
            ctx.body = {
                code: 200,
                data: res
            }
        } catch (error) {
            logger.error('BuyerController_getOrder ' + error)
        }
    }
}


module.exports = new BuyerController()
const errorTypes = require('../constants/errorTypes')

// 异常处理方法
const errorHandler = (error, ctx) => {
    let message, code;

    switch (error.message) {
        case errorTypes.ACCOUNT_OR_PASSWORD_IS_EMPTY:
            code = 400
            message = '用户名或密码为空'
            break;

        case errorTypes.ACCOUNT_ALREADY_EXIST:
            code = 400
            message = '用户名已存在'
            break;

        case errorTypes.ACCOUNT_DOES_NOT_EXIST:
            code = 400
            message = '账号不存在'
            break;

        case errorTypes.PASSWORD_IS_WRONG:
            code = 400
            message = '密码错误'
            break;

        case errorTypes.ACCOUNT_HAS_BEEN_DISABLED:
            code = 400
            message = '该账号已被封禁, 请联系管理员进行处理!'
            break;

        case errorTypes.UNAUTHORIZATION:
            code = 401
            message = '无效token或缺少缺失'
            break;

        case errorTypes.UNAUTHORIZED_OPERATION:
            code = 401
            message = '越权操作'
            break;

        case errorTypes.REAL_NAME_INFORMATION_ALREADY_EXIST:
            code = 403
            message = '实名信息已经存在'
            break;

        case errorTypes.INCOMPLETE_REAL_NAME_INFORMATION:
            code = 403
            message = '实名信息不完整'
            break;

        case errorTypes.WRONG_PERMISSIONS:
            code = 400
            message = '越权操作'
            break;
        case errorTypes.INFORMATION_MATCHING_FAILED:
            code = 400
            message = '信息匹对失败'
            break;

        case errorTypes.SHOP_ALREADY_EXIST:
            code = 400
            message = '店铺已存在'
            break;

        case errorTypes.SHOP_DOES_NOT_EXIST:
            code = 400
            message = '店铺不存在'
            break;

        case errorTypes.YOU_ALREADY_HAVE_A_SHOP:
            code = 400
            message = '你已经有一家店铺了,请勿重复注册'
            break;

        case errorTypes.SHOP_WAS_CLOSED:
            code = 400
            message = '店铺已关闭'
            break;

        case errorTypes.SHOP_HSA_BEEN_BLOCKED:
            code = 400
            message = '店铺被封禁'
            break;

        case errorTypes.FOOD_CLASSIFY_ALREADY_EXIST:
            code = 400
            message = '该食品分类已存在'
            break;

        case errorTypes.DEVICE_ID_DIFFERENT:
            code = 400
            message = 'device_id不一致'
            break;

        case errorTypes.QR_CODE_EXPIRED:
            code = 400
            message = '二维码已过期, 请重新扫码'
            break;

        default:
            code = 404
            message = 'NOT FOUND'
    }

    // 返回状态码以及提示信息
    ctx.body = {
        code,
        message
    }
}


module.exports = errorHandler
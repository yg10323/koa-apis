const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const errorTypes = require('../constants/errorTypes')
const logger = require('../utils/logHandle');
const { PRIVATE_KEY, PUBLIC_KEY } = require('../constants/keys');


// 密码加密
const encryption = (pwd) => {
    // update()不接收类型为number的参数
    let password = pwd.toString();
    const md5 = crypto.createHash('md5')
    // digest('hex') 结果是16进制, 为了可以表示16进制, 最终返回的结果是string
    const res = md5.update(password).digest('hex')
    return res;
}



// 生成token
const createToken = (payload, expires) => {
    try {
        const token = jwt.sign({ ...payload }, PRIVATE_KEY, {
            // token有效期为一天
            expiresIn: expires,
            // 加密算法
            algorithm: 'RS256'
        });
        return token;
    } catch (error) {
        logger.error('生成token时 ' + error)
        console.log(error);
    }
}


// 验证token
const verifyToken = async (ctx, next) => {
    // 获取请求头中的token
    const authorization = ctx.headers.authorization
    if (!authorization) {
        const error = new Error(errorTypes.UNAUTHORIZATION)
        return ctx.app.emit('error', error, ctx)
    }
    const token = authorization.replace('Bearer ', "")

    // 验证token
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"]
        })
        // 保存一下, 以后可能用到
        ctx.user = result
        await next()
    } catch (err) {
        const error = new Error(errorTypes.UNAUTHORIZATION)
        return ctx.app.emit('error', error, ctx)
    }
}



module.exports = {
    encryption,
    createToken,
    verifyToken
}
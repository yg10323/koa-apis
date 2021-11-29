const qr = require('qr-image')


const getQRcode = (str) => {
    // 根据 randomNumber 的随机字符串生成base64二维码
    return `data:image/png;base64,${qr.imageSync(str, { type: 'png' }).toString("base64")}`
}



module.exports = getQRcode

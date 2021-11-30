const qr = require('qr-image')


const getQRcode = (obj) => {
    // 二维码包含的信息为socke_id和随机字符串, 对应redis中的value
    return `data:image/png;base64,${qr.imageSync(JSON.stringify(obj), { type: 'png' }).toString("base64")}`
}



module.exports = getQRcode

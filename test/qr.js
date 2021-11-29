var random = require('string-random');
const qr = require('qr-image')

class Utils {

    // 产随机字符串
    randomNumber() {
        return 'login/' + random(16, { numbers: true })
    }

    // 根据 randomNumber 的随机随机字符串生成base64二维码
    getQRcode(str) {
        return `data:image/png;base64,${qr.imageSync(str, { type: 'png' }).toString("base64")}`

    }
}

const u = new Utils()
const str = u.randomNumber()
console.log(u.getQRcode(str));
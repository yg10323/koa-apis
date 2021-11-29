const webSocket = require('nodejs-websocket');

class WsClient {

    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
        this.client = webSocket.connect(`ws://${ip}:${port}`, () => {
            console.log(`连接: ws://${ip}:${port} 成功!`);

            this.client.on('text', () => {
                console.log(1);
                this.resetHeartCheck();
            })

            this.client.on('error', err => {
                console.log(err);
            })

            this.client.on('close', (code, msg) => {
                console.log(`连接关闭:${code},错误信息:${msg}`);
                this.reconnect();
            })

            this.heartCheck();
        })
    }

    reconnect() {
        this.timmer && clearTimeout(this.timmer);
        this.timmer = setTimeout(() => {
            new WsClient(this.ip, this.port);
        }, 1000);
    }
    // 心跳包
    heartCheck() {
        this.heartTimer = setInterval(() => {
            this.client.sendText(JSON.stringify({
                cmd: "heart",
                content: {}
            }))
        }, 4000);
    }
    // 重置心跳
    resetHeartCheck() {
        this.heartTimer && clearInterval(this.heartTimer);
        this.heartCheck();
    }

    static getInstance(ip, port) {
        return new WsClient(ip, port);
    }
}

// module.exports = WsClient.getInstance;
WsClient.getInstance('192.168.0.99', 1070);
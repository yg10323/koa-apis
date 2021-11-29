const Koa = require('koa');
const app = new Koa();
const http = require("http").createServer(app);
const random = require('string-random');
const { port } = require('../../config.json').web_socket_config;
const { nowTime } = require('../utils/formatTime')
const getQRcode = require('../utils/qrcode')
const { BroadcastChannel } = require('broadcast-channel')

const redis = require('../db/redis')

const socket = require("socket.io")(http, {
    allowEIO3: true,
    // 解决socket跨域
    cors: {
        // origin: ['http://localhost:8080', 'http://localhost:8081'],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// 监听客户端连接
socket.on("connection", socket => {

    console.log(`客户端${socket.handshake.address}已连接`);

    // 首次给客户端发送消息
    socket.emit("fromServer", '欢迎连接socket');

    // 监听客户端消息
    socket.on("fromClient", (data) => {
        data = JSON.parse(data)

        // 心跳回应
        if (data.cmd === 'heart') {
            // console.log('heart');
            let heartNews = JSON.stringify({
                cmd: 'heart',
                content: {
                    desc: "服务端在线!",
                    time: nowTime(new Date().getTime())
                }
            })
            socket.emit('fromServer', heartNews);

            // 下发二维码
        } else if (data.cmd === 'getQrCode') {
            let str = random(16, { numbers: true })
            redis.set(str, '', 10)

            let backNews = JSON.stringify({
                cmd: 'reply',
                content: {
                    desc: "base64格式数据",
                    data: getQRcode(str),
                    time: nowTime(new Date().getTime())
                }
            })
            socket.emit('fromServer', backNews)

        } else {
            // 异常数据格式处理
            let backNews = JSON.stringify({
                cmd: "error",
                content: {
                    desc: "请发送正确的数据格式!",
                    time: nowTime(new Date().getTime())
                }
            })
            socket.emit('fromServer', backNews)
        }
    })

    // 监听客户端断开
    socket.on("disconnect", () => {
        console.log(`客户端${socket.handshake.address}已断开`);
    });

    new BroadcastChannel('SubscribeExpire').onmessage = msg => socket.emit('fromServer', JSON.stringify({
        cmd: 'qrOverTime',
        content: {
            desc: "请重新请求二维码",
            time: nowTime(new Date().getTime())
        }
    }))

});



// console.log(1111111111);
// 启动socket服务
http.listen(port, function () {
    console.log(`socket服务启动成功,端口: ${port}`);
});
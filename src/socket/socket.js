const Koa = require('koa');
const app = new Koa();
const http = require("http").createServer(app);
const random = require('string-random');
const { port } = require('../../config.json').web_socket_config;
const { nowTime } = require('../utils/formatTime')
const getQRcode = require('../utils/qrcode')
const { BroadcastChannel } = require('broadcast-channel')

const redis = require('../db/redis')

const io = require("socket.io")(http, {
    allowEIO3: true,
    // 解决socket跨域
    cors: {
        // origin: ['http://localhost:8080', 'http://localhost:8081'],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// 监听客户端连接
io.on("connection", socket => {

    console.log(`客户端${socket.handshake.address}已连接`);
    console.log(`已连接的客户端数量: ${socket.server.eio.clientsCount}`);

    // 监听客户端二维码请求
    socket.on('getQrCode', async () => {
        //问题 socket通信建立以后, node进程会随着时间的推移打开的文件句柄增多
        // 一段时间后, 会出现句柄泄露导致程序崩掉
        // 暂时方案: 定时重启程序, 后面再回来考虑是否还有更好的解决方案

        // 保证每个客户端生成各自对应的二维码
        // 1. 先判断客户端是否已经获取过二维码了
        const res = await redis.get(socket.id)
        // 当没有获取的时候, 进行生成
        if (!res) {
            let qid = random(16, { numbers: true });
            // redis中的key是socke_id,确保二维码的唯一
            redis.set(socket.id, JSON.stringify({ sid: socket.id, qid }), 10);
            // qrInfo: 用于用户在手机端扫码时比对信息使用
            io.to(socket.id).emit('sendQrCode', { qr: getQRcode(str), qrInfo: { sid: socket.id, qid } })
        }
    });

    // 监听客户端断开
    socket.on("disconnect", () => {
        console.log(`客户端${socket.handshake.address}已断开`);
    });

    // 根据socket_id通知对应的socket客户端二维码过期了
    new BroadcastChannel('SubscribeExpire').onmessage = sid => io.to(sid).emit('qrOverTime')

})


// 启动socket服务
http.listen(port, function () {
    console.log(`socket服务启动成功,端口: ${port}`);
});
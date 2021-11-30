const redis = require("redis");
const { redis_config } = require('../../config.json')
const { BroadcastChannel } = require('broadcast-channel')


class Redis {

    constructor() {
        this.client = redis.createClient({
            host: redis_config.host,
            port: redis_config.port,
        });

        this.client.on("connect", () => {
            console.log(`redis已连接, 端口: ${redis_config.port}`);
        });

        this.client.on("error", function (error) {
            console.error(error);
        });

        // 设置过期事件的类型并订阅频道
        this.client.sendCommand('config', ['set', 'notify-keyspace-events', 'Ex'], this.SubscribeExpired);
    }

    // 获取value, 返回的是Promise
    async get(key) {
        return new Promise((resolve) => {
            this.client.get(key, (err, res) => resolve(res));
        })
    }

    // 存入键值对以及key有效时间(秒)
    set(key, value, expire) {
        this.client.set(key, value);
        this.client.expire(key, expire)
    }

    // 订阅 __keyevent@db__:expired 频道来接收key过期时间
    SubscribeExpired(e, r) {
        let sub = redis.createClient(6379);
        const expired_subKey = '__keyevent@0__:expired';
        sub.subscribe(expired_subKey, function () {
            sub.on('message', function (chan, msg) {
                // console.log(`key：${msg} 已过期... `);
                // 广播二维码过期
                new BroadcastChannel('SubscribeExpire').postMessage(msg);
            });
        })
    }

}

module.exports = new Redis()


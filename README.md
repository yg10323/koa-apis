
# koa-apis
外卖点餐系统的后端接口, 对应的前台点餐系统: [uniapp-order](https://github.com/yg10323/uniapp-order) 和 后台管理系统: [vue-cms](https://github.com/yg10323/vue-cms)

## config.json
克隆到本地以后, 请修改config.json中的配置项，参照如下
因扫码登陆需要配合redis使用, 如果没有安装redis, 请不要打开`index.js`中的socket文件引入，并将db/redis.js中的导出注释

![image](https://user-images.githubusercontent.com/48284901/154799686-4f29a4b5-16b1-4e4d-bb16-6b4c6a0ed56f.png)



## redis相关说明
使用3.x版本而不是最新的4.x版本
https://github.com/redis/node-redis/blob/master/packages/client/CHANGELOG.md

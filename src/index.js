const Koa = require('koa');
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');
const cors = require('koa2-cors');
const mapRoutes = require('./router');
const errorHandler = require('./utils/errorHandle')
const path = require('path');
const { port } = require('../config.json').app_config;
require('./db/db');//标记连接数据库, 正式发布时注释
// require('./socket/socket');//启动socket服务5

const app = new Koa();

// 处理跨域
app.use(cors({ origin: "*" }));
// 数据解析 + 图片上传
app.use(KoaBody({
    multipart: true,//允许多张图像上传
    formidable: {
        uploadDir: path.join(__dirname, 'public/upload'),
        keepExtensions: true,
        maxFieldsSize: 2 * 1024 * 1024
    }
}));
// 静态资源服务器
app.use(KoaStatic(path.join(__dirname, 'public')));
// 注册路由
mapRoutes(app);
// 异常处理
app.on('error', errorHandler)


// koa服务
app.listen(port, () => {
    console.log(`koa服务已启动, 端口: ${port}`);
})
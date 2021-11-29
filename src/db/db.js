const mysql2 = require('mysql2')
const { db_config } = require('../../config')
const logger = require('../utils/logHandle')


// 创建连接池
const connections = mysql2.createPool({
    host: db_config.host,
    port: db_config.port,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database
})


// 连接测试
connections.getConnection((err, ctx) => {
    if (err) {
        console.log('数据库连接失败: ', err);
        logger.error('连接数据库出错 ' + err);
    } else {
        console.log('数据库已连接, 端口:', db_config.port);
    }
})



module.exports = connections.promise()
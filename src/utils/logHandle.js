const log4js = require('log4js')

// logger配置
log4js.configure({
  appenders: { cheese: { type: "file", filename: 'error.log' } },
  categories: { default: { appenders: ['cheese'], level: ['error'] } }
})

const logger = log4js.getLogger('cheese')


module.exports = logger

// fs.statSync(__dirname + `/log.js`).size 字节
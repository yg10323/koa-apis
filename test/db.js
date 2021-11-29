
const { Sequelize } = require('sequelize')

// db的实例
class dbInstance {
    constructor() {
        // 存放sequelize连接
        // key为database + host + port, value为sequelize的实例
        this.sequelizeInstance = {}
    }

    // 单例模式
    static getInstance() {
        if (!dbInstance.instance) {
            dbInstance.instance = new dbInstance();
        }

        return dbInstance.instance;
    }

    // 返回sequelize的实例
    // this.sequelizeInstance 如果有就直接返回，否则new 一个新的实例，并把键值对加入this.sequelizeInstance中
    // 参数dbInfo 包括database、host、port、dbAccount、dbPassword
    getSequelizeInstance(dbInfo) {
        if (!dbInfo.database || !dbInfo.host || !dbInfo.port) {
            console.log('缺少database或者host');
            return false;
        }

        const seqKey = '' + dbInfo.database + dbInfo.host + dbInfo.port;

        // 存在就返回
        if (this.sequelizeInstance[seqKey]) return this.sequelizeInstance[seqKey];

        // 不存在，先创建
        if (!dbInfo.user || !dbInfo.password) {
            console.log('缺少username或者password');
            return false;
        }
        this.sequelizeInstance[seqKey] = new Sequelize(dbInfo.database, dbInfo.user, dbInfo.password, {
            host: dbInfo.host,
            dialect: 'mysql',
            port: dbInfo.port,
            timezone: "+08:00",
            logging: false,
            query: { raw: true }
        })

        return this.sequelizeInstance[seqKey];
    }

}

module.exports = dbInstance.getInstance();
// const { DataTypes, Model } = require('sequelize');
// const { db_config } = require('../../config.json');
// const sequelize = require('../db/db').getSequelizeInstance(db_config);

// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// })()

class dbInstance {

    constructor(name) {
        this.name = name;
        console.log(this.name);
    }

    static getInstance() {
        if (!dbInstance.instance) {
            dbInstance.instance = new dbInstance('test');
        }

        return dbInstance.instance;
    }
}

dbInstance.getInstance()
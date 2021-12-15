const errorTypes = require('../constants/errorTypes')
const SellerService = require('../service/seller.service')
const BuyerService = require('../service/buyer.service')
const RoleService = require('../service/role.service')
const logger = require('../utils/logHandle')
const { encryption } = require('./common.middleware')
const { nowTime } = require('../utils/formatTime')

class RoleVerify {

    // 判断用户是否存在且是否可用
    async verifyUser(ctx, next) {
        try {
            const { account, role_id } = ctx.user;
            const res = await SellerService.getSellerByAccount(account);
            const user = res[0];
            if (!user) {
                const error = new Error(errorTypes.ACCOUNT_DOES_NOT_EXIST);
                return ctx.app.emit('error', error, ctx);
            }
            if (user.usable !== 1) {
                const error = new Error(errorTypes.ACCOUNT_HAS_BEEN_DISABLED);
                return ctx.app.emit('error', error, ctx)
            }

            await next()

        } catch (error) {
            logger.error('role_middleware_verifyUser ' + error)
        }
    }

    // 判断用户是否存在且是否可用
    async verifyAdmin(ctx, next) {
        try {
            const { account, role_id } = ctx.user;
            const res = await RoleService.getAdminByAccount(account);
            const admin = res[0];
            if (!admin) {
                const error = new Error(errorTypes.ACCOUNT_DOES_NOT_EXIST);
                return ctx.app.emit('error', error, ctx);
            }
            if (admin.usable !== 1) {
                const error = new Error(errorTypes.ACCOUNT_HAS_BEEN_DISABLED);
                return ctx.app.emit('error', error, ctx)
            }

            await next()

        } catch (error) {
            logger.error('role_middleware_verifyUser ' + error)
        }
    }

    // admin登录验证
    async verifyLogin(ctx, next) {
        try {
            let { account, password, longKeep } = ctx.request.body
            // 1. 用户信息是否完整
            if (!account || !password) {
                const error = new Error(errorTypes.ACCOUNT_OR_PASSWORD_IS_EMPTY);
                return ctx.app.emit('error', error, ctx);
            }
            // 2. 用户是否存在
            const res = await RoleService.getAdminByAccount(account);
            const admin = res[0];
            if (!admin) {
                const error = new Error(errorTypes.ACCOUNT_DOES_NOT_EXIST);
                return ctx.app.emit('error', error, ctx);
            }
            // 3.密码是否正确
            password = encryption(password)
            if (password !== admin.password) {
                const error = new Error(errorTypes.PASSWORD_IS_WRONG)
                return ctx.app.emit('error', error, ctx)
            }
            // 4. 账号是否可用
            if (admin.usable !== 1) {
                const error = new Error(errorTypes.ACCOUNT_HAS_BEEN_DISABLED)
                return ctx.app.emit('error', error, ctx)
            }
            // 5. 保存信息, 准备下发token
            ctx.admin = { id: admin.id, role_id: admin.role_id, account, longKeep }
            await next();
        } catch (error) {
            logger.error('RoleVerify_verifyLogin ' + error)
        }
    }

    // admin注册验证
    async verifyRegister(ctx, next) {
        try {
            let { account, password } = ctx.request.body
            // 1. 用户信息是否完整
            if (!account || !password) {
                const error = new Error(errorTypes.ACCOUNT_OR_PASSWORD_IS_EMPTY);
                return ctx.app.emit('error', error, ctx);
            }
            // 2. 用户名是否存在
            const res = await SellerService.judgeSeller(account);
            if (res.length) {
                const error = new Error(errorTypes.ACCOUNT_ALREADY_EXIST);
                return ctx.app.emit('error', error, ctx);
            }
            // 3. 密码加密
            password = encryption(password);

            ctx.admin = { account, password };
            await next();

        } catch (error) {
            looger.error('RoleVerify_verifyRegister ' + error)
        }
    }

    // 删除admin时验证level
    async verifyAdminLevel(ctx, next) {
        try {
            const deleteAccount = ctx.request.body.account;
            const { account } = ctx.user;
            const deleteAdmin = await RoleService.getAdminByAccount(deleteAccount);
            // 眼删除的账号是否存在
            if (!deleteAdmin.length) {
                const error = new Error(errorTypes.ACCOUNT_DOES_NOT_EXIST)
                return ctx.app.emit('error', error, ctx)
            }
            const adminInfo = await RoleService.getAdminByAccount(account);
            // 登录账号是否封禁
            if (adminInfo[0].usable !== 1) {
                const error = new Error(errorTypes.ACCOUNT_HAS_BEEN_DISABLED)
                return ctx.app.emit('error', error, ctx)
            }
            // 不允许level非1的admin删除其他admin账号
            if (adminInfo[0].level !== 1) {
                const error = new Error(errorTypes.UNAUTHORIZED_OPERATION)
                return ctx.app.emit('error', error, ctx)
            }

            await next()
        } catch (error) {
            logger.error('RoleVerify_verifyAdminLevel ' + error)
        }
    }

    // 根据query获取admin/seller/buyer
    async dealUserQueryData(ctx, next) {
        try {
            const queryData = ctx.request.body;
            ctx.body = queryData
            // 表名
            const tableName = queryData.role;
            delete queryData.role
            // 分页
            let page = queryData.page;
            let offset = queryData.offset
            if (!page || !offset || page < 1 || offset < 1) {
                page = 1, offset = 10;
            }
            page = (page - 1) * offset;
            delete queryData.page
            delete queryData.offset
            // 如果有时间筛选
            const timeQuery = {};
            if (queryData.time) {
                let startTime = nowTime(new Date(queryData.time[0]).getTime())
                let endTime = nowTime(new Date(queryData.time[1]).getTime())
                delete queryData.time

                timeQuery.startTime = startTime
                timeQuery.endTime = endTime
            }
            // sql的keys与values
            const keys = Object.keys(queryData)
            const values = Object.values(queryData)


            ctx.queryInfo = { tableName, page, offset, keys, values, timeQuery }
            await next();

        } catch (error) {
            logger.error('RoleVerify_dealUserData ' + error)
        }
    }

    // 添加user时数据处理
    async dealUserAddData(ctx, next) {
        try {
            const data = ctx.request.body;
            const tableName = data.option;
            delete data.option;
            // 1.判断账号是否已经存在
            if (tableName == 'admin' || 'seller') {
                const res = await SellerService.judgeSeller(data.account)
                if (res.length) {
                    const error = new Error(errorTypes.ACCOUNT_ALREADY_EXIST);
                    return ctx.app.emit('error', error, ctx);
                }
            }
            if (tableName == 'buyer') {
                const res = await BuyerService.getBuyerByAccount(data.account)
                if (res.length) {
                    const error = new Error(errorTypes.ACCOUNT_ALREADY_EXIST);
                    return ctx.app.emit('error', error, ctx);
                }
            }
            // 2. 密码加密
            data.password = encryption(data.password);
            ctx.tableName = tableName;
            ctx.data = data;
            await next()
        } catch (error) {
            logger.error('RoleVerify_dealUserAddData ' + error)
        }
    }
}


module.exports = new RoleVerify()
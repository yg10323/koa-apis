
-- --------------------------------权限表 start------------------------------------
DROP TABLE IF EXISTS `role`;

CREATE TABLE IF NOT EXISTS `role`(
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`role_id` INT NOT NULL UNIQUE COMMENT 'role_id唯一',
	`role` VARCHAR(15) NOT NULL COMMENT '角色: root/user',
	`identity` VARCHAR(15) NOT NULL COMMENT '身份: 管理员/卖家/买家/骑手',
	`usable` INT DEFAULT 1 COMMENT '是否可用',
	`createTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO `role` (`role_id`, `role`,`identity`) VALUES (1001,'root','admin');
INSERT INTO `role` (`role_id`, `role`,`identity`) VALUES (1002,'user','seller');
INSERT INTO `role` (`role_id`, `role`,`identity`) VALUES (1003,'user','buyer');
INSERT INTO `role` (`role_id`, `role`,`identity`) VALUES (1004,'user','rider');

-- --------------------------------权限表 end------------------------------------



-- --------------------------------管理员表 start------------------------------------
DROP TABLE IF EXISTS `admin`;

CREATE TABLE IF NOT EXISTS `admin`(
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`account` VARCHAR(30) NOT NULL UNIQUE,
	`password` VARCHAR(60) NOT NULL,
	`role_id` INT DEFAULT 1 ,
	`usable` INT DEFAULT 1,
	`level` INT DEFAULT 2 COMMENT '标识管理员等级, 默认通过注册添加的为2级',
	`createTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	
	FOREIGN KEY(`role_id`) REFERENCES role(`id`)
);

INSERT INTO `admin` (`account`,`password`,`level`) VALUES ('super','super',1);


-- 注册时查询两张表中是否已存在该account
SELECT account FROM seller WHERE account = '111'
UNION ALL
SELECT account FROM admin WHERE account = '111'



SELECT COUNT(*) totalCount FROM buyer;

SELECT * FROM admin LIMIT 0,30;


DELETE FROM admin WHERE id = ?; 

SELECT * FROM admin WHERE id = 4 AND createTime BETWEEN '2021-12-8 0:0:0' AND '2022-1-10 0:0:0'

SELECT * FROM admin WHERE id LIKE '%1%' LIMIT 0, 10

SELECT * FROM admin createTime BETWEEN ? AND ? LIMIT ?, ?

UPDATE admin SET usable = ? WHERE id = ?;


-- --------------------------------管理员表 end------------------------------------


-- --------------------------------买家表 start------------------------------------

DROP TABLE IF EXISTS `buyer`;

CREATE TABLE IF NOT EXISTS `buyer`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`account` VARCHAR(30) NOT NULL COMMENT '账号',
	`password` VARCHAR(128) NOT NULL COMMENT '密码',
	`name` VARCHAR(20) DEFAULT NULL COMMENT '姓名',
	`address` VARCHAR(300) DEFAULT NULL COMMENT '收货地址',
	`phone` VARCHAR(20) DEFAULT NULL COMMENT '电话',
	`role_id` INT DEFAULT 3,
	`usable` INT DEFAULT 1,
	`createTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	
	PRIMARY KEY(`id`),
	FOREIGN KEY(`role_id`) REFERENCES role(`id`)
)


SELECT * FROM buyer WHERE account = ?;
INSERT INTO buyer (account, `password`) VALUES (?, ?);

UPDATE buyer SET address = ? , name = ?, phone = ? WHERE id = ?;



-- --------------------------------评论表 start------------------------------------



-- --------------------------------评论表 end------------------------------------


-- --------------------------------卖家表 start------------------------------------

-- seller注册信息
DROP TABLE IF EXISTS `seller`;

CREATE TABLE IF NOT EXISTS `seller`(
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`account` VARCHAR(30) NOT NULL UNIQUE COMMENT '账号不允许重复',
	`password` VARCHAR(128) NOT NULL,
	`name` VARCHAR(20) DEFAULT NULL COMMENT '姓名',
	`iid` VARCHAR(20) DEFAULT NULL UNIQUE COMMENT '身份证号,唯一',
	`phone` VARCHAR(20) DEFAULT NULL UNIQUE COMMENT '手机号,唯一',
	`role_id` INT DEFAULT 2,
	`usable` INT DEFAULT 1 COMMENT '是否可用',
	`sid` VARCHAR(30) DEFAULT NULL UNIQUE COMMENT 'seller标识,唯一',
	`avatar_url` VARCHAR(1000) DEFAULT NULL COMMENT '头像地址',
	`createTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	
	FOREIGN KEY(`role_id`) REFERENCES role(`id`)
);

-- 注册时查询两张表中是否已存在该account
SELECT account FROM seller WHERE account = '111'
UNION ALL
SELECT account FROM admin WHERE account = '111'

INSERT INTO seller (account,`password`) VALUES (?, ?);


UPDATE seller SET name= ? , iid = ?, phone = ? WHERE id = ?;

DELETE FROM seller WHERE id = ?; 
-- --------------------------------卖家表 end------------------------------------


-- --------------------------------shop------------------------------------

DROP TABLE IF EXISTS `shop`;

CREATE TABLE IF NOT EXISTS `shop`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`seller_id` INT NOT NULL UNIQUE COMMENT 'seller_id',
	`name` VARCHAR(30) NOT NULL COMMENT '店铺名',
	`address` VARCHAR(1000) NOT NULL COMMENT '店铺地址',
	`start_time` VARCHAR(30) NOT NULL COMMENT '开始营业时间',
	`end_time` VARCHAR(30) NOT NULL COMMENT '结束营业时间',
	`mountain_plan` INT NOT NULL COMMENT '青山计划,默认加入',
	`service` VARCHAR(100) NOT NULL COMMENT '商家服务',
	`delivery` VARCHAR(30) NOT NULL COMMENT '配送形式',
	`activities` VARCHAR(2000) DEFAULT NULL COMMENT '活动',
	`shop_avatar_url` VARCHAR(1000) NOT NULL COMMENT '店铺头像_url',
	`business_permit_url` VARCHAR(1000) NOT NULL COMMENT '经营许可证_url',
	`health_certificate_url` VARCHAR(1000) NOT NULL COMMENT '营业执照_url',
	`op_id` INT NOT NULL COMMENT '一级分类id',
	`ch_id` INT NOT NULL COMMENT '二级分类id',
	`notice` VARCHAR(1000) DEFAULT NULL COMMENT '公告',
	`usable` INT DEFAULT 1 COMMENT '店铺是否可用',
	`createTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	
	PRIMARY KEY(`id`),
-- 	seller注销后, 对应的店铺信息也联动删除
	FOREIGN KEY(`seller_id`) REFERENCES `seller`(`id`) ON DELETE CASCADE
)

INSERT INTO shop (seller_id,name,address,start_time,end_time,mountain_plan,service,delivery,
									activities,shop_avatar_url,business_permit_url,health_certificate_url,op_id,ch_id)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);


SELECT * FROM shop WHERE seller_id = 7;
SELECT * FROM shop WHERE name = ?;

SELECT options,child FROM shop_classify WHERE ch_id = 2001;

UPDATE shop SET                  WHERE seller_id = ?;

UPDATE shop SET activities = ? WHERE seller_id = ?;


-- 店铺分类

DROP TABLE IF EXISTS `shop_classify`;

CREATE TABLE IF NOT EXISTS `shop_classify`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`op_id` INT NOT NULL COMMENT '一级分类的id',
	`options` VARCHAR(30) NOT NULL COMMENT '一级分类',
	`ch_id` INT NOT NULL COMMENT '二级分类的id',
	`child` VARCHAR(30) NOT NULL COMMENT '二级分类',
		PRIMARY KEY(`id`)
);

SELECT * FROM shop_classify GROUP BY op_id;




-- --------------------------------------food-------------------------------------

DROP TABLE IF EXISTS `food`

CREATE TABLE IF NOT EXISTS `food`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`shop_id` INT NOT NULL COMMENT '所属店铺id',
	`name` VARCHAR(100) NOT NULL COMMENT '食品名, 必需',
	`cost` FLOAT(5,2) NOT NULL COMMENT '成本,必需',
	`price` FLOAT(6, 2) NOT NULL COMMENT '价格, 必需',
	`discount` FLOAT(1,2) NOT NULL COMMENT '折扣,必需',
	`extra` FLOAT(5, 2) NOT NULL COMMENT '打包费,必需',
	`least` INT(4) NOT NULL COMMENT '起购数,必需, 提交时最小数字必须为 1',
	`single_point` INT NOT NULL COMMENT '单点不送,1:true,0:false',
	`avatar_url` VARCHAR(1000) NOT NULL COMMENT '食品图片, 必需',
	`sold` INT(10) NOT NULL DEFAULT 0 COMMENT '已售出, 默认为0',
	`desci` VARCHAR(1000) DEFAULT NULL COMMENT '描述',
	`tips` VARCHAR(50) DEFAULT NULL COMMENT '小提示,暂时没想好放哪',
	`package_content` VARCHAR(500) DEFAULT NULL COMMENT '套餐内容',
	`main_material` VARCHAR(100) DEFAULT NULL COMMENT '主料',
	`secondary_material` VARCHAR(100) DEFAULT NULL COMMENT '辅料',
	`meat_vegetable` VARCHAR(20) DEFAULT NULL COMMENT '荤素',
	`weight` VARCHAR(30) DEFAULT NULL COMMENT '份量',
	`flavor` VARCHAR(30) DEFAULT NULL COMMENT '口味',
	`good_comment` INT DEFAULT 0 COMMENT '好评数',
	`bad_comment` INT DEFAULT 0 COMMENT '差评数',
	
	`createTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	
	PRIMARY KEY(`id`),
	FOREIGN KEY(`shop_id`) REFERENCES `shop`(`id`) ON DELETE CASCADE
)

INSERT INTO food (shop_id,name,cost,price,discount,extra,least,single_point,avatar_url) 
						VALUES (?,?,?,?,?,?,?,?);


SELECT food.* FROM food WHERE shop_id = 2;

SELECT f.*, fc.id food_classify_id, fc.classify food_classify FROM f_fc 
	LEFT JOIN food f on f.id = f_fc.f_id 
	LEFT JOIN food_classify fc on fc.id = f_fc.fc_id
WHERE f_fc.s_id = 2 GROUP BY f.id;


DELETE FROM food WHERE id = ?; 


SELECT id FROM food WHERE shop_id = 2;


UPDATE food SET  `desc` = '你好啊' WHERE id = 8;




SELECT id, name ,price, sold FROM food WHERE shop_id = 2;

SELECT 
	o.id, o.total_price, o.pay_price,f.name, f.cost, f.price,f.discount,f.extra
FROM o_f 
	LEFT JOIN orders o ON o.id = o_f.o_id
	LEFT JOIN food f ON f.id = o_f.f_id
WHERE o_f.s_id = 2 ORDER BY id

-- ------食品分类         食品:食品分类 => m:n

DROP TABLE IF EXISTS`food_classify`;

CREATE TABLE IF NOT EXISTS `food_classify`(
	id INT NOT NULL AUTO_INCREMENT,
	classify VARCHAR(50) NOT NULL COMMENT '食品分类',
	PRIMARY KEY(`id`)
)

INSERT INTO food_classify (classify) VALUES ('你好评'),('好啊')





DROP TABLE IF EXISTS `f_fc`;

CREATE TABLE IF NOT EXISTS `f_fc`(
	id INT NOT NULL AUTO_INCREMENT,
	s_id INT DEFAULT NULL COMMENT 'shop_id',
	f_id INT DEFAULT NULL COMMENT 'food_id',
	fc_id INT DEFAULT NULL COMMENT 'food_classify_id',
	
	PRIMARY KEY(`id`),
	FOREIGN KEY(`s_id`) REFERENCES `shop`(`id`) ON DELETE CASCADE ,
	FOREIGN KEY(`f_id`) REFERENCES `food`(`id`) ON DELETE CASCADE,
	FOREIGN KEY(`fc_id`) REFERENCES `food_classify`(`id`) ON DELETE CASCADE
)


SELECT f.id food_id, f.name food_name, fc.id food_classify_id, fc.classify food_classify FROM f_fc 
	LEFT JOIN food f on f.id = f_fc.f_id 
	LEFT JOIN food_classify fc on fc.id = f_fc.fc_id
WHERE f_fc.s_id = 2 GROUP BY food_classify


INSERT INTO f_fc(s_id, f_id, fc_id) VALUES (?, ?, ?);

DELETE FROM f_fc WHERE f_id = ?;



-- -------------------------------order------------------------------------

DROP TABLE IF EXISTS `orders`;

CREATE TABLE IF NOT EXISTS `orders`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`buyer_id` INT NOT NULL COMMENT '用户id',
	`order_number` VARCHAR(1000) DEFAULT NULL COMMENT '订单编号, 后端按时间戳生成',
	`pay_mode` VARCHAR(10) DEFAULT '线上支付' COMMENT '支付方式',
	`total_price` FLOAT(5,2) NOT NULL COMMENT '订单总金额',
	`pay_price` FLOAT(5,2) NOT NULL COMMENT '实际支付金额',
	`done` INT(2) DEFAULT 1 COMMENT '订单状态: 0 已完成  1 进行中 2 已取消',
	`evaluated` INT(2) DEFAULT 0 COMMENT '订单是否评价: 0 未评价 1已评价',
	`update_flag` INT(2) DEFAULT 1 COMMENT '用于定时任务, 1 今天的订单  0  往日的订单',
	`createTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`buyer_id`) REFERENCES `buyer`(`id`) ON DELETE CASCADE
)


INSERT INTO order (order_number,buyer_id, total_price, pay_price) VALUE (?, ?, ?);


-- 今日订单
SELECT 
	o.*, JSON_OBJECT('name', b.name, 'address',b.address,'phone',b.phone) buyer_info,
			 JSON_OBJECT('name',f.name, 'cost', f.cost,'price',f.price,'discount',f.discount,'extra',f.extra) food_info
FROM o_f 
	LEFT JOIN orders o ON o.id = o_f.o_id
	LEFT JOIN buyer b ON b.id = o.buyer_id
	LEFT JOIN food f ON f.id = o_f.f_id
WHERE o_f.s_id = 2 AND o.update_flag = 1

-- 所有
SELECT 
	o.*,
	JSON_OBJECT('id',s.id,'name', s.name, 'avatar_url',s.shop_avatar_url, 'op_id',s.op_id) shop_info, 
	JSON_OBJECT('name', b.name, 'address',b.address,'phone',b.phone) buyer_info, 
	JSON_OBJECT('shop_id',f.shop_id,'name',f.name, 'avatar_url',f.avatar_url, 'price',f.price,'discount',f.discount,'extra',f.extra) food_info
FROM o_f 
	LEFT JOIN orders o ON o.id = o_f.o_id
	LEFT JOIN shop s ON s.id = o_f.s_id
	LEFT JOIN buyer b ON b.id = o.buyer_id
	LEFT JOIN food f ON f.id = o_f.f_id
WHERE o_f.s_id = 2 ORDER BY o.id

-- 个人订单
SELECT 
	o.*,
	JSON_OBJECT('id',s.id,'name', s.name) shop_info, 
	JSON_OBJECT('name', b.name, 'address',b.address,'phone',b.phone) buyer_info, 
	JSON_OBJECT('shop_id',f.shop_id,'name',f.name, 'avatar_url',f.avatar_url, 'price',f.price,'discount',f.discount,'extra',f.extra) food_info
FROM o_f 
	LEFT JOIN orders o ON o.id = o_f.o_id
	LEFT JOIN shop s ON s.id = o_f.s_id
	LEFT JOIN buyer b ON b.id = o.buyer_id
	LEFT JOIN food f ON f.id = o_f.f_id
WHERE o.buyer_id = 1 ORDER BY id



-- order_food 关系表
DROP TABLE IF EXISTS `o_f`;

CREATE TABLE IF NOT EXISTS `o_f`(
	`id` INT NOT NULL AUTO_INCREMENT,
-- 	`b_id` INT DEFAULT NULL COMMENT 'buyer_id',
	`s_id` INT DEFAULT NULL COMMENT 'shop_id',
	`f_id` INT DEFAULT NULL COMMENT 'food_id',
	`o_id` INT DEFAULT NULL COMMENT 'order_id',
	
	PRIMARY KEY(`id`),
-- 	FOREIGN KEY(`b_id`) REFERENCES `buyer`(`id`),
	FOREIGN KEY(`s_id`) REFERENCES `shop`(`id`) ON DELETE CASCADE,
	FOREIGN KEY(`f_id`) REFERENCES `food`(`id`) ON DELETE CASCADE,
	FOREIGN KEY(`o_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
)

INSERT INTO o_f (s_id, f_id, o_id) VALUES (?, ?, ?);




-- -------------------------------evaluate  评价------------------------------------

DROP TABLE IF EXISTS `evaluate`;

CREATE TABLE IF NOT EXISTS `evaluate`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`order_id` INT NOT NULL COMMENT '订单id',
	`shop_id` INT NOT NULL COMMENT '店铺id',
	`food_id` INT NOT NULL COMMENT '食品id',
	`buyer_id` INT DEFAULT NULL COMMENT '买家id',
	`seller_id` INT DEFAULT NULL COMMENT '卖家id',
	`content` VARCHAR(1500) DEFAULT NULL COMMENT '评论内容',
	`evaluate_id` INT DEFAULT NULL COMMENT 'evaluate_id',
	`createTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	
	PRIMARY KEY(`id`),
	FOREIGN KEY(`evaluate_id`) REFERENCES `evaluate`(`id`) ON DELETE CASCADE
);


INSERT INTO `evaluate` (order_id, shop_id, food_id, buyer_id, content) VALUES (?, ?, ?, ?, ?);

-- -------------------------------menu------------------------------------
DROP TABLE IF EXISTS `menu`;

CREATE TABLE IF NOT EXISTS `menu`(
	`id` INT(10) NOT NULL UNIQUE COMMENT '菜单id',
	`pid` INT DEFAULT NULL COMMENT '父菜单的id',
	`type` INT(2) NOT NULL COMMENT '标识是几级菜单',
	`role_id` INT(100) NOT NULL COMMENT '该菜单对应的权限角色',
	`path` VARCHAR(100) DEFAULT NULL COMMENT '导航栏路由路径',
	`name` VARCHAR(30) DEFAULT NULL COMMENT '路由名',
	`icon` VARCHAR(100) DEFAULT NULL COMMENT '菜单的图标',
	`title` VARCHAR(30) DEFAULT NULL COMMENT '菜单名',
	
	PRIMARY KEY(`id`)
);

-- admin

INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1015,NULL,1, 1,'/main/overview','overview','el-icon-s-home','系统总览');

INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1016,NULL,1, 1,NULL,'admin','el-icon-coordinate','系统管理');
INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1017,1016,2, 1,'/main/admin/user','user',NULL,'用户管理');



INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1018,1016,2, 1,'/main/admin/shop','shop',NULL,'店铺管理');

INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1019,1016,2, 1,'/main/admin/comment','bill',NULL,'评价管理');

INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1020,1016,2, 1,'/main/shop/comment','comment',NULL,'工单管理');


INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1021,1016,2, 1,'/main/shop/comment','comment',NULL,'信息统计');








INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1000,NULL,1, 2,'/main/overview','overview','el-icon-s-home','系统总览');



INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1001,NULL,1, 2,NULL,'shop','el-icon-s-shop','我的店铺');
INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1002,1001,2, 2,'/main/shop/register','register',NULL,'注册店铺');
INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1003,1001,2, 2,'/main/shop/info','shopInfo',NULL,'店铺信息');
INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1004,1001,2, 2,'/main/shop/bill','bill',NULL,'店铺流水');
INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1005,1001,2, 2,'/main/shop/comment','comment',NULL,'店铺评价');



INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1006,NULL,1, 2,NULL,'food','el-icon-food','菜品中心');
INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1007,1006,2, 2,'/main/food/add','add',NULL,'新增菜品');
INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1008,1006,2, 2,'/main/food/info','foodInfo',NULL,'菜品信息');


INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1009,NULL,1, 2,NULL,'order','el-icon-s-claim','订单管理');
INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1010,1009,2, 2,'/main/order/today','today',NULL,'今日订单');
INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1011,1009,2, 2,'/main/order/all','all',NULL,'全部订单');


INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)

VALUES (1012,NULL,1, 2,NULL,'profile','el-icon-user-solid','个人中心');
INSERT INTO `menu` (id, pid, type, role_id, path, `name`, icon, title)
VALUES (1013,1012,2, 2,'/main/profile/myself','myself',NULL,'我的信息');
INSERT INTO `menu` (id, pid, type, role_id, path, `name`,  icon, title)
VALUES (1014,1012,2, 2,'/main/profile/feedback','feedback',NULL,'工单反馈');



SELECT * FROM menu m WHERE m.pid IS NULL AND m.role_id = 2;

SELECT * FROM menu m WHERE m.pid = 1001 AND m.role_id = 2;




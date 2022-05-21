/*
 Navicat Premium Data Transfer

 Source Server         : 华为云
 Source Server Type    : MySQL
 Source Server Version : 50730
 Source Host           : 124.70.20.215:3306
 Source Schema         : design

 Target Server Type    : MySQL
 Target Server Version : 50730
 File Encoding         : 65001

 Date: 21/05/2022 09:51:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role_id` int(11) NULL DEFAULT 1,
  `usable` int(11) NULL DEFAULT 1,
  `level` int(11) NULL DEFAULT 2 COMMENT '标识管理员等级, 默认通过注册添加的为2级',
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `account`(`account`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'super', '1b3231655cebb7a1f783eddf27d254ca', 1, 1, 1, '2021-12-01 12:03:06', '2021-12-14 22:36:54');
INSERT INTO `admin` VALUES (14, 'admin13', '202cb962ac59075b964b07152d234b70', 1, 0, 2, '2021-12-15 09:11:54', '2022-05-07 15:10:28');
INSERT INTO `admin` VALUES (15, 'admin14', '202cb962ac59075b964b07152d234b70', 1, 0, 2, '2021-12-15 09:11:57', '2022-05-07 15:10:29');
INSERT INTO `admin` VALUES (16, 'admin15', '202cb962ac59075b964b07152d234b70', 1, 1, 2, '2021-12-15 09:12:01', '2021-12-15 09:12:01');
INSERT INTO `admin` VALUES (17, 'admin16', '202cb962ac59075b964b07152d234b70', 1, 1, 2, '2021-12-15 09:12:05', '2021-12-15 09:12:05');
INSERT INTO `admin` VALUES (18, 'admin17', '202cb962ac59075b964b07152d234b70', 1, 1, 2, '2021-12-15 09:12:09', '2021-12-15 09:12:09');
INSERT INTO `admin` VALUES (19, 'admin18', '202cb962ac59075b964b07152d234b70', 1, 1, 2, '2021-12-15 09:12:13', '2021-12-15 09:12:13');
INSERT INTO `admin` VALUES (20, 'admin19', '202cb962ac59075b964b07152d234b70', 1, 1, 2, '2021-12-15 09:12:16', '2021-12-15 09:12:16');
INSERT INTO `admin` VALUES (21, 'admin20', '202cb962ac59075b964b07152d234b70', 1, 1, 2, '2021-12-15 09:12:21', '2021-12-15 09:12:21');
INSERT INTO `admin` VALUES (22, 'admin21', '123', 1, 1, 2, '2021-12-15 11:06:29', '2021-12-31 15:23:40');
INSERT INTO `admin` VALUES (24, 'admin', '21232f297a57a5a743894a0e4a801fc3', 1, 1, 1, '2021-12-18 19:04:11', '2021-12-18 19:04:11');
INSERT INTO `admin` VALUES (25, 'admin100', '81dc9bdb52d04dc20036dbd8313ed055', 1, 1, 2, '2022-04-04 19:38:38', '2022-04-04 19:38:38');

-- ----------------------------
-- Table structure for buyer
-- ----------------------------
DROP TABLE IF EXISTS `buyer`;
CREATE TABLE `buyer`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账号',
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `address` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '收货地址',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电话',
  `role_id` int(11) NULL DEFAULT 3,
  `usable` int(11) NULL DEFAULT 1,
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  CONSTRAINT `buyer_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of buyer
-- ----------------------------
INSERT INTO `buyer` VALUES (1, '111', '698d51a19d8a121ce581499d7b701668', '猫猫', '福建省', '18312398645', 3, 1, '2021-12-09 15:08:20', '2022-02-19 17:32:16');
INSERT INTO `buyer` VALUES (2, 'buyer1', '202cb962ac59075b964b07152d234b70', NULL, NULL, '1223214', 3, 1, '2021-12-15 11:55:22', '2021-12-15 11:55:22');
INSERT INTO `buyer` VALUES (3, 'buyer2', '202cb962ac59075b964b07152d234b70', NULL, NULL, '1223214', 3, 0, '2021-12-15 11:55:28', '2021-12-15 11:55:52');
INSERT INTO `buyer` VALUES (4, 'buyer3', '202cb962ac59075b964b07152d234b70', NULL, NULL, '1223214', 3, 1, '2021-12-15 11:55:34', '2021-12-15 11:55:34');
INSERT INTO `buyer` VALUES (5, 'bbb', '202cb962ac59075b964b07152d234b70', NULL, NULL, '123423412', 3, 1, '2021-12-15 16:23:58', '2021-12-15 16:23:58');
INSERT INTO `buyer` VALUES (6, '1212', '698d51a19d8a121ce581499d7b701668', '杨', '河南省', '1686234616', 3, 1, '2022-01-18 15:41:55', '2022-01-23 22:16:06');
INSERT INTO `buyer` VALUES (7, '1111', 'b0baee9d279d34fa1dfd71aadb908c3f', NULL, NULL, NULL, 3, 1, '2022-02-24 15:10:18', '2022-02-24 15:10:18');
INSERT INTO `buyer` VALUES (8, 'admin', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, 3, 1, '2022-02-26 19:34:48', '2022-02-26 19:34:48');
INSERT INTO `buyer` VALUES (9, 'huangyun', '24284c53f54c4ae5dca357a93f5b75e8', NULL, NULL, NULL, 3, 1, '2022-04-05 10:44:06', '2022-04-05 10:44:06');
INSERT INTO `buyer` VALUES (10, '222', 'bcbe3365e6ac95ea2c0343a2395834dd', 'asf', 'asf', 'asf', 3, 1, '2022-04-05 11:48:14', '2022-04-05 11:49:48');

-- ----------------------------
-- Table structure for evaluate
-- ----------------------------
DROP TABLE IF EXISTS `evaluate`;
CREATE TABLE `evaluate`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL COMMENT '订单id',
  `shop_id` int(11) NOT NULL COMMENT '店铺id 数组形式',
  `food_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '食品id 数组形式',
  `buyer_id` int(11) NULL DEFAULT NULL COMMENT '买家id',
  `seller_id` int(11) NULL DEFAULT NULL COMMENT '卖家id',
  `content` varchar(1500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '评论内容',
  `evaluate_id` int(11) NULL DEFAULT NULL COMMENT 'evaluate_id',
  `reply` varchar(1500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '店家回复',
  `rate` int(11) NOT NULL COMMENT '评分',
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `evaluate_id`(`evaluate_id`) USING BTREE,
  CONSTRAINT `evaluate_ibfk_1` FOREIGN KEY (`evaluate_id`) REFERENCES `evaluate` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of evaluate
-- ----------------------------
INSERT INTO `evaluate` VALUES (2, 13, 2, '[8,7,10]', 1, NULL, '#小炒肉##青椒盖浇饭##波波奶茶#', NULL, '', 5, '2022-02-24 09:03:29', '2022-02-24 21:52:34');
INSERT INTO `evaluate` VALUES (5, 15, 2, '[9]', 1, 7, '哼', 5, '感谢您的评价!', 2, '2022-02-24 15:09:48', '2022-02-24 21:57:12');
INSERT INTO `evaluate` VALUES (6, 20, 2, '[8,12]', 10, NULL, 'dva', NULL, NULL, 5, '2022-04-05 11:50:20', '2022-04-05 11:50:20');
INSERT INTO `evaluate` VALUES (7, 24, 6, '[17,17,17,17,17]', 1, NULL, '好吃哦', NULL, NULL, 5, '2022-05-01 23:14:32', '2022-05-01 23:14:32');
INSERT INTO `evaluate` VALUES (8, 23, 6, '[16,16,16]', 1, 21, '阿斯顿', 8, '11111111111111111111111111', 5, '2022-05-01 23:14:36', '2022-05-07 15:08:52');
INSERT INTO `evaluate` VALUES (9, 26, 4, '[11,11,11]', 1, NULL, '而我尔尔', NULL, NULL, 5, '2022-05-07 15:08:27', '2022-05-07 15:08:27');

-- ----------------------------
-- Table structure for f_fc
-- ----------------------------
DROP TABLE IF EXISTS `f_fc`;
CREATE TABLE `f_fc`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_id` int(11) NULL DEFAULT NULL COMMENT 'shop_id',
  `f_id` int(11) NULL DEFAULT NULL COMMENT 'food_id',
  `fc_id` int(11) NULL DEFAULT NULL COMMENT 'food_classify_id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `s_id`(`s_id`) USING BTREE,
  INDEX `f_id`(`f_id`) USING BTREE,
  INDEX `fc_id`(`fc_id`) USING BTREE,
  CONSTRAINT `f_fc_ibfk_1` FOREIGN KEY (`s_id`) REFERENCES `shop` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `f_fc_ibfk_2` FOREIGN KEY (`f_id`) REFERENCES `food` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `f_fc_ibfk_3` FOREIGN KEY (`fc_id`) REFERENCES `food_classify` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of f_fc
-- ----------------------------
INSERT INTO `f_fc` VALUES (8, 4, 11, 24);
INSERT INTO `f_fc` VALUES (9, 6, 15, 25);
INSERT INTO `f_fc` VALUES (10, 6, 15, 26);
INSERT INTO `f_fc` VALUES (11, 6, 16, 27);
INSERT INTO `f_fc` VALUES (12, 6, 16, 28);
INSERT INTO `f_fc` VALUES (13, 6, 17, 29);
INSERT INTO `f_fc` VALUES (14, 7, 18, 30);

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `seller_id` int(11) NOT NULL,
  `feedback_id` int(11) NULL DEFAULT NULL,
  `type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `belong` int(11) NULL DEFAULT NULL,
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `seller_id`(`seller_id`) USING BTREE,
  INDEX `feedback_id`(`feedback_id`) USING BTREE,
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`feedback_id`) REFERENCES `feedback` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 55 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of feedback
-- ----------------------------
INSERT INTO `feedback` VALUES (22, '测试1', '你好,admin', 7, NULL, 'feedback', NULL, '2021-12-16 11:19:28', '2021-12-16 11:19:28');
INSERT INTO `feedback` VALUES (23, '测试1', '来自admin的回复: 你好,用户', 7, 22, 'reply', 22, '2021-12-16 11:20:05', '2021-12-16 11:20:05');
INSERT INTO `feedback` VALUES (24, '测试1', '来自111的回复: 这是我的回复', 7, 23, 'reply', 22, '2021-12-16 11:20:25', '2021-12-16 11:20:25');
INSERT INTO `feedback` VALUES (25, '测试2', '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', 7, NULL, 'feedback', NULL, '2021-12-16 11:21:04', '2021-12-16 11:21:04');
INSERT INTO `feedback` VALUES (26, '测试2', '来自admin的回复: 笑什么呢', 7, 25, 'reply', 25, '2021-12-16 11:30:03', '2021-12-16 11:30:03');
INSERT INTO `feedback` VALUES (27, '测试2', '来自111的回复: 没什么,哈哈哈哈哈', 7, 26, 'reply', 25, '2021-12-16 11:30:19', '2021-12-16 11:30:19');
INSERT INTO `feedback` VALUES (28, '测试2', '来自admin的回复: 呵呵呵', 7, 27, 'reply', 25, '2021-12-16 11:30:43', '2021-12-16 11:30:43');
INSERT INTO `feedback` VALUES (29, '测试3', '你好啊', 7, NULL, 'feedback', NULL, '2021-12-16 11:31:02', '2021-12-16 11:31:02');
INSERT INTO `feedback` VALUES (30, '测试2', '来自111的回复: 这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,这是一段超长的文本测试,', 7, 28, 'reply', 25, '2021-12-16 11:46:29', '2021-12-16 11:46:29');
INSERT INTO `feedback` VALUES (31, '测试1', '来自admin的回复: 我收到了.', 7, 24, 'reply', 22, '2021-12-17 12:55:49', '2021-12-17 12:55:49');
INSERT INTO `feedback` VALUES (32, '测试1', '来自admin的回复: 工单反馈的测试内容可以反馈给用户', 7, 22, 'reply', 22, '2021-12-31 17:26:27', '2021-12-31 17:26:27');
INSERT INTO `feedback` VALUES (37, '11111111', '12qwe', 7, NULL, 'feedback', NULL, '2022-01-12 17:59:45', '2022-01-12 17:59:45');
INSERT INTO `feedback` VALUES (38, '测试1', '来自111的回复: over', 7, 32, 'reply', 22, '2022-01-12 18:00:07', '2022-01-12 18:00:07');
INSERT INTO `feedback` VALUES (39, '店铺被封禁了', '为什么我的店铺无缘无故被封了????', 7, NULL, 'feedback', NULL, '2022-01-24 09:27:51', '2022-01-24 09:27:51');
INSERT INTO `feedback` VALUES (40, '店铺被封禁了', '来自admin的回复: 您好, 请提供您的店铺名称', 7, 39, 'reply', 39, '2022-01-24 09:28:27', '2022-01-24 09:28:27');
INSERT INTO `feedback` VALUES (41, '店铺被封禁了', '来自111的回复: 我烤🥓', 7, 40, 'reply', 39, '2022-01-24 09:28:58', '2022-01-24 09:28:58');
INSERT INTO `feedback` VALUES (42, '店铺被封禁了', '来自admin的回复: 您好, 已为您解封', 7, 41, 'reply', 39, '2022-01-24 09:29:21', '2022-01-24 09:29:21');
INSERT INTO `feedback` VALUES (43, '店铺被封禁了', '来自111的回复: 谢谢', 7, 42, 'reply', 39, '2022-01-28 14:39:38', '2022-01-28 14:39:38');
INSERT INTO `feedback` VALUES (44, '2.19', '111111111', 7, NULL, 'feedback', NULL, '2022-02-19 19:30:30', '2022-02-19 19:30:30');
INSERT INTO `feedback` VALUES (45, '2.19', '来自admin的回复: 2222222', 7, 44, 'reply', 44, '2022-02-19 19:30:53', '2022-02-19 19:30:53');
INSERT INTO `feedback` VALUES (46, '测试3', '来自admin的回复: 111', 7, 29, 'reply', 29, '2022-04-04 19:43:14', '2022-04-04 19:43:14');
INSERT INTO `feedback` VALUES (47, '测试3', '来自admin的回复: 111', 7, 46, 'reply', 29, '2022-04-04 19:43:30', '2022-04-04 19:43:30');
INSERT INTO `feedback` VALUES (48, '2.19', '来自111的回复: 33333333', 7, 45, 'reply', 44, '2022-04-08 18:22:00', '2022-04-08 18:22:00');
INSERT INTO `feedback` VALUES (49, '我需要帮助', '帮助我', 27, NULL, 'feedback', NULL, '2022-05-07 09:57:25', '2022-05-07 09:57:25');
INSERT INTO `feedback` VALUES (50, '我需要帮助', '来自admin的回复: 帮你什么', 27, 49, 'reply', 49, '2022-05-07 09:57:51', '2022-05-07 09:57:51');
INSERT INTO `feedback` VALUES (51, '我需要帮助', '来自wo1的回复: 时间风华高科剪短发', 27, 50, 'reply', 49, '2022-05-07 09:58:23', '2022-05-07 09:58:23');
INSERT INTO `feedback` VALUES (52, '我需要帮助', '斯蒂芬斯的观点是法国', 21, NULL, 'feedback', NULL, '2022-05-07 15:09:36', '2022-05-07 15:09:36');
INSERT INTO `feedback` VALUES (53, '我需要帮助', '来自admin的回复: u一样UI也UI雨', 21, 52, 'reply', 52, '2022-05-07 15:10:00', '2022-05-07 15:10:00');
INSERT INTO `feedback` VALUES (54, '我需要帮助', '来自1111的回复: 发挥规范化', 21, 53, 'reply', 52, '2022-05-07 15:10:11', '2022-05-07 15:10:11');

-- ----------------------------
-- Table structure for food
-- ----------------------------
DROP TABLE IF EXISTS `food`;
CREATE TABLE `food`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) NOT NULL COMMENT '所属店铺id',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '食品名, 必需',
  `cost` float(5, 2) NOT NULL COMMENT '成本, 必需',
  `price` float(6, 2) NOT NULL COMMENT '价格, 必需',
  `discount` float(4, 2) NOT NULL COMMENT '折扣,必需',
  `extra` float(4, 2) NOT NULL COMMENT '打包费,必需',
  `least` int(4) NOT NULL COMMENT '起购数,必需',
  `single_point` int(11) NOT NULL COMMENT '单点不送,1:true,0:false',
  `avatar_url` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '食品图片, 必需',
  `sold` int(10) NOT NULL DEFAULT 0 COMMENT '已售出, 默认为0',
  `desci` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述',
  `tips` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '小提示,暂时没想好放哪',
  `package_content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '套餐内容',
  `main_material` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '主料',
  `secondary_material` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '辅料',
  `meat_vegetable` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '荤素',
  `weight` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '份量',
  `flavor` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '口味',
  `good_comment` int(11) NULL DEFAULT 0 COMMENT '好评数',
  `bad_comment` int(11) NULL DEFAULT 0 COMMENT '差评数',
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `shop_id`(`shop_id`) USING BTREE,
  CONSTRAINT `food_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of food
-- ----------------------------
INSERT INTO `food` VALUES (11, 4, '卤肉饭', 8.00, 14.00, 0.95, 1.00, 1, 0, 'http://124.70.20.215:2140/upload/upload_bf40b6280fb0b605199d33984cac0e03.ico', 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-01-27 19:32:55', '2022-05-07 15:04:02');
INSERT INTO `food` VALUES (12, 6, '1212', 6.00, 12.00, 0.00, 1.00, 1, 0, 'http://124.70.20.215:2140/upload/upload_aec892056e2357d660cf3248bf5e4b1c.ico', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-05-01 22:02:45', '2022-05-01 22:02:45');
INSERT INTO `food` VALUES (13, 6, '1212', 6.00, 12.00, 0.00, 1.00, 1, 0, 'http://124.70.20.215:2140/upload/upload_2eac7f30f52e6685d3ccde4e6ce4862e.ico', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-05-01 22:02:48', '2022-05-01 22:02:48');
INSERT INTO `food` VALUES (14, 6, '1212', 6.00, 12.00, 0.00, 1.00, 1, 0, 'http://124.70.20.215:2140/upload/upload_a6dedfaa4130b0381fb02e3207bca737.ico', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-05-01 22:03:10', '2022-05-01 22:03:10');
INSERT INTO `food` VALUES (15, 6, '1212', 6.00, 12.00, 0.00, 1.00, 1, 0, 'http://124.70.20.215:2140/upload/upload_28e6b6bbb3995f36486ff0932c2a2ae0.ico', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-05-01 22:04:59', '2022-05-07 15:02:44');
INSERT INTO `food` VALUES (16, 6, '盖浇饭', 12.00, 23.00, 0.80, 2.00, 1, 0, 'http://124.70.20.215:2140/upload/upload_2cea5f71c90b5348279d8b59ec46a47e.ico', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-05-01 22:10:54', '2022-05-01 23:13:38');
INSERT INTO `food` VALUES (17, 6, '而已', 1.00, 1.00, 1.00, 1.00, 1, 0, 'http://124.70.20.215:2140/upload/upload_f9f44b82e27bc11dade94f3606ad3a46.ico', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-05-01 22:14:21', '2022-05-01 23:14:26');
INSERT INTO `food` VALUES (18, 7, '波波奶茶', 1.00, 10.00, 0.80, 1.00, 1, 0, 'http://124.70.20.215:2140/upload/upload_60f0671f457623129f3c4e7b93984eef.ico', 1, NULL, NULL, '1111', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-05-07 09:55:17', '2022-05-07 15:02:45');

-- ----------------------------
-- Table structure for food_classify
-- ----------------------------
DROP TABLE IF EXISTS `food_classify`;
CREATE TABLE `food_classify`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classify` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '食品分类',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of food_classify
-- ----------------------------
INSERT INTO `food_classify` VALUES (3, '你好评');
INSERT INTO `food_classify` VALUES (4, '好啊');
INSERT INTO `food_classify` VALUES (5, '阿斯达');
INSERT INTO `food_classify` VALUES (6, '开发机构');
INSERT INTO `food_classify` VALUES (7, '阿斯达');
INSERT INTO `food_classify` VALUES (8, '开发机构');
INSERT INTO `food_classify` VALUES (9, '阿斯达');
INSERT INTO `food_classify` VALUES (10, '开发机构');
INSERT INTO `food_classify` VALUES (11, '你爱上的来客');
INSERT INTO `food_classify` VALUES (12, 'l;erp');
INSERT INTO `food_classify` VALUES (13, '领导风格');
INSERT INTO `food_classify` VALUES (14, ';oiklre;t');
INSERT INTO `food_classify` VALUES (15, '领导风格');
INSERT INTO `food_classify` VALUES (16, ';oiklre;t');
INSERT INTO `food_classify` VALUES (17, '烧烤');
INSERT INTO `food_classify` VALUES (18, '美味盖浇饭');
INSERT INTO `food_classify` VALUES (19, '新的');
INSERT INTO `food_classify` VALUES (20, '新的分类');
INSERT INTO `food_classify` VALUES (21, '小炒');
INSERT INTO `food_classify` VALUES (22, '小炒');
INSERT INTO `food_classify` VALUES (23, '奶茶');
INSERT INTO `food_classify` VALUES (24, '好吃的');
INSERT INTO `food_classify` VALUES (25, '好吃的');
INSERT INTO `food_classify` VALUES (26, '盖浇饭');
INSERT INTO `food_classify` VALUES (27, '老客户');
INSERT INTO `food_classify` VALUES (28, '，。举报');
INSERT INTO `food_classify` VALUES (29, '引入');
INSERT INTO `food_classify` VALUES (30, '可口白茶');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` int(10) NOT NULL COMMENT '菜单id',
  `pid` int(11) NULL DEFAULT NULL COMMENT '父菜单的id',
  `type` int(2) NOT NULL COMMENT '标识是几级菜单',
  `role_id` int(100) NOT NULL COMMENT '该菜单对应的权限角色',
  `path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '导航栏路由路径',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '路由名',
  `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '菜单的图标',
  `title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '菜单名',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1000, NULL, 1, 2, '/main/overview', 'overview', 'el-icon-s-home', '系统总览');
INSERT INTO `menu` VALUES (1001, NULL, 1, 2, NULL, 'shop', 'el-icon-s-shop', '我的店铺');
INSERT INTO `menu` VALUES (1002, 1001, 2, 2, '/main/shop/register', 'register', NULL, '注册店铺');
INSERT INTO `menu` VALUES (1003, 1001, 2, 2, '/main/shop/info', 'shopInfo', NULL, '店铺信息');
INSERT INTO `menu` VALUES (1004, 1001, 2, 2, '/main/shop/bill', 'bill', NULL, '店铺流水');
INSERT INTO `menu` VALUES (1005, 1001, 2, 2, '/main/shop/comment', 'comment', NULL, '店铺评价');
INSERT INTO `menu` VALUES (1006, NULL, 1, 2, NULL, 'food', 'el-icon-food', '食品中心');
INSERT INTO `menu` VALUES (1007, 1006, 2, 2, '/main/food/add', 'add', NULL, '新增食品');
INSERT INTO `menu` VALUES (1008, 1006, 2, 2, '/main/food/info', 'foodInfo', NULL, '食品信息');
INSERT INTO `menu` VALUES (1009, NULL, 1, 2, NULL, 'order', 'el-icon-s-claim', '订单管理');
INSERT INTO `menu` VALUES (1010, 1009, 2, 2, '/main/order/today', 'today', NULL, '今日订单');
INSERT INTO `menu` VALUES (1011, 1009, 2, 2, '/main/order/all', 'all', NULL, '全部订单');
INSERT INTO `menu` VALUES (1012, NULL, 1, 2, NULL, 'profile', 'el-icon-user-solid', '个人中心');
INSERT INTO `menu` VALUES (1013, 1012, 2, 2, '/main/profile/myself', 'myself', NULL, '我的信息');
INSERT INTO `menu` VALUES (1014, 1012, 2, 2, '/main/profile/feedback', 'feedback', NULL, '工单反馈');
INSERT INTO `menu` VALUES (1015, NULL, 1, 1, '/main/overview', 'overview', 'el-icon-s-home', '系统总览');
INSERT INTO `menu` VALUES (1016, NULL, 1, 1, NULL, 'admin', 'el-icon-coordinate', '系统管理');
INSERT INTO `menu` VALUES (1017, 1016, 2, 1, '/main/admin/user', 'user', NULL, '用户管理');
INSERT INTO `menu` VALUES (1018, 1016, 2, 1, '/main/admin/shop', 'shop', NULL, '店铺管理');
INSERT INTO `menu` VALUES (1019, 1016, 2, 1, '/main/admin/order', 'order', NULL, '订单管理');
INSERT INTO `menu` VALUES (1020, 1016, 2, 1, '/main/admin/feedback', 'feedback', NULL, '工单反馈');
INSERT INTO `menu` VALUES (1021, 1012, 2, 2, '/main/profile/my_feedback', 'my_feedback', NULL, '我的工单');

-- ----------------------------
-- Table structure for o_f
-- ----------------------------
DROP TABLE IF EXISTS `o_f`;
CREATE TABLE `o_f`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_id` int(11) NULL DEFAULT NULL COMMENT 'shop_id',
  `f_id` int(11) NULL DEFAULT NULL COMMENT 'food_id',
  `o_id` int(11) NULL DEFAULT NULL COMMENT 'order_id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `s_id`(`s_id`) USING BTREE,
  INDEX `f_id`(`f_id`) USING BTREE,
  INDEX `o_id`(`o_id`) USING BTREE,
  CONSTRAINT `o_f_ibfk_1` FOREIGN KEY (`s_id`) REFERENCES `shop` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `o_f_ibfk_2` FOREIGN KEY (`f_id`) REFERENCES `food` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `o_f_ibfk_3` FOREIGN KEY (`o_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 55 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of o_f
-- ----------------------------
INSERT INTO `o_f` VALUES (34, 4, 11, 17);
INSERT INTO `o_f` VALUES (37, 4, 11, 18);
INSERT INTO `o_f` VALUES (39, 4, 11, 19);
INSERT INTO `o_f` VALUES (40, 4, 11, 22);
INSERT INTO `o_f` VALUES (41, 6, 16, 23);
INSERT INTO `o_f` VALUES (42, 6, 16, 23);
INSERT INTO `o_f` VALUES (43, 6, 16, 23);
INSERT INTO `o_f` VALUES (44, 6, 17, 24);
INSERT INTO `o_f` VALUES (45, 6, 17, 24);
INSERT INTO `o_f` VALUES (46, 6, 17, 24);
INSERT INTO `o_f` VALUES (47, 6, 17, 24);
INSERT INTO `o_f` VALUES (48, 6, 17, 24);
INSERT INTO `o_f` VALUES (49, 6, 15, 25);
INSERT INTO `o_f` VALUES (50, 4, 11, 25);
INSERT INTO `o_f` VALUES (51, 7, 18, 25);
INSERT INTO `o_f` VALUES (52, 4, 11, 26);
INSERT INTO `o_f` VALUES (53, 4, 11, 26);
INSERT INTO `o_f` VALUES (54, 4, 11, 26);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buyer_id` int(11) NOT NULL COMMENT '用户id',
  `order_number` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '订单编号, 后端按时间戳生成',
  `pay_mode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '线上支付' COMMENT '支付方式',
  `total_price` float(5, 2) NOT NULL COMMENT '订单总金额',
  `pay_price` float(5, 2) NOT NULL COMMENT '实际支付金额',
  `done` int(2) NULL DEFAULT 1 COMMENT '订单状态: 0 已完成  1 进行中 2 已取消',
  `evaluated` int(2) NOT NULL DEFAULT 0 COMMENT '订单是否评价: 0 未评价 1 已评价',
  `update_flag` int(2) NULL DEFAULT 1 COMMENT '用于定时任务, 1 今天的订单  0  往日的订单',
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `buyer_id`(`buyer_id`) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (2, 1, 'OS1639044205', '线上支付', 21.00, 13.00, 0, 0, 0, '2021-12-09 18:03:25', '2022-04-22 16:31:22');
INSERT INTO `orders` VALUES (3, 1, 'OS1639046853', '线上支付', 11.00, 10.00, 1, 0, 1, '2021-12-09 18:47:33', '2021-12-15 17:10:52');
INSERT INTO `orders` VALUES (4, 1, 'OS1639048131043', '线上支付', 11.00, 10.00, 0, 0, 1, '2021-12-09 19:08:51', '2021-12-15 17:48:56');
INSERT INTO `orders` VALUES (5, 1, 'OS1639053724420', '线上支付', 11.00, 10.00, 1, 0, 0, '2021-12-09 20:42:04', '2021-12-16 20:39:24');
INSERT INTO `orders` VALUES (6, 1, 'OS1639107549233', '线上支付', 15.00, 15.00, 1, 0, 1, '2021-12-10 11:39:09', '2021-12-31 17:38:08');
INSERT INTO `orders` VALUES (7, 1, 'OS1639107738710', '线上支付', 15.00, 15.00, 1, 0, 1, '2021-12-10 11:42:18', '2021-12-31 17:38:11');
INSERT INTO `orders` VALUES (8, 1, 'OS1639107955270', '线上支付', 15.00, 15.00, 1, 0, 1, '2021-12-10 11:45:55', '2021-12-31 17:38:10');
INSERT INTO `orders` VALUES (9, 1, 'OS1639111806758', '线上支付', 15.00, 15.00, 0, 0, 0, '2021-12-10 12:50:06', '2021-12-31 17:38:13');
INSERT INTO `orders` VALUES (10, 6, 'OS1642944389425', '线上支付', 100.00, 96.54, 1, 0, 1, '2022-01-23 21:26:29', '2022-01-23 21:26:29');
INSERT INTO `orders` VALUES (11, 1, 'OS1642944392483', '线上支付', 65.50, 63.66, 1, 0, 1, '2022-01-23 21:26:32', '2022-01-23 21:26:32');
INSERT INTO `orders` VALUES (12, 1, 'OS1642944400270', '线上支付', 65.50, 63.66, 1, 0, 1, '2022-01-23 21:26:40', '2022-01-23 21:26:40');
INSERT INTO `orders` VALUES (13, 1, 'OS1642945805442', '线上支付', 65.50, 60.80, 0, 1, 0, '2022-01-23 21:50:05', '2022-02-24 09:03:29');
INSERT INTO `orders` VALUES (14, 1, 'OS1642946247944', '线上支付', 11.50, 11.50, 1, 0, 0, '2022-01-23 21:57:27', '2022-01-24 09:30:12');
INSERT INTO `orders` VALUES (15, 1, 'OS1642946581156', '线上支付', 7.00, 7.00, 0, 1, 0, '2022-01-23 22:03:01', '2022-02-24 15:09:48');
INSERT INTO `orders` VALUES (16, 6, 'OS1642947524615', '线上支付', 100.00, 91.75, 1, 0, 0, '2022-01-23 22:18:44', '2022-01-24 09:30:09');
INSERT INTO `orders` VALUES (17, 1, 'OS1643297266180', '线上支付', 50.00, 46.00, 1, 0, 1, '2022-01-27 23:27:46', '2022-01-27 23:27:46');
INSERT INTO `orders` VALUES (18, 1, 'OS1644151879120', '线上支付', 206.80, 203.72, 1, 1, 1, '2022-02-06 20:51:19', '2022-02-24 09:17:27');
INSERT INTO `orders` VALUES (19, 1, 'OS1644152294044', '线上支付', 14.30, 14.30, 1, 1, 1, '2022-02-06 20:58:14', '2022-02-23 21:32:21');
INSERT INTO `orders` VALUES (20, 10, 'OS1649130610421', '线上支付', 183.40, 175.13, 1, 1, 1, '2022-04-05 11:50:10', '2022-04-05 11:50:20');
INSERT INTO `orders` VALUES (21, 1, 'OS1649948717944', '线上支付', 24.50, 15.37, 1, 0, 1, '2022-04-14 23:05:17', '2022-04-14 23:05:17');
INSERT INTO `orders` VALUES (22, 1, 'OS1651414802826', '线上支付', 40.90, 33.28, 1, 0, 1, '2022-05-01 22:20:02', '2022-05-01 22:20:02');
INSERT INTO `orders` VALUES (23, 1, 'OS1651418018002', '线上支付', 57.20, 51.29, 1, 1, 1, '2022-05-01 23:13:38', '2022-05-01 23:14:36');
INSERT INTO `orders` VALUES (24, 1, 'OS1651418066555', '线上支付', 6.00, 6.00, 1, 1, 1, '2022-05-01 23:14:26', '2022-05-01 23:14:32');
INSERT INTO `orders` VALUES (25, 1, 'OS1651906964961', '线上支付', 70.90, 63.53, 1, 0, 1, '2022-05-07 15:02:44', '2022-05-07 15:02:44');
INSERT INTO `orders` VALUES (26, 1, 'OS1651907042402', '线上支付', 40.90, 32.09, 1, 1, 1, '2022-05-07 15:04:02', '2022-05-07 15:08:27');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL COMMENT 'role_id唯一',
  `role` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色: root/user',
  `identity` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '身份: 管理员/卖家/买家/骑手',
  `usable` int(11) NULL DEFAULT 1 COMMENT '是否可用',
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `role_id`(`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 1001, 'root', 'admin', 1, '2021-12-01 12:03:00', '2021-12-01 12:03:00');
INSERT INTO `role` VALUES (2, 1002, 'user', 'seller', 1, '2021-12-01 12:03:00', '2021-12-01 12:03:00');
INSERT INTO `role` VALUES (3, 1003, 'user', 'buyer', 1, '2021-12-01 12:03:00', '2021-12-01 12:03:00');
INSERT INTO `role` VALUES (4, 1004, 'user', 'rider', 1, '2021-12-01 12:03:00', '2021-12-01 12:03:00');

-- ----------------------------
-- Table structure for seller
-- ----------------------------
DROP TABLE IF EXISTS `seller`;
CREATE TABLE `seller`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账号不允许重复',
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `iid` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '身份证号,唯一',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号,唯一',
  `role_id` int(11) NULL DEFAULT 2,
  `usable` int(11) NULL DEFAULT 1 COMMENT '是否可用',
  `sid` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'seller标识,唯一',
  `avatar_url` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像地址',
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `account`(`account`) USING BTREE,
  UNIQUE INDEX `iid`(`iid`) USING BTREE,
  UNIQUE INDEX `phone`(`phone`) USING BTREE,
  UNIQUE INDEX `sid`(`sid`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  CONSTRAINT `seller_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of seller
-- ----------------------------
INSERT INTO `seller` VALUES (7, '111', '698d51a19d8a121ce581499d7b701668', '猫', '11242354353333', '12321432423', 2, 1, 'SH1638681185179', NULL, '2021-12-05 13:13:05', '2021-12-15 15:50:00');
INSERT INTO `seller` VALUES (9, '222', 'bcbe3365e6ac95ea2c0343a2395834dd', '银耳汤', '2345346457', '123124435', 2, 1, 'SH1638875798945', NULL, '2021-12-07 19:16:38', '2022-01-27 19:27:32');
INSERT INTO `seller` VALUES (11, 'a333', '202cb962ac59075b964b07152d234b70', 'asd ', '121234324535', '12323435345', 2, 1, 'SH1639555604512', NULL, '2021-12-15 16:06:44', '2021-12-15 16:07:04');
INSERT INTO `seller` VALUES (12, 'dnmd', '3f814a4d288695209b461513da3483d0', NULL, NULL, NULL, 2, 1, 'SH1639660338176', NULL, '2021-12-16 21:12:18', '2021-12-16 21:12:18');
INSERT INTO `seller` VALUES (13, 's222', '202cb962ac59075b964b07152d234b70', NULL, NULL, NULL, 2, 1, 'SH1640352554653', NULL, '2021-12-24 21:29:14', '2021-12-24 21:29:14');
INSERT INTO `seller` VALUES (14, 'minchao123', '25d55ad283aa400af464c76d713c07ad', NULL, NULL, NULL, 2, 1, 'SH1640920722204', NULL, '2021-12-31 11:18:42', '2021-12-31 11:18:42');
INSERT INTO `seller` VALUES (16, 'mc123456', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, 2, 1, 'SH1640943610704', NULL, '2021-12-31 17:40:10', '2021-12-31 17:40:10');
INSERT INTO `seller` VALUES (17, 'sgfaga', '1bfbfbab83ef5026106cd97a6d4c6154', NULL, NULL, NULL, 2, 1, 'SH1640952896088', NULL, '2021-12-31 20:14:56', '2021-12-31 20:14:56');
INSERT INTO `seller` VALUES (18, 'minchao', '4297f44b13955235245b2497399d7a93', 'minc', '1555551535151', '53151351616', 2, 1, NULL, NULL, '2022-01-05 10:58:01', '2022-01-05 10:58:01');
INSERT INTO `seller` VALUES (19, 'ljhljh', '0e7329a21762f3a6aef9fd8c0acf3064', NULL, NULL, NULL, 2, 1, 'SH1647780413370', NULL, '2022-03-20 20:46:53', '2022-03-20 20:46:53');
INSERT INTO `seller` VALUES (20, 'ceshi', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, 2, 1, 'SH1648879833450', NULL, '2022-04-02 14:10:33', '2022-04-02 14:10:33');
INSERT INTO `seller` VALUES (21, '1111', 'b59c67bf196a4758191e42f76670ceba', '1111', '1111', '1111', 2, 1, NULL, NULL, '2022-04-05 11:40:00', '2022-04-05 11:40:00');
INSERT INTO `seller` VALUES (22, 'q1212', '202cb962ac59075b964b07152d234b70', NULL, NULL, NULL, 2, 1, 'SH1649410807714', NULL, '2022-04-08 17:40:07', '2022-04-08 17:40:07');
INSERT INTO `seller` VALUES (23, 'seller', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, 2, 1, 'SH1649657611638', NULL, '2022-04-11 14:13:31', '2022-04-11 14:13:31');
INSERT INTO `seller` VALUES (24, 'sssyyyfff', '202cb962ac59075b964b07152d234b70', NULL, NULL, NULL, 2, 1, 'SH1650001830676', NULL, '2022-04-15 13:50:30', '2022-04-15 13:50:30');
INSERT INTO `seller` VALUES (25, 'huangzhimeng', 'c4e75fa8dd5b2169f000d606dc8a2b6f', NULL, NULL, NULL, 2, 1, 'SH1650802221987', NULL, '2022-04-24 20:10:21', '2022-04-24 20:10:21');
INSERT INTO `seller` VALUES (26, 'qw1234', '202cb962ac59075b964b07152d234b70', NULL, NULL, NULL, 2, 1, 'SH1651410855434', NULL, '2022-05-01 21:14:15', '2022-05-01 21:14:15');
INSERT INTO `seller` VALUES (27, 'wo1', '202cb962ac59075b964b07152d234b70', '任天野', '6576808754635234', '12345677356', 2, 1, 'SH1651888086365', NULL, '2022-05-07 09:48:06', '2022-05-07 09:49:31');
INSERT INTO `seller` VALUES (28, 'wo12', '202cb962ac59075b964b07152d234b70', '电饭锅', '12343554667', '1245678990', 2, 1, 'SH1651907149487', NULL, '2022-05-07 15:05:49', '2022-05-07 15:06:41');

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seller_id` int(11) NOT NULL COMMENT 'seller_id',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '店铺名',
  `address` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '店铺地址',
  `start_time` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '开始营业时间',
  `end_time` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '结束营业时间',
  `mountain_plan` int(11) NOT NULL COMMENT '青山计划,默认加入',
  `service` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商家服务',
  `delivery` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配送形式',
  `activities` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '活动',
  `shop_avatar_url` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '店铺头像_url',
  `business_permit_url` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '经营许可证_url',
  `health_certificate_url` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '营业执照_url',
  `op_id` int(11) NOT NULL COMMENT '一级分类id',
  `ch_id` int(11) NOT NULL COMMENT '二级分类id',
  `notice` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '公告',
  `usable` int(11) NULL DEFAULT 1 COMMENT '店铺是否可用',
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `seller_id`(`seller_id`) USING BTREE,
  CONSTRAINT `shop_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES (4, 11, '好再来', '莆田学院附近', '10:00', '20:00', 1, '[\"放心吃\",\"热情掌柜\",\"食材公示\",\"猫公益\"]', '外卖猫快送', '[]', 'http://124.70.20.215:2140/upload/upload_5d27260c580523adf93bacc4f7210d16.ico', 'http://124.70.20.215:2140/upload/upload_8d1d4dd172d9ce6c82bac209b0b03a95.ico', 'http://124.70.20.215:2140/upload/upload_c789fec04b178a523772ce339535f3fb.ico', 1002, 2006, '好吃再来~', 1, '2021-12-15 16:14:32', '2021-12-31 17:39:11');
INSERT INTO `shop` VALUES (5, 9, 'fa', 'awfa', '06:00', '08:00', 1, '[\"食材公示\"]', '商家配送', '[{\"value\":\"2\"}]', 'http://124.70.20.215:2140/upload/upload_225b1638349de9be3ec73e86bdddf251.jpeg', 'http://124.70.20.215:2140/upload/upload_0c5662c770c51b1ad299266a4ed98696.jpeg', 'http://124.70.20.215:2140/upload/upload_63f975684e710caff02acec676a539e2.jpeg', 1001, 2001, NULL, 1, '2022-04-05 12:00:15', '2022-04-05 12:00:15');
INSERT INTO `shop` VALUES (6, 21, '龙岩快餐', '兴安名称', '10:00', '19:30', 1, '[\"准时宝\"]', '商家配送', '[{\"value\":\"满11-1\"}]', 'http://124.70.20.215:2140/upload/upload_4864576df1d8a4baacb66be691d18f94.ico', 'http://124.70.20.215:2140/upload/upload_56336a58119b05a86d68f2d7f315c714.ico', 'http://124.70.20.215:2140/upload/upload_13a3ccaa57d85f7820aca2ac4c58b448.ico', 1002, 2007, '好吃不贵', 1, '2022-05-01 21:42:41', '2022-05-01 23:15:44');
INSERT INTO `shop` VALUES (7, 27, '任天野', '莆院', '09:00', '23:00', 1, '[\"猫公益\",\"准时宝\",\"食材公示\"]', '外卖猫快送', '[{\"value\":\"满10-1\",\"key\":1651888410104}]', 'http://124.70.20.215:2140/upload/upload_56e1889bba688923d6266ea54bc4a5ff.ico', 'http://124.70.20.215:2140/upload/upload_60fd8cc51e942ec484f5799379fe5910.ico', 'http://124.70.20.215:2140/upload/upload_5d468d12dc9eeec0449f5c9274c1c5a3.ico', 1008, 2053, '欢迎欢迎', 1, '2022-05-07 09:53:19', '2022-05-07 09:53:52');
INSERT INTO `shop` VALUES (8, 28, '收到回复即可', '莆院', '06:30', '09:30', 1, '[\"猫公益\",\"准时宝\",\"放心吃\"]', '商家配送', '[]', 'http://124.70.20.215:2140/upload/upload_513159e1e6c00f13a7c6fc629febdb76.ico', 'http://124.70.20.215:2140/upload/upload_5df84b0ba79d6e97fdbac7c9758082d7.ico', 'http://124.70.20.215:2140/upload/upload_6721110c79caa8ebbc5d1c37c06a707b.ico', 1002, 2007, NULL, 1, '2022-05-07 15:07:08', '2022-05-07 15:07:08');

-- ----------------------------
-- Table structure for shop_classify
-- ----------------------------
DROP TABLE IF EXISTS `shop_classify`;
CREATE TABLE `shop_classify`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `op_id` int(11) NOT NULL COMMENT '一级分类的id',
  `options` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '一级分类',
  `op_img` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '一级分类的图片地址',
  `ch_id` int(11) NOT NULL COMMENT '二级分类的id',
  `child` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '二级分类',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 54 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop_classify
-- ----------------------------
INSERT INTO `shop_classify` VALUES (1, 1001, '异国料理', 'http://124.70.20.215:2140/upload/op_img_1001.png', 2001, '日韩料理');
INSERT INTO `shop_classify` VALUES (2, 1001, '异国料理', 'http://124.70.20.215:2140/upload/op_img_1001.png', 2002, '西餐');
INSERT INTO `shop_classify` VALUES (3, 1001, '异国料理', 'http://124.70.20.215:2140/upload/op_img_1001.png', 2003, '披萨意面');
INSERT INTO `shop_classify` VALUES (4, 1001, '异国料理', 'http://124.70.20.215:2140/upload/op_img_1001.png', 2004, '汉堡');
INSERT INTO `shop_classify` VALUES (5, 1001, '异国料理', 'http://124.70.20.215:2140/upload/op_img_1001.png', 2005, '东南亚菜');
INSERT INTO `shop_classify` VALUES (6, 1002, '快餐便当', 'http://124.70.20.215:2140/upload/op_img_1002.png', 2006, '简餐');
INSERT INTO `shop_classify` VALUES (7, 1002, '快餐便当', 'http://124.70.20.215:2140/upload/op_img_1002.png', 2007, '盖浇饭');
INSERT INTO `shop_classify` VALUES (8, 1002, '快餐便当', 'http://124.70.20.215:2140/upload/op_img_1002.png', 2008, '米粉面条');
INSERT INTO `shop_classify` VALUES (9, 1002, '快餐便当', 'http://124.70.20.215:2140/upload/op_img_1002.png', 2009, '包子粥食');
INSERT INTO `shop_classify` VALUES (10, 1002, '快餐便当', 'http://124.70.20.215:2140/upload/op_img_1002.png', 2010, '香锅砂锅');
INSERT INTO `shop_classify` VALUES (11, 1002, '快餐便当', 'http://124.70.20.215:2140/upload/op_img_1002.png', 2011, '麻辣烫');
INSERT INTO `shop_classify` VALUES (12, 1002, '快餐便当', 'http://124.70.20.215:2140/upload/op_img_1002.png', 2012, '饺子混沌');
INSERT INTO `shop_classify` VALUES (13, 1002, '快餐便当', 'http://124.70.20.215:2140/upload/op_img_1002.png', 2013, '生煎锅贴');
INSERT INTO `shop_classify` VALUES (14, 1002, '快餐便当', 'http://124.70.20.215:2140/upload/op_img_1002.png', 2014, '黄焖鸡米饭');
INSERT INTO `shop_classify` VALUES (15, 1002, '快餐便当', 'http://124.70.20.215:2140/upload/op_img_1002.png', 2015, '煲仔饭');
INSERT INTO `shop_classify` VALUES (16, 1002, '快餐便当', 'http://124.70.20.215:2140/upload/op_img_1002.png', 2016, '咖喱饭');
INSERT INTO `shop_classify` VALUES (17, 1003, '小吃夜宵', 'http://124.70.20.215:2140/upload/op_img_1003.png', 2017, '小龙虾');
INSERT INTO `shop_classify` VALUES (18, 1003, '小吃夜宵', 'http://124.70.20.215:2140/upload/op_img_1003.png', 2018, '地方小吃');
INSERT INTO `shop_classify` VALUES (19, 1003, '小吃夜宵', 'http://124.70.20.215:2140/upload/op_img_1003.png', 2019, '烧烤');
INSERT INTO `shop_classify` VALUES (20, 1003, '小吃夜宵', 'http://124.70.20.215:2140/upload/op_img_1003.png', 2020, '炸鸡炸串');
INSERT INTO `shop_classify` VALUES (21, 1003, '小吃夜宵', 'http://124.70.20.215:2140/upload/op_img_1003.png', 2021, '鸭脖卤味');
INSERT INTO `shop_classify` VALUES (22, 1003, '小吃夜宵', 'http://124.70.20.215:2140/upload/op_img_1003.png', 2022, '火锅烤鱼');
INSERT INTO `shop_classify` VALUES (23, 1003, '小吃夜宵', 'http://124.70.20.215:2140/upload/op_img_1003.png', 2023, '小零食');
INSERT INTO `shop_classify` VALUES (24, 1004, '果蔬生鲜', 'http://124.70.20.215:2140/upload/op_img_1004.png', 2024, '水果');
INSERT INTO `shop_classify` VALUES (25, 1004, '果蔬生鲜', 'http://124.70.20.215:2140/upload/op_img_1004.png', 2025, '生鲜');
INSERT INTO `shop_classify` VALUES (26, 1004, '果蔬生鲜', 'http://124.70.20.215:2140/upload/op_img_1004.png', 2026, '蔬菜');
INSERT INTO `shop_classify` VALUES (27, 1004, '果蔬生鲜', 'http://124.70.20.215:2140/upload/op_img_1004.png', 2027, '海鲜');
INSERT INTO `shop_classify` VALUES (28, 1005, '特色菜系', 'http://124.70.20.215:2140/upload/op_img_1005.png', 2028, '川湘菜');
INSERT INTO `shop_classify` VALUES (29, 1005, '特色菜系', 'http://124.70.20.215:2140/upload/op_img_1005.png', 2029, '江浙菜');
INSERT INTO `shop_classify` VALUES (30, 1005, '特色菜系', 'http://124.70.20.215:2140/upload/op_img_1005.png', 2030, '粤菜');
INSERT INTO `shop_classify` VALUES (31, 1005, '特色菜系', 'http://124.70.20.215:2140/upload/op_img_1005.png', 2033, '东北菜');
INSERT INTO `shop_classify` VALUES (32, 1005, '特色菜系', 'http://124.70.20.215:2140/upload/op_img_1005.png', 2034, '西北菜');
INSERT INTO `shop_classify` VALUES (33, 1005, '特色菜系', 'http://124.70.20.215:2140/upload/op_img_1005.png', 2035, '云南菜');
INSERT INTO `shop_classify` VALUES (34, 1005, '特色菜系', 'http://124.70.20.215:2140/upload/op_img_1005.png', 2036, '新疆菜');
INSERT INTO `shop_classify` VALUES (35, 1005, '特色菜系', 'http://124.70.20.215:2140/upload/op_img_1005.png', 2037, '鲁菜');
INSERT INTO `shop_classify` VALUES (36, 1005, '特色菜系', 'http://124.70.20.215:2140/upload/op_img_1005.png', 2038, '豫菜');
INSERT INTO `shop_classify` VALUES (37, 1005, '特色菜系', 'http://124.70.20.215:2140/upload/op_img_1005.png', 2039, '其他菜系');
INSERT INTO `shop_classify` VALUES (38, 1006, '商店超市', 'http://124.70.20.215:2140/upload/op_img_1006.png', 2040, '超市');
INSERT INTO `shop_classify` VALUES (39, 1006, '商店超市', 'http://124.70.20.215:2140/upload/op_img_1006.png', 2041, '便利店');
INSERT INTO `shop_classify` VALUES (40, 1006, '商店超市', 'http://124.70.20.215:2140/upload/op_img_1006.png', 2042, '茗酒坊');
INSERT INTO `shop_classify` VALUES (41, 1006, '商店超市', 'http://124.70.20.215:2140/upload/op_img_1006.png', 2043, '零食饮料');
INSERT INTO `shop_classify` VALUES (42, 1006, '商店超市', 'http://124.70.20.215:2140/upload/op_img_1006.png', 2044, '水');
INSERT INTO `shop_classify` VALUES (43, 1006, '商店超市', 'http://124.70.20.215:2140/upload/op_img_1006.png', 2045, '茗茶');
INSERT INTO `shop_classify` VALUES (44, 1006, '商店超市', 'http://124.70.20.215:2140/upload/op_img_1006.png', 2046, '奶');
INSERT INTO `shop_classify` VALUES (45, 1006, '商店超市', 'http://124.70.20.215:2140/upload/op_img_1006.png', 2047, '奶油');
INSERT INTO `shop_classify` VALUES (46, 1006, '商店超市', 'http://124.70.20.215:2140/upload/op_img_1006.png', 2048, '粮油');
INSERT INTO `shop_classify` VALUES (47, 1006, '商店超市', 'http://124.70.20.215:2140/upload/op_img_1006.png', 2049, '母婴');
INSERT INTO `shop_classify` VALUES (48, 1007, '鲜花蛋糕', 'http://124.70.20.215:2140/upload/op_img_1007.png', 2050, '鲜花');
INSERT INTO `shop_classify` VALUES (49, 1007, '鲜花蛋糕', 'http://124.70.20.215:2140/upload/op_img_1007.png', 2051, '蛋糕');
INSERT INTO `shop_classify` VALUES (50, 1007, '鲜花蛋糕', 'http://124.70.20.215:2140/upload/op_img_1007.png', 2052, '面包');
INSERT INTO `shop_classify` VALUES (51, 1008, '甜品饮品', 'http://124.70.20.215:2140/upload/op_img_1008.png', 2053, '奶茶果汁');
INSERT INTO `shop_classify` VALUES (52, 1008, '甜品饮品', 'http://124.70.20.215:2140/upload/op_img_1008.png', 2054, '甜品');
INSERT INTO `shop_classify` VALUES (53, 1008, '甜品饮品', 'http://124.70.20.215:2140/upload/op_img_1008.png', 2055, '咖啡');

SET FOREIGN_KEY_CHECKS = 1;

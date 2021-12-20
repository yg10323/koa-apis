
-- 查看当前是否已开启事件调度器, 默认为off
SHOW VARIABLES LIKE 'event_scheduler';

-- 开启
SET GLOBAL event_scheduler = 1;
-- 关闭
SET GLOBAL event_scheduler = 0;


DROP EVENT IF EXISTS update_order;


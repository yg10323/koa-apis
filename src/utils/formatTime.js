
// 格式化时间: 时-分-秒
const formatTime = (timestamp) => {
    const d = new Date(parseInt(timestamp));    //根据时间戳生成的时间对象
    const date = (d.getHours()) + "-" +
        (d.getMinutes()) + "-" +
        (d.getSeconds());
    return date;
}

// 格式化日期: 年-月-日, 做文件夹命名使用
const formatDate = (timestamp) => {
    const d = new Date(parseInt(timestamp));    //根据时间戳生成的时间对象
    const date = (d.getFullYear()) + "-" +
        (d.getMonth() + 1) + "-" +
        (d.getDate());
    return date;
}

// 年-月-日 时:分:秒
const nowTime = (timestamp) => {
    const d = new Date(parseInt(timestamp));    //根据时间戳生成的时间对象
    const date = (d.getFullYear()) + "-" +
        (d.getMonth() + 1) + "-" +
        (d.getDate()) + " " +
        (d.getHours()) + ":" +
        (d.getMinutes()) + ":" +
        (d.getSeconds());
    return date;

}


module.exports = {
    formatTime,
    formatDate,
    nowTime
}
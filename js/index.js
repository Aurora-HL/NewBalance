// 底部轮播动画
// 初始0
var current = 0;
var timer = null;
timer = setInterval(autoPlay, 1500);
// 动画
function autoPlay() {
    show();
}
function show() {
    $('.play>.ui>li').hide().eq(current).show();
    current++;
    // 当索引等于最大值回到0
    if (current >= $('.play>.ui>li').length) {
        current = 0;
    }
}
// 鼠标划入划出事件
$('.play').hover(function () {
    clearInterval(timer);
}, function () {
    timer = setInterval(autoPlay, 1500)
})
// ！首页底部轮播结束

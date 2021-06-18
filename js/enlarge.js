function enlarge() {
    $(' .enlarge .small ul li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.enlarge .middle>img').attr('src', $(this).find('img').attr('src'));
        $('.enlarge .big>img').attr('src', $(this).find('img').attr('src'));
    })
    $('.enlarge .middle').hover(function () {
        $('.middle .mask').css('display', 'block');
        $('.big').css('display', 'block');
        $('.middle').on('mousemove', function (e) {
            var x = e.pageX;
            var y = e.pageY;
            var l = x - $('.middle').offset().left - $('.mask').width() / 2;
            var t = y - $('.middle').offset().top - $('.mask').height() / 2;
            if (l <= 0) {
                l = 0
            }
            if (t <= 0) {
                t = 0
            }
            if (l >= $('.middle').width() - $('.mask').width()) {
                l = $('.middle').width() - $('.mask').width()
            }
            if (t >= $('.middle').height() - $('.mask').height()) {
                t = $('.middle').height() - $('.mask').height()
            }
            $('.mask').css({
                left: l + "px",
                top: t + "px"
            })
            var xPercent = l / $('.middle').width()
            var yPercent = t / $('.middle').height()
            var bigl = xPercent * $('.big>img').width()
            var bigt = yPercent * $('.big>img').height()
            $('.enlarge>.big>img').css({
                left: -bigl + "px",
                top: -bigt + "px"
            })
        })
    }, function () {
        $('.middle .mask').css('display', 'none')
        $('.enlarge .big').css('display', 'none')
    });
    $('.small>a.leftBtn').on('click', function () {
        var l = $('.small ul').position().left;
        $('.small ul').animate({
            left: l - 55
        })
        return false;
    })
    $('.small>a.rightBtn').on('click', function () {
        var l = $('.small ul').position().left
        $('.small ul').animate({
            left: l + 55
        })
        return false;
    })
}
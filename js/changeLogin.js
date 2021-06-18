$(function () {
    var username = getCookie('username');
    var login = document.querySelector('.login');
    if (username) {
        var str = `<input type="text" name="search" placeholder="搜索" />
					<span>欢迎 <a href="jacascript:;">${username}</a> 回家</span>
					<span><a href="javascript:;" class="logout">退出</a></span>`;
        login.innerHTML = str;
        // 退出功能
        var logout = document.querySelector('.logout');
        logout.onclick = function () {
            layer.confirm('你确定要退出吗？', {
                    btn: ['确定', '取消']
                },
                function () {
                    // 删除cookie
                    delCookie('username');
                    login.innerHTML = `<input type="text" name="search" placeholder="搜索" />
					<a href="./account-login.html"><span>登录</span></a
					>&nbsp;/
					<a href="./account-login.html"><span>注册</span></a>`;
                    layer.msg('已退出', {
                        icon: 1,
                        time: 500
                    })
                },
                function () {
                    layer.msg('已取消', {
                        icon: 1,
                        time: 500
                    })
                    return false;
                }
            )
        }
    }
})
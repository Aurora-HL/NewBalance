//进入页面判断是否曾经登录，存在则在输入框上填入曾登录名
var username = getCookie('username')
var user = document.querySelector("[name='username']")
if (username) {
    user.value = username
}
// 登录验证
$('.fm1').validate({
    debug: true,
    rules: {
        username: {
            required: true,
            rangelength: [3, 8]
        },
        password: {
            required: true,
            rangelength: [6, 10]
        }
    },
    messages: {
        username: {
            required: '用户名不能为空！',
            rangelength: '用户名长度为3-8位！'
        },
        password: {
            required: '密码不能为空！',
            rangelength: '密码长度为6-10位！'
        }
    }
})
// 注册验证
// $('.fm2').validate({
// 	debug: true,
// 	rules: {
// 		username1: {
// 			required: true,
// 			rangelength: [3, 8]
// 		},
// 		password1: {
// 			required: true,
// 			rangelength: [6, 10]
// 		}
// 	},
// 	messages: {
// 		username1: {
// 			required: '用户名不能为空！',
// 			rangelength: '用户名长度为3-8位！'
// 		},
// 		password1: {
// 			required: '密码不能为空！',
// 			rangelength: '密码长度为6-10位！'
// 		}
// 	}
// })
//登录
$('#dlbtn').click(() => {
    var loadindex = layer.load(1, {
        shade: [0.5, '#333'] //0.1透明度的白色背景
    })
    $('#dlbtn').prop('disabled', true)
    // console.log($('.fm1').serialize());
    $.ajax({
        url: './php/login.php',
        type: 'post',
        data: $('.fm1').serialize(),
        dataType: 'json',
        success: function (res) {
            // 解构赋值
            var {
                meta: {
                    status,
                    msg
                }
            } = res
            layer.close(loadindex)
            if (status === 0) {
                // 设置cookie
                //默认设置会话级别
                setCookie('username', $('[name="username"]').val())
                //勾选设置覆盖为7天
                if ($("[name='remember']").prop('checked')) {
                    setCookie('username', $('[name="username"]').val(), 7 * 24 * 3600)
                }
                // 登录成功2s后跳转首页
                var msgindex = layer.msg(msg, {icon: 1});
                setTimeout(() => {
                    layer.close(msgindex);
                    $('#dlbtn').prop('disabled', false)
                    location.href = 'index.html'
                }, 2000)
            } else {
                layer.msg(msg, {icon: 0});
                $('#dlbtn').prop('disabled', false)
                return false
            }
        }
    })
})
//注册
$('#zcbtn').click(() => {
    // 验证表单数据
    var username1 = document.querySelector("[name='username1']").value
    if (username1 === '') {
        layer.msg('用户名不能为空！')
        return false
    }
    // 代码能走到这里，用户名填过了
    var reg = /^[a-zA-Z][a-zA-Z0-9]{2,7}$/
    if (!reg.test(username1)) {
        layer.msg('用户名：字母开头，字母、数字组成，3~8位')
        return false
    }
    // 密码校验
    var password1 = document.querySelector("[name='password1']").value
    if (password1 === '') {
        layer.msg('密码不能为空')
        return false
    }
    // 密码：数字、字母自称，6~12位
    var reg = /^[a-zA-Z0-9]{6,10}$/
    if (!reg.test(password1)) {
        layer.msg('密码：数字、字母，6~10位')
        return false
    }
    // 同意协议
    var agree = document.querySelector("[name='agree']")
    if (!agree.checked) {
        layer.msg('请勾选同意协议')
        return false
    }
    var index = layer.load(1, {
        shade: [0.5, '#333'] //0.1透明度的白色背景
    })
    $('#zcbtn').prop('disabled', true)
    // 发送ajax
    $.ajax({
        url: './php/register.php',
        data: {
            username1,
            password1
        },
        type: 'post',
        dataType: 'json',
        success: function (res) {
            layer.close(index)
            var {
                meta: {
                    status,
                    msg
                }
            } = res
            if (status === 0) {
                var msgIndex = layer.msg(msg, {icon: 1})
                setTimeout(() => {
                    layer.close(msgIndex)
                    $('#zcbtn').prop('disabled', false)
                    location.href = 'account-login.html'
                }, 2000)
            } else {
                layer.msg(msg, {icon: 0})
                $('#zcbtn').prop('disabled', false)
                return false
            }
        }
    })
})
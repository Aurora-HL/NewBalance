$(function () {
    // 判断是否登录
    var username = getCookie('username')
    if (!username) {
        var tipindex = layer.msg('请先登录！')
        setTimeout(function () {
            layer.close(tipindex)
            //  添加url本地存储,登陆后可提取此条数据跳转
            //  localStorage.setItem('url', location.href)
            location.href = './account-login.html';
        }, 2000)
        return false;
    };
    // 请求购物车数据
    var data = localStorage.getItem('data');
    if (!data || JSON.parse(data).length == 0) {
        var str = `
        <div class = "nul">
            <h1> 您的购物车没有商品。 </h1>
            <button><a href = "menlist.html"> 继续购物 </a></button >
        </div>
      `
        $('.content').html(str)
    } else {
        var arr = JSON.parse(data);
        // 从本地存储中获取到所有当前用户的数据
        var brr = arr.map(v => {
            if (v.username === username) {
                return v.goodsid
            }
        });
        // 将所有数据的商品id拼接在一起
        var ids = brr.join(',')
        //    console.log(ids);
        var loadindex = layer.load(0, {
            shade: true
        });
        $.ajax({
            url: './php/cart.php',
            data: {
                ids
            },
            dataType: "json",
            success(res) {
                var {
                    data
                } = res;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    var number = arr.find(v => v.username === username && v.goodsid == data[i].id).number
                    str += `
                <tr valign = "bottom" >
                    <td> <input type = "checkbox" name = "selectOne" ></td>
                    <td> <img src = "${data[i].imgpath}" width = "50" height = "50" > </td>
                    <td> ${data[i].name} </td>
                    <td class = "price"> ￥ <span> ${data[i].price} </span></td>
                    <td class = "number" data-stock = "${data[i].stock}" data-id = "${data[i].id}">
                        <button class = "btn btn-default reduce" > - </button>
                        <input type = "number" name = "number" value = "${number}">
                        <button class = "btn btn-default add" > + </button>
                    </td>
                    <td class = "subtotal"> ￥ <span> ${data[i].price*number} </span></td>
                    <td> <button class = "btn btn-danger remove" > 移除 </button></td>
                    </tr>
                  `
                }
                $('.table>tbody').html(str)
                layer.close(loadindex)
                // 全选单选事件
                select();
                // 数量加减
                addAndReduce()
                // 移除
                remove()
                // 计算总数和总价
                total()
            }
        })
    }
    // 计算总数和总价
    function total() {
        var totalNum = 0;
        var totalPrice = 0
        $('[name="selectOne"]:checked').each(function (i, v) {
            totalNum += $(v).parent().siblings('.number').find('input[name="number"]').val() - 0
            totalPrice += $(v).parent().siblings('.subtotal').find('span').text() - 0
        })
        //    console.log(totalNum);
        $('.totalNum').text(totalNum)
        $('.totalPrice').text(totalPrice)
    }
    // 全选单选
    function select() {
        $('[name="selectAll"]').click(function () {
            $('[name="selectOne"]').prop('checked', $(this).prop('checked'))
            $('[name="selectAll"]').prop('checked', $(this).prop('checked'))
            total()
        })
        $('[name="selectOne"]').click(function () {
            var selectArr = Array.prototype.slice.call($('[name="selectOne"]'))
            var selectStatus = selectArr.every(v => v.checked)
            $('[name="selectAll"]').prop('checked', selectStatus)
            total()
        })
    }
    // 数量加减
    function addAndReduce() {
        $('.table .number .add').click(function () {
            var num = $(this).prev().val() - 0;
            // console.log(num);
            // console.log($(this));
            $('table .number .reduce').prop('disabled', false)
            num++;
            if (num >= $(this).parent().attr('data-stock')) {
                num = $(this).parent().attr('data-stock')
                $(this).prop('disabled', true)
            }
            // console.log(num);

            $(this).prev().val(num)
            // 修改本地存储----存储在本地
            var data = JSON.parse(localStorage.getItem('data'))
            // console.log(data);

            var goodsid = $(this).parent().attr('data-id');
            // console.log($(this).parent());

            var arr = data.find(v => v.username === username && v.goodsid === goodsid)
            // console.log(data.find(v => v.username === username && v.goodsid === goodsid));

            arr.number = num;
            localStorage.setItem('data', JSON.stringify(data))
            // 计算小计
            var price = $(this).parent().siblings(".price").find('span').text() - 0
            var subtotal = price * num;
            $(this).parent().siblings('.subtotal').find('span').text(subtotal)
            total()
        })
        $('.table .number .reduce').click(function () {
            var num = $(this).next().val() - 0;
            $('.table .number .add').prop('disabled', false)
            num--;
            if (num <= 1) {
                num = 1
                $(this).prop('disabled', true)
            }
            $(this).next().val(num)
            // 修改本地存储
            var data = JSON.parse(localStorage.getItem('data'))
            var goodsid = $(this).parent().attr('data-id');
            var obj = data.find(v => v.username === username && v.goodsid === goodsid)
            obj.number = num;
            localStorage.setItem('data', JSON.stringify(data))
            // 计算小计
            var price = $(this).parent().siblings(".price").find('span').text() - 0
            var subtotal = price * num;
            $(this).parent().siblings('.subtotal').find('span').text(subtotal)
            total()
        })
    }
    // 移除
    function remove() {
        $('.remove').click(function () {
            var that = $(this)
            layer.confirm('你确定要删除吗？', {
                    btn: ['确定', '取消'] //按钮
                },
                function () {
                    var data = JSON.parse(localStorage.getItem('data'))
                    var goodsid = that.parent().siblings('.number').attr('data-id');
                    var index = data.findIndex(v => v.username === username && v.goodsid === goodsid)
                    data.splice(index, 1)
                    that.parent().parent().remove()
                    total()
                    localStorage.setItem('data', JSON.stringify(data))
                    layer.msg("删除成功", {
                        icon: 1,
                        time: 500
                    })
                    data = JSON.parse(localStorage.getItem('data'))
                    if (!data.length) {
                        var str = `
                         <div class="nul">
                            <h1>您的购物车没有商品。</h1>
                            <button><a href="menlist.html">继续购物</a></button>
                        </div>
                      `
                        $('.content').html(str)
                    }
                },
                function () {
                    layer.msg("已取消", {
                        icon: 1,
                        time: 500
                    })
                    return false;
                }
            );

        })
    }
})
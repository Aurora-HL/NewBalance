$(function () {
    var loadindex = layer.load(1, {
        shade: [0.5, '#333']
    })
    $.ajax({
        url: './php/menlist.php',
        dataType: 'json',
        success(res) {
            var {
                data
            } = res;
            console.log(data);
            //   data.reverse()
            var pageSize = 9;
            new Page("page", {
                language: {
                    first: '首页',
                    prev: '上一页',
                    next: '下一页',
                    last: '尾页'
                },
                pageData: {
                    pageSize,
                    total: data.length
                },
                show: function (currentPage) {
                    var tmp = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                    var html = '';
                    tmp.forEach(v => {
                        html += `
                        <div class="items">
                            <img src = "${v.imgpath}" alt = "..." >
                            <div class = "caption" >
                              <h3> ${v.name} </h3>
                              <p class="introduce"> ${v.introduce} </p>
                              <p><a href = "detail.html?id=${v.id}" class="btn" role = "button"> 查看详情 </a> </p>
                              </div>
                        </div>
                      `
                    })
                    $('.menall').html(html)
                }
            })
            layer.close(loadindex)
        }
    })
})
<?php
include 'mysql.php';
// 接收数据
$username1 = $_POST['username1'];
$password1 = $_POST['password1'];
// 检查是用户名是否被占用 - 拿用户名到数据库中查询
$res = mysqli_query($link,"SELECT * FROM `admin` WHERE `username`='$username1'");
// 提取数据
$row = mysqli_fetch_assoc($res);
if($row){
    $arr = [
        "meta"=>[
            "status"=>2,
            "msg"=>"用户名已存在"
        ]
    ];
}else{ // 如果是null - 没有查到数据 - 用户名没有被占用
    // 将数据添加到数据库
    $res = mysqli_query($link,"INSERT INTO `admin` (`username`,`password`) VALUES('$username1','$password1')");
    // 增的结果是布尔值
    if($res){
        $arr = [
            "meta"=>[
                "status"=>0,
                "msg"=>"注册成功"
            ]
        ];
    }else{
        $arr = [
            "meta"=>[
                "status"=>1,
                "msg"=>"注册失败"
            ]
        ];
    }
}
echo json_encode($arr);
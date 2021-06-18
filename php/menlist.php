<?php
include('mysql.php');
$res = mysqli_query($link,"SELECT * FROM `scenics`");
$arr = [];
while($row = mysqli_fetch_assoc($res)){
    $arr[] = $row;
}
echo json_encode([
    "meta"=>[
        "status"=>0,
        "msg"=>"数据获取成功"
    ],
    "data"=>$arr
]);
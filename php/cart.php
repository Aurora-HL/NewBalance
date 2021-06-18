<?php
include('mysql.php');
$ids = $_GET["ids"];
$res = mysqli_query($link,"SELECT * FROM `scenics` WHERE `id` in($ids)");
$arr = [];
while($row = mysqli_fetch_assoc($res)){
    $arr[] = $row;
}
echo json_encode([
    "meta"=>[
        "status"=>1,
        "msg"=>"数据获取成功"
    ],
    "data"=>$arr
]);
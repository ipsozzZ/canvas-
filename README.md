## 想法

>canvas初学者，看过教程后自己重做的demo,感觉效果棒棒的，下面简单介绍一下思想和展示一下成果吧

## 思想

### 绚烂时钟 ###

* 将0-9的每一位数字，和“:”在0和1表示的矩阵中显示出来，实现效果见digit.js文件
* cnanvs绘制时间显示中的每一个白色小球，html是demo.html,逻辑处理在countdown.js文件中
* js实现小球的物理特性（抛体运动、重力加速度处理，空气摩擦因素等）在countdown.js文件中
* 随机分派运动小球的填充颜色

### 七巧板 ###

* 重点在坐标点的寻找，使用数组将七巧板的每一个面的坐标颜色记录下来，数据在qiqiaoban.html中的tangram数组
* 循环用tangram数组中的数据绘制七巧板的每一个面

### 倒计时 ###

* 数字显示和时钟的类似
* 不同于时钟的逻辑是倒计时需要判断设定时间与当前时间的差值是否大于0
* html文件是Countdown.html
* 逻辑文件是Countdown.js

## 效果展示

### 绚烂时钟 ###

![time](../images/time.png)

### 七巧板 ###

![qiqiaoban](../images/qiqiaoban.png)

### 倒计时 ###

![countdown](../images/countdown.png)

## 结语

>是不是非常的炫酷？学无止境！加油吧！同样在努力的少年！

## 关于我

* 个人网站：[ipsozz](http://www.gaogege.live)
* 个人博客：[ipso](http://www.ipso.live)
* 这里是我的世界

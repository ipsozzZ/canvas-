/**
 * 原生js代码
 * @author      ipso
 * @description 实现时间动画效果的核心js代码
 */

/******************* code start ************************/

/* 画布位置默认设置 */
var WINDOW_WIDTH  = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP  = 150; // 距离上边距的距离
var MARGIN_LEFT = 30; // 第一个数字距离左边的距离


var currShowTime = new Date(); // 当前时间(特别注意月份是从0开始的，所以0就代表着1月，以此类推)

/* 定义小球的容器数据结构 */
var balls = [];

/* 用于随机生成动画小球的颜色 */
const colors = ["#FF00FF", "#9B30FF", "#8EE5EE", "#FFFFFF", "#4876FF", "#8B0000", "#EEEE00", "#8E8E38", "#212121"]

/**
 * 原生js入口
 */
window.onload = function(){

	var canvas  = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	/* 屏幕自适应设置108通过计算得出的倒计时所占width大小 */
	WINDOW_WIDTH = document.body.clientWidth;
	WINDOW_HEIGHT = document.body.clientHeight;
	MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
	RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
	MARGIN_TOP = Math.round(WINDOW_HEIGHT / 4);

	/* 设置画布大小 */
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	
	/* 时间动画 */
	setInterval(
		function(){
			render(context);
			update();
		},
		60
	)
}

/**
 * 实现时间和小球的动画效果
 * 有滥用if语句的嫌疑，如果改用swich语句实现的话，存在一个问题，当时间59秒时有三个占位需要实现小球动画，这里也就是有多个
 * if语句可能同时满足条件，如果用switch的case的话会导致部分条件被忽略，具
 * 体我也没有花时间去思考
 */
function update(){
	
	var nextDate = new Date();
	var nextHours = nextDate.getHours();
	var nextMinutes = nextDate.getMinutes();
	var nextSeconds = nextDate.getSeconds();

	var currHours = currShowTime.getHours();
	var currMinutes = currShowTime.getMinutes();
	var currSeconds = currShowTime.getSeconds();

	if(nextSeconds != currSeconds){

		if(parseInt(currHours/10) != parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(currHours/10));
		}

		if (parseInt(currHours % 10) != parseInt(nextHours % 10)) {
			addBalls(MARGIN_LEFT + 15*(RADIUS + 1), MARGIN_TOP, parseInt(currHours / 10));
		}


		if (parseInt(currMinutes / 10) != parseInt(nextMinutes / 10)) {
			addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(currMinutes / 10));
		}

		if (parseInt(currMinutes % 10) != parseInt(nextMinutes % 10)) {
			addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(currMinutes % 10));
		}

		if (parseInt(currSeconds / 10) != parseInt(nextSeconds / 10)) {
			addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(currSeconds / 10));
		}

		if (parseInt(currSeconds % 10) != parseInt(nextSeconds % 10)) {
			addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(currSeconds % 10));
		}
		currShowTime = nextDate;
	}
	updateBalls();
}

/**
 * 小球运动轨迹的实现
 */
function updateBalls(){
	for( var i = 0; i < balls.length; i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
			balls[i].y = WINDOW_HEIGHT-RADIUS;
			balls[i].vy = - balls[i].vy * 0.75;     
		}
	}

	var cnt = 0;
	for (var i = 0; i < balls.length; i++){
		if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH)
			balls[cnt++] = balls[i]
	}

	while (balls.length > Math.min(520 * 2, cnt)){ // 如果计算出来的cnt过大就取520
		balls.pop();
	}
}

/**
 * @param x 需要生成小球所在的时间位置的x坐标
 * @param y 需要生成小球所在的时间位置的y坐标
 * @param num 时间的值在digit数组中的位置
 * 当时间发生改变时，生成对应位置的小球，并初始化好小球的属性
 */
function addBalls(x, y, num){
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j] == 1){
				var aBall = { 
					x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1), 
					y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
					g: 1.5 + Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4, // ceil向上取整，pow幂运算函数，-1的随机数次方，结果为1或者-1再乘以4
					vy: -5 + Math.random(),
					color: colors[Math.floor(Math.random() * colors.length)] // floor下取整
				}

				balls.push(aBall); // 将生成的小球放入balls数组中
			}
		}
	}
}


/**
 * 对时间进行绘制
 * @param cxt 画布对象
 */
function render(cxt){

	 cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT); // clearRect()函数对矩阵（画布）进行刷新

	var today = new Date();

	var hours = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();

	renderDigit( MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt) // 十位数
	renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt) // 个位数
	renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt)
	renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt) // 十位数
	renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt) // 个位数
	renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt)
	renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt) // 十位数
	renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt) // 个位数

	for( var i = 0; i < balls.length; i++){
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
		cxt.closePath();

		cxt.fill();
	}
}

/**
 * 绘制时间上的每一个小球
 * @param {*} x   小球的所在时间区的x坐标
 * @param {*} y   小球所在时间区的y坐标
 * @param {*} num 所要绘制的数字在digit数组中的位置
 * @param {*} cxt 画布
 */
function renderDigit( x, y, num, cxt){ 
	cxt.fillStyle = "rgb(520,520,520)";
 
	for (var i = 0; i < digit[num].length; i++){
		for( var j = 0; j < digit[num][i].length; j++){
			if( digit[num][i][j] == 1 ){
				cxt.beginPath();
				cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2*Math.PI);
				cxt.closePath();

				cxt.fill();
			}
		}
	}
}
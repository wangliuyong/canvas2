!function(){
	var canvas = byId("canvas");
	var context = canvas.getContext('2d');
	var usering = false;
	var eraserEnable = false;
	var lineWidth = 3;

	/*
	//禁止画板滚动
	document.body.ontouchstart=function(event){
		//阻止所有默认事件
		event.preventDefault();
	}
	*/
	/*1.画布大小 */
	setCanvasSize(canvas);
	/*1.1画布背景颜色*/
	fillBackground("#fff");
	/*2鼠标活动 */
	listernUser(canvas);
	/*3.橡皮擦画笔切换 */
	switchPen();
	/*4.颜色切换 */
	switchColor();
	/*5.画笔粗细*/
	changeLineWidth();
	/*6.清屏*/
	clearScreen(canvas);
	/*7.保存画板*/
	saveCanvas();
	/* 滤镜*/
	filter();

	/************************************** 封装的函数 *********** */
	//1.获取元素
	function byId(id) {
		var element = undefined;
		if (document.getElementById(id)) {
			element = document.getElementById(id);
		} else {
			element = document.getElementsByClassName(id)[0];
		}
		return element;
	}
	//2.设置画布尺寸
	function setCanvasSize(canvas) {
		//视口尺寸改变事件
		window.onresize = function () {
			var pageWidth = document.documentElement.clientWidth;
			var pageHeight = document.documentElement.clientHeight;

			canvas.width = pageWidth;
			canvas.height = pageHeight;
		}
		window.onresize();
	}
	//3.用户动作监听
	function listernUser(canvas) {
		var point1 = {
			x: undefined,
			y: undefined
		};
		if (isTouchDevice()) {
			// on Mobile
			canvas.ontouchstart = function (event) {
				//触屏支持多点触碰，每次触碰的坐标会存在touches这个数组里。
				var x = event.touches[0].clientX,
					y = event.touches[0].clientY;
				usering = true;
				if (eraserEnable) {
					context.strokeStyle = "red";
					context.clearRect(x - 10, y - 10, 20, 20);
				} else {
					//drawCircle(x, y, 20);
					point1 = { x: x, y: y };
				}
			};
			canvas.ontouchmove = function () {
				var x = event.touches[0].clientX,
					y = event.touches[0].clientY;
				var point2 = { x: x, y: y };
				if (usering) {
					if (eraserEnable) {
						context.clearRect(x - 10, y - 10, 20, 20);
					} else {
						//drawCircle(x, y, 20);
						drawLine(point1.x, point1.y, point2.x, point2.y);
						point1 = point2; //实时更新，上一个点
					}
				}
			};
			canvas.ontouchend = function () {
				usering = false;
			};
		} else {
			// on Desktop
			canvas.onmousedown = function (event) {
				var x = event.clientX,
					y = event.clientY;
				usering = true;
				if (eraserEnable) {
					context.clearRect(x - 10, y - 10, 20, 20);
				} else {
					//drawCircle(x, y, 20);
					point1 = { x: x, y: y };
				}
			};
			canvas.onmousemove = function () {
				var x = event.clientX,
					y = event.clientY;
				var point2 = { x: x, y: y };
				if (usering) {
					if (eraserEnable) {
						context.clearRect(x - 10, y - 10, 20, 20);
					} else {
						//drawCircle(x, y, 20);
						drawLine(point1.x, point1.y, point2.x, point2.y);
						point1 = point2; //实时更新，上一个点
					}
				}
			};
			canvas.onmouseup = function () {
				usering = false;
			};
		}
	}
	//4.特性检测
	function isTouchDevice() {
		return "ontouchstart" in document.documentElement;
	}

	//10.画圆
	function drawCircle(x, y, radius) {
		context.beginPath();
		context.arc(x, y, radius, Math.PI * 2, false);
		context.stroke();
	};
	//6.画线 
	function drawLine(x1, y1, x2, y2) {
		context.beginPath();
		context.lineWidth = lineWidth;
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.stroke();
		context.closePath();
	}
	//7.画笔橡皮擦的切换
	function switchPen() {
		var eraser = byId('eraser');
		var pen = byId('pen');
		eraser.onclick = function () {
			eraserEnable = true;
			this.classList.add("active");
			pen.classList.remove('active');
		}
		pen.onclick = function () {
			eraserEnable = false;
			this.classList.add('active');
			eraser.classList.remove('active');
			context.strokeStyle = document.getElementsByClassName('active')[1].id;
		}
	}
	//8.颜色切换
	function switchColor() {
		var colorLi = document.getElementsByClassName("colorLi");
		for (var i = 0; i < colorLi.length; i++) {
			colorLi[i].onclick = function () {
				context.strokeStyle = this.id;
				for (var j = 0; j < colorLi.length; j++) {
					colorLi[j].classList.remove('active');
					this.classList.add('active');
				}
			};
		}

	}

	//9.画笔粗细
	function changeLineWidth() {
		var lineWidthRange = byId('lineWidth');
		lineWidthRange.onchange = function () {
			lineWidth = this.value;
		};
	}
	//10.清屏
	function clearScreen(canvas) {
		var clear = byId("clear");
		clear.onclick = function () {
			context.clearRect(0, 0, canvas.width, canvas.height);
		};
	}
	//11.保存画板
	function saveCanvas() {
		var download = byId('download');
		download.onclick = function () {
			var url = canvas.toDataURL("image/png");
			var a = document.createElement('a');
			document.body.appendChild(a);
			a.download = "myCanvas";
			a.href = url;
			a.click()
		}
	}
	//12.Draw Canvas Fill mode
	function fillBackground(color) {
		context.fillStyle = color;
		context.fillRect(0, 0, canvas.width, canvas.height);
	}
	//13.filter

	function filter() {
		var fugu = byId('fugu');
		var meibai = byId('meibai');
		fugu.onclick = function () {
			context.fillStyle = "rgba(255, 255, 0, 0.1)";
			context.fillRect(0, 0, canvas.width, canvas.height);
		}
		meibai.onclick = function () {
			context.fillStyle = "rgba(255,255,255,0.1)";
			context.fillRect(0, 0, canvas.width, canvas.height);
		};
	}
}.call();


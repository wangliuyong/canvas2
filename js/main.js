var canvas = byId("canvas");
var context = canvas.getContext('2d');
var usering = false;
var eraser = false;


/*1.画布大小 */
setCanvasSize(canvas);
/*2鼠标活动 */
listernUser(canvas);
/*3.橡皮擦画笔切换 */
switchPen();
/************************************** 封装的函数 *********** */
//1.通过id获取元素
function byId(id) {
    var element=undefined;
    if (document.getElementById(id)){
        element = document.getElementById(id);
    }else{
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
      canvas.ontouchstart = function(event) {
        var x = event.touches[0].clientX,
          y = event.touches[0].clientY;
        usering = true;
        if (eraser) {
          context.clearRect(x - 10, y - 10, 20, 20);
        } else {
          //drawCircle(x, y, 20);
          point1 = { x: x, y: y };
        }
      };
      canvas.ontouchmove = function() {
        var x = event.touches[0].clientX,
          y = event.touches[0].clientY;
        var point2 = { x: x, y: y };
        if (usering) {
          if (eraser) {
            context.clearRect(x - 10, y - 10, 20, 20);
          } else {
            //drawCircle(x, y, 20);
            drawLine(point1.x, point1.y, point2.x, point2.y);
            point1 = point2; //实时更新，上一个点
          }
        }
      };
      canvas.ontouchend = function() {
        usering = false;
      };
    } else {
      // on Desktop
      canvas.onmousedown = function(event) {
        var x = event.clientX,
          y = event.clientY;
        usering = true;
        if (eraser) {
          context.clearRect(x - 10, y - 10, 20, 20);
        } else {
          //drawCircle(x, y, 20);
          point1 = { x: x, y: y };
        }
      };
      canvas.onmousemove = function() {
        var x = event.clientX,
          y = event.clientY;
        var point2 = { x: x, y: y };
        if (usering) {
          if (eraser) {
            context.clearRect(x - 10, y - 10, 20, 20);
          } else {
            //drawCircle(x, y, 20);
            drawLine(point1.x, point1.y, point2.x, point2.y);
            point1 = point2; //实时更新，上一个点
          }
        }
      };
      canvas.onmouseup = function() {
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
    context.lineWidth = 5;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}
//7.画笔橡皮擦的切换
function switchPen() {
    var box = byId("box");
    var eraserButton = byId("eraser");
    var penButton = byId("pen");
    penButton.onclick = function () {
        eraser = true;
        box.className = "box2";
    }
    eraserButton.onclick = function () {
        eraser = false;
        box.className = "box1";
    };
}


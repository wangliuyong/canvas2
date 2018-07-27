var canvas = byId("canvas");
var context = canvas.getContext('2d');
var usering = false;
var eraserEnable = false;
var lineWidth=3;


/*1.画布大小 */
setCanvasSize(canvas);
/*2鼠标活动 */
listernUser(canvas);
/*3.橡皮擦画笔切换 */
switchPen();
/*4.颜色切换 */
switchColor();
/*5.画笔粗细*/
changeLineWidth(); 



/************************************** 封装的函数 *********** */
//1.获取元素
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
        //触屏支持多点触碰，每次触碰的坐标会存在touches这个数组里。
        var x = event.touches[0].clientX,
          y = event.touches[0].clientY;
        usering = true;
        if (eraserEnable) {
          context.strokeStyle="red";
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
          if (eraserEnable) {
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
        if (eraserEnable) {
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
          if (eraserEnable) {
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
    eraser.onclick=function(){
        eraserEnable=true;
        this.classList.add("active");
        pen.classList.remove('active');
    }
    pen.onclick=function(){
        eraserEnable = false;
        this.classList.add('active');
        eraser.classList.remove('active');
    }
}
//8.颜色切换
function switchColor(){
    var colorLi = document.getElementsByClassName("colorLi");
    for (var i = 0; i < colorLi.length;i++){
        colorLi[i].onclick = function() {
          context.strokeStyle = this.id;
            for (var j = 0; j < colorLi.length;j++){
                colorLi[j].classList.remove('active');
                this.classList.add('active');
            }
        };
    }
   
}

//9.画笔粗细
function changeLineWidth(){
    var lineWidthRange = byId('lineWidth');
    lineWidthRange.onchange = function() {
      console.log(this.value);

      lineWidth = this.value;
    };
}

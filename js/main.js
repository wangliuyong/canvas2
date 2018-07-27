var canvas = byId("canvas");
var box = byId("box");
var eraserButton = byId("eraser");
var penButton = byId("pen");
var context = canvas.getContext('2d');
var usering = false;
var eraser = false;
/******************************画布大小**************************************** */
setCanvasSize(canvas);
/****************************鼠标活动********************************* */
listernMouse(canvas);
/**************************橡皮擦************************************************ */
penButton.onclick=function(){
    eraser=true;
    box.className="box2";
}
eraserButton.onclick = function() {
  eraser = false;
  box.className = "box1";
};
/************************************** 封装的函数 *********** */
//
function byId(id) {
    var element=undefined;
    if (document.getElementById(id)){
        element = document.getElementById(id);
    }else{
        element = document.getElementsByClassName(id)[0];
    }
    return element;
}

//画圆
var drawCircle = function (x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, Math.PI * 2, false);
    context.stroke();
};
//画线 
var drawLine = function (x1, y1, x2, y2) {
    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

//设置画布尺寸
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
//
function listernMouse(canvas) {
    var point1 = {
        x: undefined,
        y: undefined
    };
    canvas.onmousedown = function (event) {
        var x = event.clientX,
            y = event.clientY;
        usering = true;
        if (eraser) {
            context.clearRect(x - 5, y - 5, 10, 10);
        } else {
            //drawCircle(x, y, 10);
            point1 = {
                x: x,
                y: y
            };
        }
    }
    canvas.onmousemove = function () {
        var x = event.clientX,
            y = event.clientY;
        var point2 = {
            x: x,
            y: y
        };
        if (usering) {
            if (usering) {
                if (eraser){
                    context.clearRect(x - 5, y - 5, 10, 10);
                } else {
                    //drawCircle(x, y, 10);
                    drawLine(point1.x, point1.y, point2.x, point2.y);
                    point1 = point2 //实时更新，上一个点
                } 
            } 
        } 
    }
    canvas.onmouseup = function () {
        usering = false;
    }
}
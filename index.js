// 背景
$(function(){
    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineWidth = .3;
    ctx.strokeStyle = (new Color(150)).style;
  
    var mousePosition = {
      x: 30 * canvas.width / 100,
      y: 30 * canvas.height / 100
    };
  
    var dots = {
      nb: 750,
      distance: 50,
      d_radius: 100,
      array: []
    };
  
    function colorValue(min) {
      return Math.floor(Math.random() * 255 + min);
    }
    
    function createColorStyle(r,g,b) {
      return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
    }
    
    function mixComponents(comp1, weight1, comp2, weight2) {
      return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
    }
    
    function averageColorStyles(dot1, dot2) {
      var color1 = dot1.color,
          color2 = dot2.color;
      
      var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
          g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
          b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
      return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
    }
    
    function Color(min) {
      min = min || 0;
      this.r = colorValue(min);
      this.g = colorValue(min);
      this.b = colorValue(min);
      this.style = createColorStyle(this.r, this.g, this.b);
    }
  
    function Dot(){
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
  
      this.vx = -.5 + Math.random();
      this.vy = -.5 + Math.random();
  
      this.radius = Math.random() * 2;
  
      this.color = new Color();
      console.log(this);
    }
  
    Dot.prototype = {
      draw: function(){
        ctx.beginPath();
        ctx.fillStyle = this.color.style;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
      }
    };
  
    function createDots(){
      for(i = 0; i < dots.nb; i++){
        dots.array.push(new Dot());
      }
    }
  
    function moveDots() {
      for(i = 0; i < dots.nb; i++){
  
        var dot = dots.array[i];
  
        if(dot.y < 0 || dot.y > canvas.height){
          dot.vx = dot.vx;
          dot.vy = - dot.vy;
        }
        else if(dot.x < 0 || dot.x > canvas.width){
          dot.vx = - dot.vx;
          dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    }
  
    function connectDots() {
      for(i = 0; i < dots.nb; i++){
        for(j = 0; j < dots.nb; j++){
          i_dot = dots.array[i];
          j_dot = dots.array[j];
  
          if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
            if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
              ctx.beginPath();
              ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
              ctx.moveTo(i_dot.x, i_dot.y);
              ctx.lineTo(j_dot.x, j_dot.y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
    }
  
    function drawDots() {
      for(i = 0; i < dots.nb; i++){
        var dot = dots.array[i];
        dot.draw();
      }
    }
  
    function animateDots() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      moveDots();
      connectDots();
      drawDots();
  
      requestAnimationFrame(animateDots);	
    }
  
    $('canvas').on('mousemove', function(e){
      mousePosition.x = e.pageX;
      mousePosition.y = e.pageY;
    });
  
    $('canvas').on('mouseleave', function(e){
      mousePosition.x = canvas.width / 2;
      mousePosition.y = canvas.height / 2;
    });
  
    createDots();
    requestAnimationFrame(animateDots);	
  });

  //点击文字
  function bg3(){
    var r=Math.floor(Math.random()*(170-100)+100);
    var g=Math.floor(Math.random()*(170-100)+100);
    var b=Math.floor(Math.random()*(100-90)+90);
    return "rgb("+r+','+g+','+b+")";//所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
}

var a = ["暴瘦","暴富","爆美丽","心想事成","万事如意","财源滚滚","学业有成"]
// var a = ["1.gif","2.gif","3.gif"]
// setTimeout(function(){
   document.onclick = function(e){
   var span = document.createElement("span")
   // span.innerHTML = "<img src="+a[Math.floor(Math.random()*a.length)]+">"
   span.innerHTML = a[Math.floor(Math.random()*a.length)]
   span.style.position = "absolute"
   span.style.color = bg3()
   span.style.transition = ".5s"
   span.style.left = e.clientX - 20 + "px"
   span.style.top = e.clientY -20 + "px"
   setTimeout(function(){
       span.style.opacity = "1"
       span.style.transform = "translateY(-50px) scale(1.5)"
   },100)
   setTimeout(function(){
       span.style.opacity = "0"
       span.style.transform = "translateY(-200px) scale(0)"
   },500)
   setTimeout(function(){
       var chi = document.getElementsByTagName("span")
         for(var i = 0;i<chi.length-1;i++){
             if(chi[i].style.opacity === "0"){
                 document.body.removeChild(chi[i])
             }
         }
   },1000)
  document.body.appendChild(span)
}
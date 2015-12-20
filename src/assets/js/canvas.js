;(function(){

  var canvas = document.querySelector('canvas'),
      context = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  context.lineWidth = .3;

  var mousePosition = {
    x: 30 * canvas.width / 100,
    y: 30 * canvas.height / 100
  };

  var dots = {
    nb: 180,
    distance: 100,
    d_radius: 140,
    array: []
  };

  var colors = [
    '#2176AE',
    '#57B8FF',
    '#B66D0D',
    '#FBB13C',
    '#FE6847'
  ];

  var colorNb = colors.length,
      dotColorIndex = 0,
      lineColorIndex = 0;

  function Dot() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -.3 + Math.random();
    this.vy = -.3 + Math.random();

    this.radius = Math.random()*1.4;
  }

  Dot.prototype = {
    create: function() {
      dotColorIndex == colorNb ? dotColorIndex = 0 : dotColorIndex++;
      context.fillStyle = colors[dotColorIndex];
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.closePath();
      context.fill();
    },

    move: function(){
      for(var i = 0; i < dots.nb; i++){
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
        dot.y +=dot.vy;
      }
    },

    line: function() {
      for(var i = 0; i < dots.nb; i++){
        for(var j = 0; j < dots.nb; j++){
          lineColorIndex == colorNb ? lineColorIndex = 0 : lineColorIndex++;
          i_dot = dots.array[i];
          j_dot = dots.array[j];
          if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
            if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
              context.beginPath();
              context.moveTo(i_dot.x, i_dot.y);
              context.lineTo(j_dot.x, j_dot.y);
              context.strokeStyle = colors[lineColorIndex];
              context.stroke();
              context.closePath();
            }
          }
        }
      }
    }
  }

  function generateDots(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < dots.nb; i++){
      dots.array.push(new Dot());
      dot = dots.array[i];
      dot.create();
    }
    dot.line();
    dot.move();
  }

  $('canvas').on('mousemove mouseleave', function(e){
    if(e.type == 'mousemove'){
      mousePosition.x = e.pageX;
      mousePosition.y = e.pageY;
    }
    if(e.type == 'mouseleave'){
      mousePosition.x = canvas.width / 2;
      mousePosition.y = canvas.height / 2;
    }
  });

  setInterval(generateDots, 1000/20);

})();

;(function(){

  // Adapted from http://codepen.io/dleatherman/pen/kAzgw to support colors and multiple viewports

  // CONSTANTS
  var DOTS = {
    NB: {
      MOBILE: 45,
      TABLET: 115,
      DESKTOP: 180
    },
    DISTANCE: 100,
    D_RADIUS: 140,
    COLLECTION: []
  };

  var COLORS = [
    '#2176AE',
    '#57B8FF',
    '#B66D0D',
    '#FBB13C',
    '#FE6847'
  ];

  var BREAKPOINTS = {
    MOBILE: 667,
    TABLET: 1024,
    DESKTOP: 1200
  };


  // Variables
  var canvas,
      context,
      dotColorIndex = 0,
      lineColorIndex = 0,
      mousePosition = {
        x: 30 * window.innerWidth / 100,
        y: 30 * window.innerHeight / 100
      },
      nbOfDotsForViewport = getNbOfDotsForViewport();


  // Init Canvas
  function initCanvas() {
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';
    context.lineWidth = .3;
  };

  function getNbOfDotsForViewport() {
    return window.innerWidth >= BREAKPOINTS.DESKTOP ? DOTS.NB.DESKTOP : (window.innerWidth <= BREAKPOINTS.MOBILE ? DOTS.NB.MOBILE : DOTS.NB.TABLET);
  }


  // Constructor
  var Dot = function() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -.3 + Math.random();
    this.vy = -.3 + Math.random();

    this.radius = Math.random()*1.4;

    this.nbOfDots = window.innerWidth >= BREAKPOINTS.DESKTOP ? DOTS.NB.DESKTOP : (window.innerWidth <= BREAKPOINTS.MOBILE ? DOTS.NB.MOBILE : DOTS.NB.TABLET);
  };

  Dot.prototype.getNbOfDots = function(){
      return this.nbOfDots;
  };

  Dot.prototype.create = function() {
      dotColorIndex == COLORS.length ? dotColorIndex = 0 : dotColorIndex++;
      context.fillStyle = COLORS[dotColorIndex];
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.closePath();
      context.fill();
  };

  Dot.prototype.move = function(){
      for(var i = 0; i < this.getNbOfDots(); i++){
        var dot = DOTS.COLLECTION[i];
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
  };

  Dot.prototype.line = function() {
    for(var i = 0; i < this.getNbOfDots(); i++){
      for(var j = 0; j < this.getNbOfDots(); j++){
        lineColorIndex == COLORS.length ? lineColorIndex = 0 : lineColorIndex++;
        i_dot = DOTS.COLLECTION[i];
        j_dot = DOTS.COLLECTION[j];
        if((i_dot.x - j_dot.x) < DOTS.DISTANCE && (i_dot.y - j_dot.y) < DOTS.DISTANCE && (i_dot.x - j_dot.x) > - DOTS.DISTANCE && (i_dot.y - j_dot.y) > - DOTS.DISTANCE){
          if((i_dot.x - mousePosition.x) < DOTS.D_RADIUS && (i_dot.y - mousePosition.y) < DOTS.D_RADIUS && (i_dot.x - mousePosition.x) > - DOTS.D_RADIUS && (i_dot.y - mousePosition.y) > - DOTS.D_RADIUS){
            context.beginPath();
            context.moveTo(i_dot.x, i_dot.y);
            context.lineTo(j_dot.x, j_dot.y);
            context.strokeStyle = COLORS[lineColorIndex];
            context.stroke();
            context.closePath();
          }
        }
      }
    }
  };

  function generateDots(){
    initCanvas();
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < nbOfDotsForViewport; i++){
      DOTS.COLLECTION.push(new Dot());
      dot = DOTS.COLLECTION[i];
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

  $(window).on('resize', function() {
    clearInterval(dotInterval);
    initCanvas();
    nbOfDotsForViewport = getNbOfDotsForViewport();
    dotInterval = setInterval(generateDots, 1000/20);
  });

  var dotInterval = setInterval(generateDots, 1000/20);

})();

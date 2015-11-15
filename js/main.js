// goal: user has to repeat computers random list of colors. 
//       if user is correct then computer repeats list and adds one
//     if user is wrong the game ends

var Game = {
  started: false,

  setColorList: ['red', 'blue', 'yellow', 'green'],
  computerList: [],
  correctCounter: 0,

  init: function() {
    this.$colors   = $('.color');
    this.$red      = $('#red');
    this.$blue     = $('#blue');
    this.$yellow   = $('#yellow');
    this.$green    = $('#green');
    this.$gameOver = $('#gameOver');
    this.$numberCorrect = $('h3 span');
    this.$startButton   = $('#startButton');
    this.clickCounter   = 0;
    this.correctCounter = 0;

    this.$startButton.on('click', Game.start);
  },

  start: function() {
    Game.$gameOver.hide();
    Game.$gameOver.css('opacity', '.10');
    Game.$colors.show();
    Game.started = true;
    Game.$startButton.prop('disabled', true);
    Game.clickCounter= 0;
    Game.computerList= [];
    Game.correctCounter = 0;
    Game.$numberCorrect.text(" " + Game.correctCounter);
    Game.simon();

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      Game.touchDown();
      Game.touchUp();
    } else {
      Game.mouseDown();
      Game.mouseUp();
    }
    
  },

  randomNum: function() {
    return Math.floor((Math.random() * 4));
  },

  simon: function() { //not the final func name - might be broken into mult funcs
    this.computerList.push(this.setColorList[Game.randomNum()]);
     //make computerList light up
    Game.playBack(Game.computerList);

  },

    mouseDown: function() {
    Game.$colors.on('mousedown', function(){
      var colorName = $(this).attr('id');
      Game.turnOn(colorName);
    });
  },

  mouseUp: function() {
    Game.$colors.on('mouseup', function(){
      var colorName = $(this).attr('id');
      Game.turnOff(colorName);
      Game.decide(colorName);
    });
  },

  touchDown: function() {
    Game.$colors.on('touchstart', function(){
      var colorName = $(this).attr('id');
      Game.turnOn(colorName);
    });
  },

  touchUp: function() {
    Game.$colors.on('touchend', function(){
      var colorName = $(this).attr('id');
      Game.turnOff(colorName);
      Game.decide(colorName);
    });
  },

  decide: function(color) {
    //user right
    if (Game.clickCounter < Game.computerList.length) {
      if (color === Game.computerList[Game.clickCounter]) {
        Game.clickCounter++;
        //user wrong
      } else {
          Game.$colors.removeClass('active');
          Game.computerList= [];
          Game.clickCounter = 0;
          Game.started = false; 
          Game.$startButton.prop('disabled', false);
          Game.correctCounter--;
          
          Game.gameOver();
          
          Game.$colors.unbind().on;
      }
      //end of user turn
    } if (Game.clickCounter === Game.computerList.length) {
      var finalCount = Game.computerList.length;
      Game.clickCounter = 0;
      Game.correctCounter++;
      Game.$numberCorrect.text(" " + Game.correctCounter);
      Game.simon();
    }
  },

  gameOver: function() {
    Game.$colors.hide();
    Game.$gameOver.show();
    Game.$gameOver.animate({
            opacity: '0.6',
        }, 1500);
  },

  playBack: function(list) {
    var counter = 0;
    var colorOn = false;

    var timerId = setInterval( function(){

        // if not first time and no color is on
        if (counter > 0 && colorOn) {
          // turn off previous
          Game.turnOff(list[counter-1]);
          colorOn = false;
          return;
        }

        if (counter < list.length) {
          // turn on color
          Game.turnOn(list[counter])
          colorOn = true;
        }

        if (counter === list.length) {
          clearInterval(timerId);
        }

        counter++;   
    }, 500)  //end timerId
  }, //end lightUp

  turnOff : function(color) {
    $('#' + color).removeClass('active');
  },

  turnOn : function(color) {
    $('#' + color).addClass('active');
  },


} //Game{}



Game.init();




//---------------------------------------
//      PERSONAL NOTES
//---------------------------------------




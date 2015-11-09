// goal: user has to repeat computers random list of colors. 
//       if user is correct then computer repeats list and adds one
//     if user is wrong the game ends


var Game = {
  started: false,

  setColorList: ['red', 'blue', 'yellow', 'green'],
  computerList: [],

  init: function() {
    this.$colors  = $('.color');
    this.$red     = $('#red');
    this.$blue    = $('#blue');
    this.$yellow  = $('#yellow');
    this.$green   = $('#green');
    this.$gameOver= $('#gameOver');
    this.$startButton= $('#startButton');
    this.clickCounter= 0;

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
    Game.simon();
    Game.touchDown();
    Game.touchUp();
  },

  randomNum: function() {
    return Math.floor((Math.random() * 4));
  },

  simon: function() { //not the final func name - might be broken into mult funcs
    this.computerList.push(this.setColorList[Game.randomNum()]);
     //make computerList light up
    Game.playBack(Game.computerList);

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
          
          Game.gameOver();
          
          Game.$colors.unbind().on;
      }
      //end of user turn
    } if (Game.clickCounter === Game.computerList.length) {
      Game.clickCounter = 0;
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

//UNBIND
// example $( "#foo" ).unbind( "click" );

//telling user if they are correct/gameover
  //use similar style as code school???

//?????way to tell user how many colors they need to pick?????
  //concerned that because waiting until userList.length = computerList.length...
  //to decide that user will sit there waiting forever thinking they entered enough??
    //can i match userList and computerList while the user is clicking colors?
      //match while user is inputting and when either userList.length = computerList.length...
      //or if they add wrong color then notify user???

//simon button only a start button??
  //as soon as userList.length = computerList.length have computer "go"


//so when i click a color or the computer chooses a color it’s just pushing a string color name to the computer 
//and user arrays. so when i compare the arrays it’s just comparing the strings. BUT when i want to light up what’s 
//in the computer’s array to show the user i somehow take that string name and make it correlate to the actual object?
//this is done with the data attributes or id name




//JONOS COMMENTS ------------------------- 

//when not being used make opacity 60-70%
  //func lightUp takes color and changes opacity when user or computer clicks color

//toggle func with delay for when computer is playing colors
  //loop through list
  //light up square for second
  //turn it off
  //light up next one for a second
  //etc
    //do setInterval()
      //runs it until you turn it off at that interval
      //after func increment to 1
      //turn off the lsat one by doing like index -1 
      //LOOK IT UP
      //tell timer to stop running at end of array length
      //practice in js fiddle first





  // mouseDown: function() {
  //   Game.$colors.on('mousedown', function(){
  //     var colorName = $(this).attr('id');
  //     Game.turnOn(colorName);
  //   });
  // },

  // mouseUp: function() {
  //   Game.$colors.on('mouseup', function(){
  //     var colorName = $(this).attr('id');
  //     Game.turnOff(colorName);
  //     Game.userList.push(colorName);
  //     console.log(Game.userList);
  //   });
  // },



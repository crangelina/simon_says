// goal: user has to repeat computers random list of colors. 
//       if user is correct then computer repeats list and adds one
//		 if user is wrong the game ends


// game object - holds everything Game related
var Game = {
	started: false,

	userList: [],
	computerList: [],

	// hold immediate stuff
	init: function() {
		this.$red = $('#red');
		this.$blue = $('#blue');
		this.$yellow = $('#yellow');
		this.$green = $('#green');
		this.$simonButton = $('#simonButton');

		this.$simonButton.on('click', Game.start);
	},

	// start() - what needs to happen when game started
	start: function() {
		//empty both lists - should this be it's own render func?
		Game.started = true;
		Game.doStuff();
	},

	DoStuff: function() { //not the final func name - might be broken into mult funcs
		//ability to randomly pick/push color to computerList

		//click simonButton
			//if computerList empty then push one color to computerList
			//make color it chose ??light up??
				//else DECIDE()
					
		//click color
			//push color clicked to userLength
		
		//DECIDE
			//if userList.length = computerList.length   --no user mistakes--
				//??tell user they were right/click again??
				// OR have computer automatically "go" again???
				//push one color to computerList
					//make every color in updated computerList ??light up?? in order
				//else    --userList != computerList--
					//tell user game over
					//clicking simonButton will empty both lists and start game again
	},

	


} //Game{}




Game.init();




//---------------------------------------
//			PERSONAL NOTES
//---------------------------------------

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







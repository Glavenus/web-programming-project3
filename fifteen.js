"use strict"; 

/*
 * Global variables declared that are used throughout different functions in the JS script
*/
var gameTile; 
var notify;
var timer;
var spaceY;
var spaceX;
var source;
var time;
var clock;

 window.onload = function (){

    //Declaring variables to store text divs of html page and adding text throught the innerHtml variable.

    var headerDiv = document.getElementById("header");
    headerDiv.innerHTML = "Fifteen Puzzle";


    var theDiv = document.getElementById("openingtext");
    theDiv.innerHTML = "The goal of the fifteen puzzle is to un-jumble its fifteen squares by repeatedly making moves that slide squares into the empty space. How quickly can you solve it?";

    var bottomDiv = document.getElementById("bottomtext");
    bottomDiv.innerHTML = "American puzzle author and mathematician Sam Loyd is often falsely credited with creating the puzzle; indeed, Loyd claimed from 1891 until his death in 1911 that he invented it. The puzzle was actually created around 1874 by Noyes Palmer Chapman, a postmaster in Canastota, New York.";
    
	var puzzleArea = document.getElementById('gameSpace');
    // gameTile variable is an object that has all the divs under gameSpace div
	gameTile = puzzleArea.getElementsByTagName('div'); 

    // for-loop to assign behavior of gameTile divs

	for (var i=0; i<gameTile.length; i++) 
	{
        //first block assigns class name, left and top position of divs, and background position
        
		gameTile[i].className = 'gameTile'; 
		gameTile[i].style.left = (i%4*100)+'px'; 
		gameTile[i].style.top = (parseInt(i/4)*100) + 'px'; 
		gameTile[i].style.backgroundPosition= '-' + gameTile[i].style.left + ' ' + '-' + gameTile[i].style.top; 
		
        // assigning behavior to div css when onmouseover

		gameTile[i].onmouseover = function() 
		{
            // if condition which calls checkMove method with the div's background position as parameter
			if (checkMove(parseInt(this.innerHTML))) 
			{
                // if div is a moveable piece than border changes to solid red with 3px, text changes to green with underline

				this.style.border = "3px solid red"; 
				this.style.color = "#006600"; 
				this.style.textDecoration = "underline"; 
                
			}
		};

        // block of code assigns div's "normal"/static behavior. Border is solid black with 2px thickness and text is also black 

		gameTile[i].onmouseout = function() 
		{
			this.style.border = "2px solid black"; 
			this.style.color = "#000000"; 
			this.style.textDecoration = "none"; 
		};


        // block of code to assign div's on click behavior

		gameTile[i].onclick = function() 
		{
            // if condition which calls checkMove method with the div's background position as parameter
			if (checkMove(parseInt(this.innerHTML))) 
			{
                // swap method is called with the div's innerHTML text value minus 1 for proper indexing          
				swap(this.innerHTML-1); 
                //if condition which calls finish method to check if game is completed correclty
				if (finish()) 
				{
                    // win method called if true
					win(); 
				}
                //return to exit properly
				return;
			}
		};
	}

    //declaring shuffle variable to store div containing shuffle button
	var shuffle = document.getElementById('shufflebutton'); 

    // initializing variables to store the empty div's top position and left position
	spaceX = '300px'; 
	spaceY = '300px';

    // assigning onclick behavior
	shuffle.onclick = function() 
	{
        // for-loop to move pieces 300 times
		for (var i=0; i<300; i++) 
		{
            // initialize ranomd integer variable from 0-100 modulo 4
			var rand = parseInt(Math.random()* 100) %4; 
            // if condition when rand equals 0
			if (rand == 0)
			{
                // initalize temp variable with up method to check if empty piece can move 100px
				var temp = up(spaceX, spaceY); 
                //if condition to check if temp is not false
				if ( temp != -1)
				{
					swap(temp);
				}
			}
            // if condition when rand equals 1
			if (rand == 1)
			{
                 // initalize temp variable with down method to check if empty piece can move -100px
				var temp = down(spaceX, spaceY);
                //if condition to check if temp is not false
				if ( temp != -1) 
				{
					swap(temp);
				}
			}
            // if condition when rand equals 2
			if (rand == 2)
			{
                // initalize temp variable with left method to check if empty piece can move 100px
				var temp = left(spaceX, spaceY);
                //if condition to check if temp is not false
				if ( temp != -1)
				{
					swap(temp);
				}
			}
            // if condition when rand equals 3
			if (rand == 3)
			{
                // initalize temp variable with right method to check if empty piece can move -100px
				var temp = right(spaceX, spaceY);
                //if condition to check if temp is not false
				if (temp != -1)
				{
					swap(temp);
				}
			}
		}
        // initialize variable to store element with id timer
        clock = document.getElementById('timer');
        // if condition to check if time variable is not null to reset interval and clock
        if (time != null) {
            clearInterval(time);
            time = null;
            clock.innerHTML = '00 : ' + '00 : '+ '00';
        }
        // function to create forward counting timer
        (function () {
            var sec = 0;
            var min = 0;
            var hr = 0;
            time = setInterval( () => {
                var s = sec < 10 ? '0' + sec : sec;
                var m = m < 10 ? '0' + min + ': ': min + ': ';
                var h = h < 10 ? '0' + hr + ': ' : hr + ': '; 
                clock.innerHTML = h + m + s;
                sec++;
                if (sec == 60) {
                    min++;
                    sec = 0;
                }
                if (min == 60) {
                    hr++;
                    min = 0;
                    sec = 0;
                }
            }, 1000)
        })()
	};

};

// function to check if any moves of the piece are available

function checkMove(position) 
    {
        if (left(spaceX, spaceY) == (position-1))
        {
            return true;
        }

        if (down(spaceX, spaceY) == (position-1))
        {
            return true;
        }

        if (up(spaceX, spaceY) == (position-1))
        {
            return true;
        }

        if (right(spaceX, spaceY) == (position-1))
        {
            return true;
        }
    }


// in-game winning notification feature method.

function Notify() 
    {
        // decrement notify variable which is assigned to 10 in win method
        notify --; 

        // if condition when notify interval is finished
        if (notify == 0) 
        {
            // body element stored in body variable, background image is changed back to nothing
            var body = document.getElementsByTagName('body'); 
            body[0].style.backgroundImage= "none"; 
            // alert method called with message
            alert('Winner! ... Shuffle and Play Again'); 
            return;
        }
        // timer variable with setTimeout method called to stop method after set time
        timer= setTimeout(Notify, 200); 
    }


// also a part of the in-game winning notification feature, win method called to state behavior of page after finish method is called

function win() 
    {
        // background image is assigned
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundImage= "url('./pikachu-mario.png')";
        //notify variable is assigned to 10 
        notify = 10; 
        // if condition to check is time interval is running
        if (time != null) {
            //reset interval
            clearInterval(time);
            //assign time to null
            time = null;
            // reassign clock div's inner html 
            clock.innerHTML = '00 : ' + '00 : '+ '00';
        }
        // variable with setTimeout Method to stop method after set time
        timer= setTimeout(Notify, 200);
    }


// finish method to check if game is finished

function finish() 
    {
        // boolean variable set true will change false if pieces are not in right position
        var flag = true;
        // for loop to iterate through every pice
        for (var i = 0; i < gameTile.length; i++) 
        {
            // two variable initialized to store top and left position of div
            var top = parseInt(gameTile[i].style.top);
            var left = parseInt(gameTile[i].style.left);
            // if condition to check if variables are not in right position
            // row 1 = starts at first piece all top position are 0px, left: 0, left increments 100px for index 0-3
            // row 2 = starts at fifth piece all top position are 0px, 100px left: 0px, left increments 100px for index 4-7
            // row 3 = starts at nineth piece all top position are 0px, 200px left: 0px, left increments 100px for index 8-11
            // row 4 = starts at thirteenth piece all top position are 0px, 300px left: 0px, left increments 100px for index 12-14
            if (left != (i%4*100) || top != parseInt(i/4)*100) 
            {
                // when if conditoin is true and a piece/s is not in the right space
                flag = false;
                break;
            }
        }
        // returns boolen value
        return flag;
    }

// method to 

function left(x, y) 
    {
        // converts the 300px value to integer value of 300
        var cordX = parseInt(x);
        var cordY = parseInt(y);
        // if condition to make sure that div is not already furthest to the left, col 1
        if (cordX > 0)
        {
            //for-loop to find the index that is to the left of the empty div, if div cannot move left -1 is returned
            for (var i = 0; i < gameTile.length; i++) 
            {
                //if condition that searches for the div that has the left and top position of cordx and cordY
                if (parseInt(gameTile[i].style.left) + 100 == cordX && parseInt(gameTile[i].style.top) == cordY)
                {
                    return i;
                } 
            }
        }
        else 
        {
            return -1;
        }
    }


// right method to find if the div can move right

function right (x, y) 
    {
        var cordX = parseInt(x);
        var cordY = parseInt(y);
        if (cordX < 300)
        {
            for (var i =0; i<gameTile.length; i++){
                if (parseInt(gameTile[i].style.left) - 100 == cordX && parseInt(gameTile[i].style.top) == cordY) 
                {
                    return i;
                }
            }
        }
        else
        {
            return -1;
        } 
    }


// right method to find if the div can move up

function up(x, y) 
    {
        var cordX = parseInt(x);
        var cordY = parseInt(y);
        if (cordY > 0)
        {
            for (var i=0; i<gameTile.length; i++)
            {
                if (parseInt(gameTile[i].style.top) + 100 == cordY && parseInt(gameTile[i].style.left) == cordX) 
                {
                    return i;
                }
            } 
        }
        else 
        {
            return -1;
        }
    }

// down method to check if piece can move right

function down (x, y) 
    {
        var cordX = parseInt(x);
        var cordY = parseInt(y);
        if (cordY < 300)
        {
            for (var i=0; i<gameTile.length; i++)
            {
                if (parseInt(gameTile[i].style.top) - 100 == cordY && parseInt(gameTile[i].style.left) == cordX) 
                {
                    return i;
                }
            }
        }
        else
        {
            return -1;
        } 
    }

//swap method to change positions of pieces on click

function swap (position) 
    { 
        var temp = gameTile[position].style.top;
        gameTile[position].style.top = spaceY;
        spaceY = temp;
        temp = gameTile[position].style.left;
        gameTile[position].style.left = spaceX;
        spaceX = temp;
    }

// puzzle background change feature

function changePic(btn)
    {
     var id = btn.id;
     if (id == "mario") {
        for(let i = 0; i < 15; i++){
            gameTile[i].style.backgroundImage = "url(./racoon-mario.png)";
        }
        return;
     }
     if (id == "wario") {
        for(let i = 0; i < 15; i++){
            gameTile[i].style.backgroundImage = "url(./wario.png)";
        }
        return;
     }
     if(id == "yoshi") {
        for(let i = 0; i < 15; i++){
            gameTile[i].style.backgroundImage = "url(./yoshi-mario.png)";
        }
         return;
     }
     return;
    }
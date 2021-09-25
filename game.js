const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = []; //console.log(gamePattern);
let userClickedPattern = [];
let level = 0;
let started = false;

//Keyboard Press to Start the Game
$(document).keydown(function () {
    if (!started) {
		$("#level-title").text("Level 1");
        setTimeout(nextSequence, 500)
        started = true;
    }
});

//Button Click Handler/Callback Function
$(".btn").click(function (e) {
    const userChosenColour = $(this).attr("id"); //$("#" + this.id);//console.log(userChosenColour); e.target.id;
	
	//Insert userClickedPattern Item
    userClickedPattern.push(userChosenColour); //console.log(userClickedPattern);

    //Button Click Animate and Play Sound
    $("#" + userChosenColour).fadeOut(100).fadeIn(100);
    animatePress(userChosenColour);
    playSound(userChosenColour);
	checkAnswer(userClickedPattern.length  - 1);
});

//Check Answer
function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("success");
		console.log(gamePattern);
		console.log(userClickedPattern);
		
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function() {
				nextSequence();
			}, 1000);
		}
	}
	else {
		console.log("wrong");
		console.log(gamePattern);
		console.log(userClickedPattern);
		gameOver();
		startOver();
	}
}

function nextSequence() {
	userClickedPattern = [];
	
    level++; //level = gamePattern.length;
    $("#level-title").text("Level " + level);

    //Randomize
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];

    //Insert gamePattern Item
    gamePattern.push(randomChosenColour);

    //Game Reload Animate and Play Sound
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//Play Sound Function
function playSound(name) {
    let randomSound = new Audio("sounds/" + name + ".mp3");
    randomSound.play();
}

//Animate Press Function
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
    //console.log($(this).attr("id"));
}

//Game Over
function gameOver() {
	let audio = new Audio("sounds/wrong.mp3");
	audio.play();
	
	$("body").addClass("game-over");
	setTimeout(function() {
		$("body").removeClass("game-over");
	}, 200);
	
	$("#level-title").text("Game Over, Press Any Key to Restart");
}

//Start Over
function startOver() {
	level = 0;
	started = false;
	gamePattern = [];
}

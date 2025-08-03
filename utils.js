var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// start the game
$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
    $("#level-title").text("level " + level);
  }
});

// check answer
function checkAnswer(currentLevel) {
  // var userChoice = userClickedPattern.push(currentLevel);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("succes");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// button click function
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// sound function
function playSound(name) {
  var newAudio = new Audio("sounds/" + name + ".mp3");
  newAudio.play();
}
// animation clcks
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// automatic button selection
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

// restart
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

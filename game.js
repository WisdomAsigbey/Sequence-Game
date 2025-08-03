// game pattern
var gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// btn colors
const buttonColours = ["red", "blue", "green", "yellow"];

function startGame() {
  if (!started) {
    nextSequence();
    started = true;
    $("#level-title").text(`Level ${level}`);
  }
}
$(document).on("keypress", startGame);

// audio function
function playAudio(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

// new sequence function
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playAudio(randomChosenColour);
}

// check answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    playAudio("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text(`Game Over, Press Any Key to Start`);
    startOver();
  }
}

// btn click
$(".btn").on("click", function (e) {
  const userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playAudio(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// animate press
function animatePress(currentColour) {
  $(`.${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`.${currentColour}`).removeClass("pressed");
  }, 100);
}

// restart game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

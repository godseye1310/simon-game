var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
$(document).on("keypress", function() {
  if (started == false) {
    nextSequence();
    started = true;
    $("#level-title").html("Level " + level)
    console.log(started)
  }
})

var level = 0;

function nextSequence() {
  userClickedPattern = [];

  level++; //increase the level by 1 every time nextSequence() is called.
  $("#level-title").text("Level " + level); //update the h1 with this change in the value of level.

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor)
  $("#" + randomChosenColor).fadeIn(150).fadeOut(150).fadeIn(150);

  // return gamePattern;

}

$(".btn").click(function handler() {
  var userChosenColor = $(this).attr("id");
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1)

})


function playSound(psound) {
  var audio = new Audio("sounds/" + psound + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed")
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 150);
}

function checkAnswer(curentLevel) {
  var gp = gamePattern;
  var ucp = userClickedPattern;

  if (gp[curentLevel] === ucp[curentLevel]) {
    console.log("success");

    if (gp.length === ucp.length) {
      setTimeout(()=> {
        nextSequence();
      }, 1500);

    }
  } else {
    console.log("wrong");

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(()=> $("body").removeClass("game-over"), 1000);

    $("#level-title").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

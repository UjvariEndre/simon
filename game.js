var started = false;
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var pressCounter = 0;

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  // Modify h1 tag
  $("h1").text("Level " + (level + 1));

  //Pattern tárolása
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function startOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
  }, 200);
  level = 0;
  pressCounter = 0;
  userClickedPattern =[];
  gamePattern = [];
  started = false;
}

function checkAnswer(press) {
  //Aktuális szín jó?
  if(userClickedPattern[press] !== gamePattern[press]){
    startOver();
  } else if(userClickedPattern.length >= gamePattern.length){//Vége a pattern-nek?
    level++;
    pressCounter = 0;
    userClickedPattern =[];
    setTimeout(nextSequence, 1000);
  }
}

$(document).on("keypress", function() {
  if(!started) {
    started = true;
    nextSequence();
  }
});

$(".btn").click(function() {
  pressCounter++;
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  //minden gomb lenyomást ellenőriz
  checkAnswer(pressCounter - 1);
});

$("h1").click(function() {
  if(!started) {
    started = true;
    nextSequence();
  }
});

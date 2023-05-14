//Game Variables
var gamePattern = [];
var userClickedPattern = [];
let bigScore = 0;
let currentScore = 0;
let reLoaded = 0;
let highScore =  "High Score " + "level " + bigScore



var buttonColors = ["red", "blue", "green", "yellow"];

function playSound(name) {
  var audio = new Audio(__dirname + "sounds/" + name + ".mp3");

  audio.play(name);
}

function animatePress(press) {
  $("#" + press).addClass("pressed");
  setTimeout(function () {
    $("#" + press).removeClass("pressed");
  }, 100);
}

var level = 0;

function nextSequence() {
  userClickedPattern = [];

  randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColors = buttonColors[randomNumber];

  gamePattern.push(randomChosenColors);

  $("#" + randomChosenColors)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColors);

  if (level === 0) {
    $("#level-title").text("Level " + level);
  } else if (level > 0) {
    $("#level-title").text("Level " + level);
  }

  level++;
}
//alert (randomChosenColors);

//Game Variable End

//Button Selection

$(".btn").on("click", function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
//Button Selection End

//Game Start//

let gameStart = 0;
$("body").on("click", function () {
  if (gameStart === 1) {
    if(reLoaded < 1){
      loadedPage();
      reLoaded ++;
    }
    highScore = "High Score " + "level " + bigScore;
    $("#highscore").text(highScore);
    nextSequence();
  }
  gameStart++;
});
$("body").on("keypress", function () {
  if (gameStart === 1) {
    
    if(reLoaded < 1){
      console.log("first-time load")
      loadedPage();
      reLoaded ++;
    }
    nextSequence();
  }
  gameStart++;
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 100);
      setTimeout(function () {
        $("body").addClass("game-correct");
        currentScore++;
        if (bigScore < currentScore) {
          bigScore = currentScore;
        }
         highScore = "High Score " + "level " + bigScore;
        $("#highscore").text(highScore);
        console.log(bigScore);
        console.log(currentScore);
      }, 1);
      setTimeout(function () {
        $("body").removeClass("game-correct");
      }, 100);
    }
  } else {
    gameOver();
  }
}


function displayGreen(){
 
  var audio = new Audio(__dirname + 'sounds/blue.mp3');
  audio.play();     
  

}
function displayRed(){
  
  var audio = new Audio(__dirname + 'sounds/blue.mp3');
  audio.play();     
 

}
function displayYellow(){
  var audio = new Audio(__dirname + 'sounds/blue.mp3');
  audio.play();     

}
function displayBlue(){
  var audio = new Audio(__dirname + 'sounds/blue.mp3');
  audio.play();     

}
function displayRes(){
 
  var audio = new Audio(__dirname + 'sounds/wrong.mp3');
  audio.play();     
  
}

function loadedPage (){
  displayRed();
  displayYellow();
  displayBlue();
  displayGreen();
console.log("first-time load")
} 

function gameOver() {
  currentScore = 0;
  gameStart = 0;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  setTimeout(function () {
    $("body").addClass("game-over");
  }, 1);
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
  var wrong = new Audio(__dirname + "sounds/wrong.mp3");
  wrong.play();
  $("#level-title").text("Game Over! Press Any Key To Restart");
  $("body").one("keypress", nextSequence);
  if (currentScore == 0) {
    $("#highscore").text('')
  }
}

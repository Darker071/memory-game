// var userChosenColour = [];
var userClickedPattern = []; 
var buttonColours = ["red", "blue", "green", "yellow"];
// var currentColour = userChosenColour;
var level = 0;
var started = false;
var gamePattern = [];


$(document).keydown(function(){

if (!started){
    
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true; 
}
});

$(".btn").click(function(){
   
    var userChosenColour = $(this).attr("id");
    // var colorSelected = $(this).attr("id");
    // userChosenColour.push(colorSelected);
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
  
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else {
    
        console.log("wrong");
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
  }

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level );

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
   
    
    gamePattern.push(randomChosenColour);
    console.log(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
}

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

// function animatePress(currentColour){

// $(".btn").on("click", function() {
//     $(".btn").addClass(".pressed");
//     $(".btn").setTimeout(remove(".pressed"), 100);

// })
    
// }
        
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    
}



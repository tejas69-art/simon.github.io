var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var level = 0;

var started = false;

var userClickedPattern = [];


$(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
$(".bt").click(function(){

  if (!started){
    $("#level-title").text("Level " + level);
      nextSequence();
      started = true;

  }
});
$(".btn").click(function (event) { 
    var userChosencolor = $(this).attr("id");
    userClickedPattern.push(userChosencolor);
    playSound(userChosencolor);
    animatePress(userChosencolor);
    checkAnswer(userClickedPattern.length-1);
  
});

function checkAnswer(currentLevel){

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function(){
          nextSequence();
        }, 1000);

      }

    } else {
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();

     $("#level-title").text("game over,click a key to restart the game")
      
      $("body").addClass("game-over");
      setTimeout(function(){
       $("body").removeClass("game-over");
      }, 1000);

      var end = true;
      startOver(end);
      

    }

}












function nextSequence(){
    userClickedPattern = [];

    level = level+1
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomchosenColors = buttonColors[randomNumber];
    gamePattern.push(randomchosenColors);

    $("#"+randomchosenColors).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomchosenColors)
}


function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
    

}

function animatePress(currentColor){
    
    $("#"+currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);

}




function startOver(result){
    if (result){
    level = 0;
    gamePattern = [];
    started = false;
  
    }
  }










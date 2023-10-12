var userClickedPattern = [];
var pattern = [];
var avlcolors = ["green","red","yellow","blue"];

var started = false;
var level = 0;
$(document).keypress(function(event){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length -1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == pattern[currentLevel]){
        if(userClickedPattern.length == pattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var rndmnum = Math.floor(Math.random()*4);
    var chosencolor = avlcolors[rndmnum];
    pattern.push(chosencolor);

    $("#" + chosencolor).fadeOut(200).fadeIn(200);
    playSound(chosencolor);
}

function playSound(name){
    var aud = new Audio("./sounds/" + name + ".mp3");
    aud.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function startOver(){
    started = false;
    level = 0;
    pattern = [];
}

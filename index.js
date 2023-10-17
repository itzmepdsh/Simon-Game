var userClickedPattern = [];
var pattern = [];
var avlcolors = ["green","red","yellow","blue"];

var started = false;
var level = 0;

$(".start-btn").click(function(){
    if(!started){
        $(".start-btn").addClass("start-btn-remove");
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(document).keypress(function(event){
    if(!started){
        $("#level-title").text("Level " + level);
        $(".start-btn").addClass("start-btn-remove");
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
        $(".start-btn").removeClass("start-btn-remove");
        $(".start-btn").text("Start Again!!");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

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

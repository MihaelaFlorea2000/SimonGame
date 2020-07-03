/**
 * Possible color options
 * @type {string[]}
 */
var btnColors = ["red", "blue", "green", "yellow"];

/**
 * Pattern of colors required
 * @type {*[]}
 */
var gamePattern = [];

/**
 * Pattern of colors the user entered
 * @type {*[]}
 */
var userPattern = [];

/**
 * Whether the game has started
 * @type {boolean}
 */
var gameStarted = false;

/**
 * The Level of the Game
 * @type {number}
 */
var level = 0;


/**
 * Start the game on any key press (if it hadn't already started)
 */
$(document).on("keypress", function() {

    if (!gameStarted) {
        gameStarted = true;
        $("#level-title").html("Level 0");
        nextSequence();
    }
});

/**
 * Show the user the next random color in the sequence
 */
function nextSequence() {
    // Add random color
    var rand = Math.floor(Math.random() * 4);
    var randColor = btnColors[rand];
    gamePattern.push(randColor);

    // Flash effect
    $("#" + randColor).fadeOut(100).fadeIn(100);

    // Btn sound
    playSound(randColor);

    // Increase level
    level++;
    $("#level-title").html("Level " + level);
}

/**
 * Record the color the user has clicked on
 */
$(".btn").on("click", function() {

    if (gameStarted) {
        // Save btn color
        var userColor = $(this).attr("id");
        userPattern.push(userColor);

        playSound(userColor);

        animatePress(this);

        checkAnswer(userPattern.length - 1);
    }
});

/**
 * Play a specific sound
 * @param name - of mp3 file
 */
function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

/**
 * Animate a button being pressed
 * @param colorBtn - which btn to animate
 */
function animatePress(colorBtn) {
    $(colorBtn).addClass("pressed");

    setTimeout(function() {
        $(colorBtn).removeClass("pressed");
    }, 100);
}

/**
 * Check if the user answer is correct
 * @param currentLevel - current index in the userPattern
 */
function checkAnswer(currentLevel) {
    // Is the current color correct?
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {

        // Has the user completed the sequence?
        if(userPattern.length === gamePattern.length) {

            // Move on to next level
            setTimeout(function() {nextSequence()}, 1000);
            userPattern = [];
        }
    } else {
        playSound("wrong");

        // Game over effect
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").html("Game Over, Press Any Key to Restart");

        startOver();
    }
}

/**
 * Reset the game
 */
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}



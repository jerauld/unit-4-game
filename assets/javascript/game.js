$(document).ready(function () {

    //Set Wins Loss to Zero
    var wins = 0;
    var losses = 0;

    // Custom Random Number Generator (See Generate Rupees Function for Random Numbers Arrary No Repeats)
    var getRandomIntInclusive = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Game Dialogue
    var txtIntro = ["Let's play a number matching game!", "I have a magic number.", "Click on the four rupees to match my magic number.", "The value of each rupee is a secret to everybody.", "Click on a rupee to get started."];
    var txtResult = ["You win! Click anywhere to play again!", "You lose! Click anywhere to try again!"]

    // Dialogue and Game Controllers
    var txtFinished = true;
    var roundFinished = false;
    var gameStarted = false;
    var j = 0;


    // Custom Retro Type Function
    var typeWriter = function (arr, num) {
        var txt = arr;
        var i = 0;
        var timer = setInterval(function () {
            if (i < txt[num].length) {
                $("#demo").append(txt[num].charAt(i));
                new Audio("assets/audio/LOZ_Text_Slow.wav").play();
                i++;
            } else {
                clearInterval(timer);
                txtFinished = true;
            }
        }, 50);
    };

    //On Click Introduction Text
    $(document).on("click", function () {
        if (j >= txtIntro.length) {
            if (roundFinished && txtFinished) {
                resetGame();
            } else {
                return;
            }
        } else if (txtFinished) {
            $("#demo").text("");
            typeWriter(txtIntro, j);
            txtFinished = false;
            j++;
        }
        //On Click Game Start Sequence
        if (j === 1) {
            clickToStart(); 
            $("#skip-intro").text("Click here to skip intro");
        } else if (j >= txtIntro.length) {
            $("#skip-intro").addClass("isHidden");
        }
    });
    
    // On Click Skip Intro
    $("#skip-intro").on("click", function () {
        if (txtFinished) {
            txtFinished = false;
            $("#demo").text("");
            j = 4
            typeWriter(txtIntro, j);
            j++
            $("#skip-intro").addClass("isHidden");
        }
    });

    
    // Generate Random Target Number
    var targetNumber = getRandomIntInclusive(19, 120);

    // Set User Counter
    var counter = 0;

    // Rupee Image Array
    var rupeeImageArray = ["assets/images/rupee-purple.png", "assets/images/rupee-red.png", "assets/images/rupee-blue.png", "assets/images/rupee-green.png"]


    // Generate Rupees Function
    function generateRupees() {
        //Generate Random Number Options (No Repeats)
        var generateNumberOptions = function () {
            while (numberOptions.length < 4) {
                var randomNumber = getRandomIntInclusive(2, 12);
                if (!numberOptions.includes(randomNumber)) {
                    numberOptions.push(randomNumber);
                }
            }
        }

        var numberOptions = [];

        
        generateNumberOptions();
        

        //Generate Rupee Images with Values
        for (var i = 0; i < rupeeImageArray.length; i++) {
            var imageRupee = $("<img>");
            imageRupee.addClass("rupee-image");
            imageRupee.attr("src", rupeeImageArray[i]);
            imageRupee.attr("data-rupeevalue", numberOptions[i]);
            $("#rupees").append(imageRupee);
        }
    }

    
    // On Click Rupee Functions
    $(document).on("click", ".rupee-image", function () {
        if ((j >= txtIntro.length) && (txtFinished) && (roundFinished === false)) {
            $("#demo").text("");
            new Audio("assets/audio/LOZ_Get_Rupee.wav").play();
            var rupeeValue = ($(this).attr("data-rupeevalue"));
            rupeeValue = parseInt(rupeeValue);
            counter += rupeeValue;
            $("#userCounter").text(counter);

            if (counter === targetNumber) {
                new Audio("assets/audio/LOZ_Secret.wav").play();
                typeWriter(txtResult, 0);
                wins++;
                $("#win-count").text(wins);
                txtFinished = false;
                roundFinished = true;

            } else if (counter >= targetNumber) {
                new Audio("assets/audio/LOZ_Link_Die.wav").play();
                losses++;
                $("#loss-count").text(losses);
                typeWriter(txtResult, 1);
                txtFinished = false;
                roundFinished = true;

            }
        }
    });

    // Click To Start
    $("#clickToStart").text("Click anywhere to start");
    new Audio("assets/audio/LOZ_Stairs.wav").play();
    $('#link').show();
    $('#link').animate({opacity:0},0)
    $('#link').animate({opacity: 1.0, top: '-=66px'}, 1000); 

    
 
    // Initializes Introduction and Game Space
    function clickToStart(){
        if (gameStarted === false) {
        $("#win-count").text(wins);
        $("#loss-count").text(wins);
        $("#win-header").text("wins");
        $("#loss-header").text("losses");
        $("#number-to-guess").text(targetNumber);
        $("#userCounter").text(counter);
        $("#clickToStart").addClass("isHidden");
        generateRupees();
        gameStarted = true;
        } 
         
    }

     // New Round Reset
    function resetGame() {
        //Clear Round Ending Message
        $("#demo").text("");
        //Reset Random Number
        targetNumber = getRandomIntInclusive(19, 120);
        $("#number-to-guess").text(targetNumber);
        //Reset User Score
        counter = 0;
        $("#userCounter").text(counter);
        //Generate New Rupees
        $( ".rupee-image" ).remove();
        generateRupees();
        //Round is Finished
        roundFinished = false;
        
    }
});
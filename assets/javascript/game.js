$(document).ready(function () {

    var wins = 0;
    var losses = 0;
   
    $("#clickToStart").text("Click anywhere to start");
    new Audio("assets/audio/LOZ_Stairs.wav").play();
    
    $("#clickToStart").on("click", function(){
        $("#win-count").text(wins);
        $("#loss-count").text(wins);
        $("#win-header").text("wins");
        $("#loss-header").text("losses");
        $("#number-to-guess").text(targetNumber);
        $("#user-total-score").text(counter);
        $("#clickToStart").addClass("isHidden");
        generateRupees();
    });

    var getRandomIntInclusive = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var txtIntro = ["Let's play a number matching game!", "I have a magic number.", "Click on the four rupees to match my magic number.", "The value of each rupee is a secret to everybody.", "Click on a rupee to get started..."];
    var txtResult = ["You win! Click anywhere to play again!", "You lose! Click anywhere to try again!"]
    var txtFinished = true;
    var roundFinished = false;
    var j = 0;

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
        }, 75);
    };

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
        
        if (j === 1) {
            $("#skip-intro").text("Click here to skip intro");
        } else if (j >= txtIntro.length) {
            $("#skip-intro").addClass("isHidden");
        }
    });

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

    var targetNumber = getRandomIntInclusive(19, 120);
    var counter = 0;


    var rupeeImageArray = ["assets/images/gem-purple.png", "assets/images/gem-red.png", "assets/images/gem-blue.png", "assets/images/gem-green.png"]

    function generateRupees() {

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

        for (var i = 0; i < rupeeImageArray.length; i++) {
            var imageCrystal = $("<img>");
            imageCrystal.addClass("crystal-image");
            imageCrystal.attr("src", rupeeImageArray[i]);
            imageCrystal.attr("data-crystalvalue", numberOptions[i]);
            $("#crystals").append(imageCrystal);
        }
    }

    

    $(document).on("click", ".crystal-image", function () {
        if ((j >= txtIntro.length) && (txtFinished) && (roundFinished === false)) {
            $("#demo").text("");
            new Audio("assets/audio/LOZ_Get_Rupee.wav").play();
            var crystalValue = ($(this).attr("data-crystalvalue"));
            crystalValue = parseInt(crystalValue);
            counter += crystalValue;
            $("#user-total-score").text(counter);

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

    function resetGame() {
        //Clear Round Ending Message
        $("#demo").text("");
        //Reset Random Number
        targetNumber = getRandomIntInclusive(19, 120);
        $("#number-to-guess").text(targetNumber);
        //Reset User Score
        counter = 0;
        $("#user-total-score").text(counter);
        //Generate New Crystals
        $( ".crystal-image" ).remove();
        generateRupees();
        //Round is Finished
        roundFinished = false;
        
    }
});
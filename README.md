# unit-4-game

**Overview**

Zelda Rupee Game was created for the `unit-4-game` homework assignemnt for Berkeley Coding Bootcamp based on the CrystalsCollector Game demo. It is a fun and interactive game for web browsers that dynamically updates the HTML page with the jQuery library.

**Requirements**

- There will be four crystals displayed on the page.
- The player will be shown random numbers at the start of the game.
- When the player clicks on a crystal, it will add a specific amount of points to the player's total score
    - The game will hide this amount until the player clicks a cyrstal. When they do click one, the player's score counter is updated.
- The player wins if their total score matches the random number from the beginning of the game.
- The player loses if their score goes above the random number.
- The game restarts whenever the player wins or loses.
- When the game begins again, the player should see a new random number. Also, all the crystals will have four new hidden values. Of course, the user's score (and score counter) will reset to zero.
- The app should show the number of games the player wins and loses. To that end, do not refresh the page as a means to restart the game.

**Game Design Notes**

-The random number shown at the start of the game should be between 19-120.
-Each crystal should have a random hidden value between 1-12.

**Personal Game Design Notes**

-Fonts: Google Fonts, Press Start 2P

-Random Number

    ``` Javascript
        var getRandomIntInclusive = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    ```

-Random Number Array (No Repeats)

    ``` Javascript
        var generateNumberOptions = function () {
            while (numberOptions.length < 4) {
                var randomNumber = getRandomIntInclusive(2, 12);
                if (!numberOptions.includes(randomNumber)) {
                    numberOptions.push(randomNumber);
                }
            }
        }
    ```
-Custom Type Writer Function

    ``` Javascript
        var typeWriter = function (arr, num) {
            var txt = arr;
            var i = 0;
            var timer = setInterval(function () {
                if (i < txt[num].length) {
                    $("#demo").append(txt[num].charAt(i));
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 50);
        };
    ```

- Looping Audio
    - jQuery .play() was unappropriate to use due to the multiple requests being fired off. Opt for the following instead for audio purposes.

    ``` Javascript
        new Audio("assets/audio/LOZ_Text_Slow.wav").play();
    ```
    - Zelda SoundEffects
        Legend of Zelda Sound Effects, Presented by Help The Wretched, http://noproblo.dayjo.org/ZeldaSounds/

- Animation + Fade

    ``` CSS
        #link {
            display: none;
        }
    ```

    ``` Javascript
        $('#link').show();
        $('#link').animate({opacity:0},0)
        $('#link').animate({opacity: 1.0, top: '-=66px'}, 1000); 
    ```

- Other Design Notes
    - What made me opt for the CrystalsCollector concept rather than the RPG was the opportunity to utilize all skills learned up until this point. Zelda made allowed me to be creative via the constraint being true to the game.
    - Images, Photoshop splicing of game screenshots then scaling, and editing.
    - Had to use a controller to control intro, rounds, and txt output to prevent text looping over each other and unwanted rupees being generated.

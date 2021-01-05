document.getElementById("hideAll").style.display = "block";
var easy = document.querySelectorAll("li")[3];
var hard = document.querySelectorAll("li")[4];
var consent = document.getElementById("agree");
var cancel = document.getElementById("reject");
var playerScoreEasy = [];
var playerScoreHard = [];
var easyHighScore = 0;
var hardHighScore = 0;
var display;
var encourage = ["Yay!", "Way To Go!", "Awesome!", "Hooray!", "A Big Fat YES!"];
var discourage = ["Oops, Try Again!", "Don't Give Up!", "Nah... You can do better", "A Big Fat NO!"]
var bgm = document.querySelector("#bgm"); //bgm.mp3
var game = document.querySelector("#newGame"); //new.mp3
var correct = document.querySelector("#correct");//correct.mp3
var wrong = document.querySelector("#wrong");//wrong.mp3
var end = document.querySelector("#end"); //end.mp3
var cheers = document.querySelector("#cheers"); //cheers.mp3
var r, g, b;
var redShade, greenShade, blueShade;
var shade = [];

window.onload = function() {
  document.getElementById("hideAll").style.display = "none";
}

easy.addEventListener("click", function() {
  consent.addEventListener("click", function toggle() {
    easy.classList.add("hard");
    hard.classList.remove("hard");
    hard.setAttribute("data-target", "#difficulty");
    setTimeout(function(){
      easy.removeAttribute("data-target");
    }, 500);
    $('#difficulty').modal('hide');
    document.getElementById("highScore").textContent = "Hi-Score : " + easyHighScore;
    newGame();
    randomColorsGenerate();
    consent.removeEventListener("click", toggle);
  });
});

hard.addEventListener("click", function() {
  consent.addEventListener("click", function toggle() {
    hard.classList.add("hard");
    easy.classList.remove("hard");
    easy.setAttribute("data-target", "#difficulty");
    setTimeout(function(){
      hard.removeAttribute("data-target");
    }, 500);
    $('#difficulty').modal('hide');
    document.getElementById("highScore").textContent = "Hi-Score : " + hardHighScore;
    newGame();
    randomColorsGenerate();
    for (var i = 3; i < 6; i++) {
      squares[i].addEventListener("click", compareColors);
    }
    consent.removeEventListener("click", toggle);
  });
});

var k = 6;
var squares = document.getElementsByClassName("square");
var colors = [];
var j;
var icons = document.querySelectorAll("i");
var hearts = icons.length;
var score = 0;
var isClicked = false;
// var highScore = 0;

randomColorsGenerate();
game.play();

document.querySelector("li").addEventListener("click", randomColorsGenerate);
score = 0;
document.querySelector("h3").textContent = "Score : " + score;
document.querySelector("li").addEventListener("click", newGame);

function randomColorsGenerate() {
  var k;
  console.log(score);
  if (easy.classList.contains("hard"))
    k=3;
  else
    k=6;
  console.log(k);
  j = Math.floor(Math.random()*k);
  document.getElementById("message").textContent = "Play!";
  for (var i = 0; i < k; i++) {
    r = Math.floor(Math.random()*256);
    g = Math.floor(Math.random()*256);
    b = Math.floor(Math.random()*256);
    console.log(i + ". " + r,g,b);
    squares[i].style.backgroundColor = "rgb(" + r + ", " + g + ", " + b +")";
    colors[i] = "rgb(" + r + ", " + g + ", " + b +")";
    console.log(colors[i]);
    var displayedColour = colors[j];
  }
  while (k < 6) {
    squares[k].style.backgroundColor = "#232323";
    squares[k].removeEventListener("click", compareColors);
    k++;
  }
  for (k = 0; k < hearts; k++) {
    icons[k].style.color = "crimson";
  }
  console.log(k);
  document.querySelector("h2").textContent = displayedColour;
  console.log(displayedColour);
}

function newGame() {
  if (hearts === 0) {
    document.getElementById("game-over").classList.add("d-none");
    document.getElementById("crux").classList.remove("d-none");
  }
  game.play();
  if (easy.classList.contains("hard"))
    k=3;
  else
    k=6;
  for (var i = 0; i < k; i++) {
    squares[i].addEventListener("click", compareColors);
  }
  isClicked = true;
  hearts = icons.length;
  for (var i = 0; i < icons.length; i++) {
    icons[i].style.color = "crimson";
  }
  score = 0;
  document.querySelector("h3").textContent = "Score : " + score;
}

console.log(isClicked);
for (var i = 0; i < k; i++) {
  squares[i].addEventListener("click", compareColors);
}

function compareColors() {
  var displayedColour = colors[j];
  // var highScore;
  if (this.style.backgroundColor !== displayedColour) {
    this.removeEventListener("click", compareColors);
    document.getElementById("message").textContent = discourage[Math.floor(Math.random()*4)];
    wrong.play();
    this.style.backgroundColor = "#232323";
    icons[hearts-1].style.color = "#232323";
    hearts--;
    if (hearts === 0) {
      for (var m = 0; m < squares.length; m++) {
        squares[m].style.backgroundColor = "#232323";
      }
      document.getElementById("message").textContent = "Game Over!";
      document.getElementById("crux").classList.add("d-none");
      document.getElementById("game-over").classList.remove("d-none");
      document.getElementById("message").classList.remove("highscore");
      wrong.pause();
      wrong.currentTime = 0;
      end.play();
      document.getElementById("play-again").addEventListener("click", function(){
        document.getElementById("game-over").classList.add("d-none");
        document.getElementById("crux").classList.remove("d-none");
        randomColorsGenerate();
        newGame();
        game.play();
        hearts = icons.length;
        for (var i = 0; i < k; i++) {
          squares[i].addEventListener("click", compareColors);
        }
      });
      if (hard.classList.contains("hard")) {
        playerScoreHard.push(score);
        hardHighScore = max(playerScoreHard);
        console.log(hardHighScore);
        document.getElementById("score-display").textContent = "Score : " + score;
        document.getElementById("highscore-display").textContent = "Hi-Score : " + hardHighScore;
        document.getElementById("highScore").textContent = "Hi-Score : " + hardHighScore;
      }
      else if (easy.classList.contains("hard")) {
        playerScoreEasy.push(score);
        easyHighScore = max(playerScoreEasy);
        console.log(easyHighScore);
        document.getElementById("score-display").textContent = "Score : " + score;
        document.getElementById("highscore-display").textContent = "Hi-Score : " + easyHighScore;
        document.getElementById("highScore").textContent = "Hi-Score : " + easyHighScore;
      }
      score = 0;
      setTimeout(function() {
        document.querySelector("h3").textContent = "Score : 0";
      }, 1500);
    }
  }
  else {
    console.log(r, g, b);
    shade = colors[j].match(/\d+/g).map(Number);
    redShade = Math.floor(0.81*shade[0]);
    greenShade = Math.floor(0.81*shade[1]);
    blueShade = Math.floor(0.81*shade[2]);
    document.getElementById("message").textContent = encourage[Math.floor(Math.random()*5)];
    correct.play();
    document.querySelector(".header").style.backgroundColor = colors[j];
    console.log(redShade, greenShade, blueShade);
    document.querySelector("h2").style.backgroundColor = "rgb(" + redShade + ", " + greenShade + ", " + blueShade + ")";
    document.querySelector('meta[name="theme-color"]').setAttribute("content", "rgb(" + shade[0] + ", " + shade[1] + ", " + shade [2] + ")");
    document.querySelector('meta[name="msapplication-navbutton-color"]').setAttribute("content", "rgb(" + shade[0] + ", " + shade[1] + ", " + shade [2] + ")");
    document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]').setAttribute("content", "rgb(" + shade[0] + ", " + shade[1] + ", " + shade [2] + ")");
    setTimeout(function() {
      document.querySelector(".header").style.backgroundColor = "#4878AB";
      document.querySelector("h2").style.backgroundColor = "#3B638C";
      document.querySelector('meta[name="theme-color"]').setAttribute("content", "#376AA0");
      document.querySelector('meta[name="msapplication-navbutton-color"]').setAttribute("content", "#376AA0");
      document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]').setAttribute("content", "#376AA0");
    }, 1500);
    if (hearts !== 0) {
      score ++;
      console.log(hardHighScore);
      if (score - hardHighScore === 1 && hard.classList.contains("hard")) {
        document.getElementById("message").textContent = "New High Score!";
        document.getElementById("message").classList.add("highscore");
        cheers.play();
      }
      if (score - easyHighScore === 1 && easy.classList.contains("hard")) {
        document.getElementById("message").textContent = "New High Score!";
        document.getElementById("message").classList.add("highscore");
        cheers.play();
      }
      document.querySelector("h3").textContent = "Score : " + score;
    }
    else {
      score = 0;
      document.querySelector("h3").textContent = "Score : " + score;
    }
    if (easy.classList.contains("hard"))
      k=3;
    else
      k=6;
    for (var m = 0; m < k; m++) {
      squares[m].style.backgroundColor = colors[j];
    }
    setTimeout(randomColorsGenerate, 1500);
    for (var i = 0; i < k; i++) {
      squares[i].addEventListener("click", compareColors);
    }
  }
}

function max(playerScoreHard) {
  var maxim = playerScoreHard[0];
    for (var j = 1; j < playerScoreHard.length; j++) {
      if (maxim > playerScoreHard[j]);
      else
        maxim = playerScoreHard[j];
    }
    return maxim;
}

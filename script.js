// Game variables and constants

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 7;
let lastpaintTime = 0;
let snakeArr = [{ x: 10, y: 12 }];
let food = { x: 5, y: 7 };
let score = 0;


// Main Game Function

function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
    return false;
  }
  musicSound.play();
  lastpaintTime = ctime;
  gameEngine();
}
function isCollide(snake) {


  for (var i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y ===snake[0].y) {
      return true;
    }
  }
  if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
    return true;
  }


}
function gameEngine() {
  if (isCollide(snakeArr)) {
    musicSound.pause();
    gameOverSound.play();
    alert("Your game is over. Please press enter to continue");
    score = 0;
    snakeArr = [{ x: 10, y: 12 }];
    inputDir = { x: 0, y: 0 };
    musicSound.play();
    food = { x: 5, y: 7 };
  }

  // If you eat you food, then add it to the snake body and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    // console.log("you got a one more point");
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y
    });
    foodSound.play();

    // increasing the score by element called div for score
    score += 1;
    updateScore(score);
    console.log(score);


    //generate a random number between 2 and 16 to regenerate the food and log the snakeArr
    // to console
    let a = 2;
    let b = 16;
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
  }


  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: Display the snake and Food
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add('head');
    }
    else {
      snakeElement.classList.add('SnakeBody');
    }
    board.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food')
  board.appendChild(foodElement);
}

//Main logic start here
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
  //Game start here
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      // console.log("ArrowUp");
      inputDir.x = 0; //columns
      inputDir.y = -1; //Rows
      break;

    case "ArrowDown":
      // console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      // console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      // console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});



//adding a element for display score
function updateScore(score) {
  scoreCont = document.getElementsByClassName("score")[0];
  scoreCont.innerHTML="Your Score is: " + score;
}

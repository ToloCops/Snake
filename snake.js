//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//food
var foodX;
var foodY;

//snake head
snakeX = Math.floor(Math.random() * cols) * blockSize;
snakeY = Math.floor(Math.random() * rows) * blockSize;

var velocityX = 0;
var velocityY = 0;

var snake = [[snakeX, snakeY]];

board = $("#board");
board.attr("width", blockSize * cols);
board.attr("height", blockSize * rows);
context = board[0].getContext("2d");

placeFood();
$(document).keydown(changeDirection);
setInterval(update, 1000 / 10);

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(event) {
  switch (event.keyCode) {
    //left
    case 37:
      velocityX = -blockSize;
      velocityY = 0;
      break;
    //up
    case 38:
      velocityX = 0;
      velocityY = -blockSize;
      break;
    //right
    case 39:
      velocityX = blockSize;
      velocityY = 0;
      break;
    //down
    case 40:
      velocityX = 0;
      velocityY = blockSize;
      break;
  }
}

function update() {
  //clear the board
  context.fillStyle = "green";
  context.fillRect(0, 0, board.attr("width"), board.attr("height"));

  //draw the food
  context.fillStyle = "red";
  context.beginPath();
  context.arc(foodX + blockSize / 2, foodY + blockSize / 2, blockSize / 2, 0, 2 * Math.PI);
  context.fill();

  //update the head of the snake
  snakeX += velocityX;
  snakeY += velocityY;

  //update snake body
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = snake[i - 1];
  }

  if (snake.length > 0) {
    snake[0] = [snakeX, snakeY];
  }

  //check if the snake ate the food
  if (snakeX == foodX && snakeY == foodY) {
    console.log("ate the food");
    snake.push([snakeX, snakeY]);
    placeFood();
  }

  //draw the snake
  for (var i = 0; i < snake.length; i++) {
    // Create gradient
    var gradient = context.createRadialGradient(
      snake[i][0] + blockSize / 2,
      snake[i][1] + blockSize / 2,
      1,
      snake[i][0] + blockSize / 2,
      snake[i][1] + blockSize / 2,
      blockSize / 2
    );
    gradient.addColorStop(0, "lime");
    gradient.addColorStop(1, "green");

    context.fillStyle = gradient;
    context.beginPath();
    context.arc(snake[i][0] + blockSize / 2, snake[i][1] + blockSize / 2, blockSize / 2, 0, Math.PI * 2, true);
    context.fill();

    // Draw border
    context.lineWidth = 3; // Make the border thicker
    context.strokeStyle = "darkgreen";
    context.stroke();
  }
}

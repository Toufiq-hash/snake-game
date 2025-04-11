const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Constants
    const TILE_SIZE = 20;
    const CANVAS_SIZE = 400;
    const SNAKE_INITIAL_LENGTH = 3;
    const SNAKE_SPEED =  150; // milliseconds per move

    // Initial snake position and direction
    let snake = [{ x: 10, y: 10 }];
    let direction = 'right';

    // Initial food position
    let food =  generateFoodPosition();

    // Game loop
    function gameLoop()  {
      setTimeout(() => {
        clearCanvas();
        moveSnake();
        drawSnake();
        drawFood();
        // Check if game over
        if (checkCollision()) {
          gameOver();
          return;
        }
        // Continue game loop
        gameLoop();
      }, SNAKE_SPEED);
    }

    // Handle keyboard input
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'down') direction = 'up';
          break;
        case 'ArrowDown':
          if (direction !== 'up') direction = 'down';
          break;
        case 'ArrowLeft':
          if (direction !== 'right') direction = 'left';
          break;
        case 'ArrowRight':
          if (direction !== 'left') direction = 'right';
          break;
      }
    });

    // Function to move the snake
    function moveSnake() {
      const head = { x: snake[0].x, y: snake[0].y };
      // Move the head in the current direction
      switch (direction) {
        case 'up':
          head.y -= 1;
          break;
        case 'down':
          head.y += 1;
          break;
        case 'left':
          head.x -= 1;
          break;
        case 'right':
          head.x += 1;
          break;
      }
      // Add the new head to the front of the snake
      snake.unshift(head);
      // Remove the tail to simulate movement
      if (!ateFood()) {
        snake.pop();
      } else {
        // Generate new food position
        food = generateFoodPosition();
      }
    }

    // Function to check if the snake has collided with itself or the canvas walls
    function checkCollision() {
      const head = snake[0];
      // Check if snake hits walls
      if (head.x < 0 || head.x >= CANVAS_SIZE / TILE_SIZE ||
          head.y < 0 || head.y >= CANVAS_SIZE / TILE_SIZE) {
        return true;
      }
      // Check if snake hits itself
      for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          return true;
        }
      }
      return false;
    }

    // Function to handle game over
    function gameOver() {
      alert('Game Over! Your score: ' + (snake.length - SNAKE_INITIAL_LENGTH));
      // Reset game
      snake = [{ x: 10, y: 10 }];
      direction = 'right';
      food = generateFoodPosition();
    }

    // Function to check if snake ate the food
    function ateFood() {
      const head = snake[0];
      return head.x === food.x && head.y === food.y;
    }

    // Function to generate random position for food
    function generateFoodPosition() {
      return {
        x: Math.floor(Math.random() * (CANVAS_SIZE / TILE_SIZE)),
        y: Math.floor(Math.random() * (CANVAS_SIZE / TILE_SIZE))
      };
    }

    // Function to draw the snake
    function drawSnake() {
      snake.forEach(segment => {
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(segment.x * TILE_SIZE, segment.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      });
    }

    // Function to draw the food
    function drawFood() {
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(food.x * TILE_SIZE, food.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    // Function to clear the canvas
    function clearCanvas() {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }

    // Start the game loop
    gameLoop();
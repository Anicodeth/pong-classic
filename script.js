    // Paddle movement constants
    const PADDLE_SPEED = 5;
    const PADDLE_HEIGHT = 60;
    const PADDLE_WIDTH = 15;

    // Ball movement constants
    const BALL_SPEED_X = 3;
    const BALL_SPEED_Y = 3;
    const BALL_RADIUS = 5;

    // Paddle position variables
    let paddleLeftY = 0;
    let paddleRightY = 0;

    // Ball position variables
    let ballX = 0;
    let ballY = 0;
    let ballSpeedX = 0;
    let ballSpeedY = 0;

    // Score variables
    let scoreLeft = 0;
    let scoreRight = 0;
    const scoreElement = document.getElementById('score');

    // Pong game element references
    const pong = document.getElementById('pong');
    const paddleLeft = document.getElementById('paddle-left');
    const paddleRight = document.getElementById('paddle-right');
    const ball = document.getElementById('ball');

    // Initialize the game
    function initGame() {
      // Set paddle initial positions
      paddleLeftY = (pong.offsetHeight - PADDLE_HEIGHT) / 2;
      paddleRightY = (pong.offsetHeight - PADDLE_HEIGHT) / 2;
      paddleLeft.style.top = paddleLeftY + 'px';
      paddleRight.style.top = paddleRightY + 'px';

      // Set ball initial position and speed
      ballX = (pong.offsetWidth - BALL_RADIUS) / 2;
      ballY = (pong.offsetHeight - BALL_RADIUS) / 2;
      ballSpeedX = BALL_SPEED_X;
      ballSpeedY = BALL_SPEED_Y;
      ball.style.left = ballX + 'px';
      ball.style.top = ballY + 'px';

      // Reset scores
      scoreLeft = 0;
      scoreRight = 0;
      updateScore();

      // Start the game loop
      setInterval(updateGame, 20);
    }

    // Update the game state
    function updateGame() {
      // Move the paddles
      movePaddles();

      // Move the ball
      moveBall();

      // Check for collisions
      checkCollisions();
    }

    // Move the paddles
    function movePaddles() {
      // Move left paddle
      if (paddleLeftY >= 0 && paddleLeftY + PADDLE_HEIGHT <= pong.offsetHeight) {
        if (keys.w && !keys.s) {
          paddleLeftY -= PADDLE_SPEED;
        } else if (keys.s && !keys.w) {
          paddleLeftY += PADDLE_SPEED;
        }
      } else if (paddleLeftY < 0) {
        paddleLeftY = 0;
      } else if (paddleLeftY + PADDLE_HEIGHT > pong.offsetHeight) {
        paddleLeftY = pong.offsetHeight - PADDLE_HEIGHT;
      }

      // Move right paddle
      if (paddleRightY >= 0 && paddleRightY + PADDLE_HEIGHT <= pong.offsetHeight) {
        if (keys.up && !keys.down) {
          paddleRightY -= PADDLE_SPEED;
        } else if (keys.down && !keys.up) {
          paddleRightY += PADDLE_SPEED;
        }
      } else if (paddleRightY < 0) {
        paddleRightY = 0;
      } else if (paddleRightY + PADDLE_HEIGHT > pong.offsetHeight) {
        paddleRightY = pong.offsetHeight - PADDLE_HEIGHT;
      }

      // Update paddle positions
      paddleLeft.style.top = paddleLeftY + 'px';
      paddleRight.style.top = paddleRightY + 'px';
    }

    // Move the ball
    function moveBall() {
      ballX += ballSpeedX;
      ballY += ballSpeedY;
      ball.style.left = ballX + 'px';
      ball.style.top = ballY + 'px';
    }

    // Check for collisions
    function checkCollisions() {
      // Check paddle collisions
      if (
        ballX <= PADDLE_WIDTH  &&
        ballY + BALL_RADIUS >= paddleLeftY &&
        ballY <= paddleLeftY + PADDLE_HEIGHT
      ) {
        ballSpeedX = Math.abs(ballSpeedX);
        ballX = PADDLE_WIDTH ;
      } else if (
        ballX + BALL_RADIUS >= pong.offsetWidth - PADDLE_WIDTH &&
        ballY + BALL_RADIUS >= paddleRightY &&
        ballY <= paddleRightY + PADDLE_HEIGHT
      ) {
        ballSpeedX = -Math.abs(ballSpeedX);
        ballX = pong.offsetWidth - BALL_RADIUS - PADDLE_WIDTH;
      }

      // Check wall collisions
      if (ballY <= 0 || ballY >= pong.offsetHeight - BALL_RADIUS) {
        ballSpeedY = -ballSpeedY;
      }

      // Check if ball goes out of bounds
      if (ballX <= 0) {
        // Right player scores
        scoreRight++;
        resetBall();
        updateScore();
      } else if (ballX >= pong.offsetWidth - BALL_RADIUS) {
        // Left player scores
        scoreLeft++;
        resetBall();
        updateScore();
      }
    }

    // Reset the ball position and speed
    function resetBall() {
      ballX = (pong.offsetWidth - BALL_RADIUS) / 2;
      ballY = (pong.offsetHeight - BALL_RADIUS) / 2;
      ballSpeedX = -ballSpeedX;
      ballSpeedY = -ballSpeedY;
    }

    // Update the score display
    function updateScore() {
      scoreElement.textContent = scoreLeft + ' - ' + scoreRight;
    }

    // Keyboard input handling
    const keys = {
      w: false,
      s: false,
      up: false,
      down: false
    };

    document.addEventListener('keydown', function(event) {
      if (event.code === 'KeyW') {
        keys.w = true;
      } else if (event.code === 'KeyS') {
        keys.s = true;
      } else if (event.code === 'ArrowUp') {
        keys.up = true;
      } else if (event.code === 'ArrowDown') {
        keys.down = true;
      }
    });

    document.addEventListener('keyup', function(event) {
      if (event.code === 'KeyW') {
        keys.w = false;
      } else if (event.code === 'KeyS') {
        keys.s = false;
      } else if (event.code === 'ArrowUp') {
        keys.up = false;
      } else if (event.code === 'ArrowDown') {
        keys.down = false;
      }
    });

    // Start the game
    initGame();
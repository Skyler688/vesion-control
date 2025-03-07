const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ball = {
  size: 30,
  speed: 5,
  posX: 400,
  posY: 400,
  travelAngle: 250, // degrees
  randomness: 5,
};
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(ball.posX, ball.posY, ball.size, 0, 2 * Math.PI);
  ctx.stroke();

  updatePos();

  random();

  collisionDetect();

  requestAnimationFrame(render);
}

function updatePos() {
  // convert degrees to radians
  const radian = ball.travelAngle * (Math.PI / 180);

  const moveX = ball.posX + ball.speed * Math.cos(radian);
  const moveY = ball.posY + ball.speed * Math.sin(radian);

  ball.posX = moveX;
  ball.posY = moveY;
}

function random() {
  let random = Math.floor(Math.random() * ball.randomness);
  const negative = Math.random();
  let newAngle = ball.travelAngle;

  if (negative >= 0.5) {
    random = random - random * 2;
  }

  newAngle = newAngle + random;

  if (newAngle > 360) {
    newAngle = 360;
  } else if (newAngle < 1) {
    newAngle = 1;
  }

  ball.travelAngle = newAngle;
}

function collisionDetect() {
  if (ball.posX + ball.size >= 800) {
    if (ball.travelAngle >= 0 && ball.travelAngle < 90) {
      ball.travelAngle = 180 - ball.travelAngle;
      //   console.log(ball.travelAngle);
    } else {
      ball.travelAngle = 360 - ball.travelAngle + 180;
      //   console.log(ball.travelAngle);
    }
  }
  if (ball.posY + ball.size >= 800) {
    if (ball.travelAngle >= 90) {
      ball.travelAngle = 180 + (180 - ball.travelAngle);
      //   console.log(ball.travelAngle);
    } else {
      ball.travelAngle = 180 + (180 - ball.travelAngle);
      //   console.log(ball.travelAngle);
    }
  }
  if (ball.posX - ball.size <= 0) {
    if (ball.travelAngle >= 180) {
      ball.travelAngle = 360 - (ball.travelAngle - 180);
      //   console.log(ball.travelAngle);
    } else {
      ball.travelAngle = 180 - ball.travelAngle;
      //   console.log(ball.travelAngle);
    }
  }
  if (ball.posY - ball.size <= 0) {
    if (ball.travelAngle >= 270) {
      ball.travelAngle = 360 - ball.travelAngle;
      //   console.log(ball.travelAngle);
    } else {
      ball.travelAngle = 180 - (ball.travelAngle - 180);
      //   console.log(ball.travelAngle);
    }
  }
}

render();

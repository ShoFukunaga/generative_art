const WIDTH = 500;
const HEIGHT = 500;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  smooth();
  frameRate(30);
  background(255);
  noFill();

  angle_noise = random(10);
  radius_noise = random(10);
  x_noise = random(10);
  y_noise = random(10);
  strokeColor = 254;
  colorDirection = -1;
  angle = -Math.PI / 2;
}

function draw() {
  // 半径の決定
  radius_noise += 0.005;
  const radius = 600 * noise(radius_noise) + 1;

  // 角度の決定
  angle_noise += 0.005;
  angle = (360 + angle + 6 * noise(angle_noise) - 3) % 360;

  // 中心点の決定
  x_noise += 0.01;
  y_noise += 0.01;
  const centerX = WIDTH / 2 + 100 * noise(x_noise) - 50;
  const centerY = HEIGHT / 2 + 100 * noise(y_noise) - 50;

  // 両端の点座標を算出
  const rad = radians(angle);
  const x1 = centerX + radius * cos(rad);
  const y1 = centerY + radius * sin(rad);

  const opprad = rad + Math.PI;
  const x2 = centerX + radius * cos(opprad);
  const y2 = centerY + radius * sin(opprad);

  // 線の色を変更
  strokeColor += colorDirection;
  if (strokeColor > 254) {
    colorDirection = -1;
  }
  if (strokeColor < 0) {
    colorDirection = 1;
  }

  stroke(strokeColor, 60);
  strokeWeight(1);
  line(x1, y1, x2, y2);
}

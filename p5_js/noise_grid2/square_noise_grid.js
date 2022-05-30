// 様々な大きさの正方形を視覚化した2Dパーリンノイズ
function setup() {
  createCanvas(400, 400);
  smooth();
  background(255);
  frameRate(10);
  x_start = random(10);
  x_noise = x_start;
  y_noise = random(10);
}

function draw() {
  background(220);
  for (let y = 0; y <= height; y += 5) {
    y_noise += 0.01;
    x_noise = x_start;
    for (let x = 0; x <= width; x += 5) {
      x_noise += 0.01;
      draw_point(x, y, noise(x_noise, y_noise));
    }
  }
}
const draw_point = (x, y, noise_factor) => {
  let len = 10 * noise_factor;
  rect(x, y, len, len);
};

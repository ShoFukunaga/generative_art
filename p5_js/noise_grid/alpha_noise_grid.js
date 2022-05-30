function setup() {
  createCanvas(400, 400);
  smooth();
  background(255);
  frameRate(15);
  x_start = random(10);
  x_noise = x_start;
  y_noise = random(10);
}
function draw() {
  background(220);
  for (let y = 0; y <= height; y++) {
    y_noise += 0.01;
    x_noise = x_start; // 各列の開始点でxをリセット
    for (let x = 0; x <= width; x++) {
      x_noise += 0.01;
      let alph = noise(x_noise, y_noise) * 255; // ノイズ関数が２つの値を取る
      stroke(0, alph);
      line(x, y, x + 1, y + 1);
    }
  }
}

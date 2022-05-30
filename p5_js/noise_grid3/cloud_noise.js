function setup() {
  createCanvas(300, 300);
  smooth();
  background(153, 255, 255);
  frameRate(5);
  x_start = random(10);
  x_noise = x_start;
  y_noise = random(10);
}

function draw() {
  for (let y = 0; y <= height; y += 3) {
    y_noise += 0.1;
    x_noise = x_start;
    for (let x = 0; x <= width; x += 3) {
      x_noise += 0.1;
      draw_point(x, y, noise(x_noise, y_noise));
    }
  }
}

const draw_point = (x, y, noise_factor) => {
  push();
  translate(x, y);
  rotate(noise_factor * radians(540));
  let edge_size = noise_factor * 35;
  let grey = 200 + noise_factor * 120;
  let alph = 150 + noise_factor * 120;
  noStroke();
  fill(grey, alph);
  ellipse(0, 0, edge_size, edge_size / 2);
  pop();
};

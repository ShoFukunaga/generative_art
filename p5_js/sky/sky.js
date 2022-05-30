const WIDTH = 800;
const HEIGHT = 600;

function setup() {
  createCanvas(800, 600);
  smooth();
  colorMode(RGB, 255);
  ellipseMode(RADIUS);
  // createLoop({duration:3, gif:true})
}

function draw() {
  // noLoop();
  // background('deepskyblue');
  background(110, 215, 255);
  Cloud.generate();
  Cloud.fade();
}

class Cloud {
  static generate() {
    let begin = random(10);
    let i = 0;
    for (let x = 0; x < WIDTH; x += 1.5) {
      let j = 0;
      for (let y = 0; y < HEIGHT; y += 1.5) {
        let alpha_max = map(y, 0, HEIGHT, 500, 0);
        let alpha = noise(begin + i, begin + j);
        alpha = map(alpha, 0.4, 1, 0, alpha_max);
        noStroke();
        fill(255, alpha);
        ellipse(x, y, 1, 1);
        j += 0.02;
      }
      i += 0.01;
    }
  }

  static fade() {
    for (let i = 0; i < HEIGHT; i += 1.5) {
      let alpha = map(i, 0, HEIGHT * 2.5, 255, 0);
      strokeWeight(0.1);
      stroke(alpha);
      line(0, i, WIDTH, i);
    }
  }
}

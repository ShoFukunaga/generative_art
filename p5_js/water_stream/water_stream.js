const INIT_NUM = 8000;
const ParticleArray = Array(INIT_NUM);

function setup() {
  smooth();
  createCanvas(1200, 400);
  background(255);
  noStroke();
  set_particles();
}

function draw() {
  frameRate(40);
  blendMode(ADD);
  alpha = map(frameCount % 60, 0, width, 0, 55);
  fill(0, alpha);
  rect(0, 0, width, height);
  loadPixels();
  for (let p of ParticleArray) {
    p.move;
  }
  updatePixels();
}

function set_particles() {
  for (let i = 0; i < INIT_NUM; i++) {
    ParticleArray[i] = new Particle();
  }
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.incre = 0;
    this.theta = 0;
    let adj = random(100);
    this.color = color(20, 150 + 50 * noise(adj * 0.01), 255);
  }

  update() {
    this.incre += 0.008;
    this.theta = noise(this.x * 0.005, this.y * 0.005, this.incr) * TWO_PI;
    this.x += 2 * cos(this.theta);
    this.y += 2 * sin(this.theta);
  }

  display() {
    let x_n = noise(0.005 * width);
    let y_n = noise(0.005 * height);
    if (this.x > 0 && this.x < width && this.y > 0 && this.y < height) {
      set(int(this.x), int(this.y), this.color);
      set(
        int(this.x + x_n),
        int(this.y + y_n, color(255, 255, 255, random(1)))
      );
    }
  }

  wrap() {
    if (this.x < 0) {
      this.x = width;
    }
    if (this.x > width) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = height;
    }
    if (this.y > height) {
      this.y = 0;
    }
  }
  get move() {
    this.update();
    this.wrap();
    this.display();
  }
}

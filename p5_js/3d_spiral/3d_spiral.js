const WIDTH = 500;
const HEIGHT = 500;
const RADIUS = 100;

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  stroke(0);
}

function draw() {
  background(255);
  rotateY(0.01 * frameCount);
  rotateX(0.01 * frameCount);
  let s = 0;
  let t = 0;
  let last_x = 0;
  let last_y = 0;
  let last_z = 0;
  while (t < 180) {
    s += 18;
    t += 1;
    const radian_s = radians(s);
    const radian_t = radians(t);
    const x = RADIUS * cos(radian_s) * sin(radian_t);
    const y = RADIUS * sin(radian_s) * sin(radian_t);
    const z = RADIUS * cos(radian_t);
    if (last_x != 0) {
      line(x, y, z, last_x, last_y, last_z);
    }
    last_x = x;
    last_y = y;
    last_z = z;
  }
}

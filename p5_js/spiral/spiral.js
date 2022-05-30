const center_x = 250;
const center_y = 250;

function setup() {
  createCanvas(500, 500);
  background(255);
}

function draw() {
  strokeWeight(5);
  smooth();
  stroke(20, 50, 70);
  let x, y, rad;
  let radius = 10;
  let lastx = -999;
  let lasty = -999;
  for (let ang = 0; ang <= 1080; ang += 8) {
    radius += 0.5;
    rad = radians(ang);
    x = center_x + radius * cos(rad);
    y = center_y + radius * sin(rad);
    if (lastx > -999) {
      line(x, y, lastx, lasty);
    }
    lastx = x;
    lasty = y;
  }
}

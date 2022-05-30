const center_x = 250;
const center_y = 250;
let x, y, rad, lastx, lasty;

function setup() {
  createCanvas(500, 500);
  background(255);
}

function draw() {
  strokeWeight(0.01);
  smooth();
  let radius = 10;
  let radiusNoise = random(10);
  let thisRadius;
  for (let ang = 0; ang <= 1080; ang += 8) {
    radiusNoise += 0.05;
    radius += 0.5;
    rad = radians(ang);
    thisRadius = radius + noise(radiusNoise) * 200 - 100;
    x = center_x + thisRadius * cos(rad);
    y = center_y + thisRadius * sin(rad);
    if (lastx > -999) {
      line(x, y, lastx, lasty);
    }
    lastx = x;
    lasty = y;
  }
}

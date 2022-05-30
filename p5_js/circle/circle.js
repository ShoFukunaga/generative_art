function setup() {
  createCanvas(windowWidth, windowHeight);
  translate(width / 2, height / 2);

  angleMode(DEGREES);
  const radius = 100;

  for (let angle = 0; angle < 360; angle += 5) {
    const x = cos(angle) * radius;
    const y = sin(angle) * radius;
    point(x, y, 10);
  }
}

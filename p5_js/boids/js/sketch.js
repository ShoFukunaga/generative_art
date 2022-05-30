const WIDTH = 1000;
const HEIGHT = 700;
const RADIUS = 100;

const school_of_fish = [];
const max_count = 50;
const max_force = 0.2;
const max_speed = 4;

const divide_group = new DivideGroup(WIDTH, HEIGHT, RADIUS);

function setup() {
  createCanvas(WIDTH, HEIGHT);
  for (let i = 0; i < max_count; i++) {
    school_of_fish.push(new Member());
  }
}

function draw() {
  background(255);
  school_of_fish.forEach((member) => {
    member.update();
  });
}

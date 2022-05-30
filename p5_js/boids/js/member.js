class Member {
  static steering;

  constructor() {
    const angle = random(0, Math.PI * 2);
    const r = random(max_speed / 2, max_speed);
    if (Member.steering === undefined) Member.steering = createVector();
    this.position = createVector(random(0, width), random(0, height));
    this.velocity = createVector(Math.cos(angle) * r, Math.sin(angle) * r);
    this.acceleration = createVector();

    divide_group.update(this);
    this.show();
  }

  get_near_members() {
    const others = [];
    const distances = [];
    const r2 = RADIUS * RADIUS;
    const near = divide_group.get_near_objs(this);

    near.forEach((arr) => {
      for (let i = 0; i < arr.length; i++) {
        const a = arr[Math.floor(i)];
        const d =
          (this.position.x - a.position.x) * (this.position.x - a.position.x) +
          (this.position.y - a.position.y) * (this.position.y - a.position.y);
        if (a !== this && d < r2) {
          others.push(a);
          distances.push(d);
        }
      }
    });

    return [others, distances];
  }

  form_grouping() {
    const arrys = this.get_near_members();
    const others = arrys[0];
    const distances = arrys[1];

    this.acceleration.x = this.acceleration.y = 0;
    const align_steering = this.align(others);
    this.acceleration.add(align_steering);
    const cohesion_steering = this.cohesion(others);
    this.acceleration.add(cohesion_steering);
    const sep_steering = this.separation(others, distances);
    this.acceleration.add(sep_steering);
  }

  align(others) {
    const steering = Member.steering;
    let total = 0;
    steering.x = steering.y = 0;

    others.forEach((other) => {
      steering.add(other.velocity);
      total++;
    });

    steering.div(total);
    steering.setMag(max_speed);
    steering.sub(this.velocity);
    steering.limit(max_force);

    return steering;
  }

  cohesion(others) {
    const steering = Member.steering;
    let total = 0;
    steering.x = steering.y = 0;

    others.forEach((other) => {
      steering.add(other.position);
      total++;
    });

    steering.div(total);
    steering.sub(this.position);
    steering.setMag(max_speed);
    steering.sub(this.velocity);
    steering.limit(max_force);

    return steering;
  }

  separation(others, distances) {
    const steering = Member.steering;
    steering.x = steering.y = 0;

    others.forEach((a, i) => {
      const diff = p5.Vector.sub(this.position, a.position);
      diff.div(distances[i]);
      steering.add(diff);
    });

    steering.div(others.length);
    steering.setMag(max_speed);
    steering.sub(this.velocity);
    steering.limit(max_force);

    return steering;
  }

  update() {
    this.form_grouping();
    this.position.add(this.velocity);

    if (this.position.x < 0) this.position.x += width;
    else if (this.position.x >= width) this.position.x -= width;
    if (this.position.y < 0) this.position.y += height;
    else if (this.position.y >= height) this.position.y -= height;

    divide_group.update(this);

    this.velocity.add(this.acceleration);
    this.velocity.limit(max_speed);
    this.show();
  }

  show() {
    strokeWeight(1);
    noFill();
    const r = 8;
    const angle = this.velocity.heading();
    const anglePlus = 2.5;
    fill(0);
    triangle(
      this.position.x + Math.cos(angle) * r,
      this.position.y + Math.sin(angle) * r,
      this.position.x + Math.cos(angle + anglePlus) * r,
      this.position.y + Math.sin(angle + anglePlus) * r,
      this.position.x + Math.cos(angle - anglePlus) * r,
      this.position.y + Math.sin(angle - anglePlus) * r
    );
    ellipse(
      this.position.x + Math.cos(angle) * (r * 1.5),
      this.position.y + Math.sin(angle) * (r * 1.5),
      r * 2,
      r * 2
    );
  }
}

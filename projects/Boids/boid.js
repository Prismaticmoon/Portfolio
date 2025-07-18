class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxForce = .2;
    this.maxSpeed = 4;
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  mouseAvoid() {
  let perceptionRadius = 75; // how close boids react to the mouse
  let mouse = createVector(mouseX, mouseY);
  let d = p5.Vector.dist(this.position, mouse);

  if (d < perceptionRadius) {
    let diff = p5.Vector.sub(this.position, mouse);
    diff.setMag(this.maxSpeed);
    diff.sub(this.velocity);
    diff.limit(this.maxForce * 2); // make avoidance stronger
    return diff;
  } else {
    return createVector(0, 0);
  }
}
  
  align(boids) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;

    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  seperation(boids) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;

    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;

    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let seperation = this.seperation(boids);
    let avoidMouse = this.mouseAvoid();
    
    seperation.mult(seperationSlider.value());
    cohesion.mult(cohesionSlider.value());
    alignment.mult(alignSlider.value());
    avoidMouse.mult(1.5);
    
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(seperation);
    this.acceleration.add(avoidMouse);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    let magni =5;
    let x2=(this.position.x + (this.velocity.x*magni));
    let y2=(this.position.y + (this.velocity.y*magni));
    strokeWeight(8);
    stroke(255);
    point(this.position.x, this.position.y);
    strokeWeight(3);
    stroke(255);
    line(this.position.x,this.position.y,x2,y2);
  }
}

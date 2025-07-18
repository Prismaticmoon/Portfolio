let walls = [];
let particle;

function setup() {
  createCanvas(400, 400);
  generateWalls();
  particle = new Particle();
}

function draw() {
  background(0);
  for (let wall of walls) {
    wall.show();
  }
  particle.update(mouseX, mouseY);
  particle.show();
  particle.look(walls);
}

// This function generates the walls
function generateWalls() {
  walls = []; // Clear existing walls
  for (let i = 0; i < 5; i++) {
    let x1 = random(width);
    let y1 = random(height);
    let x2 = random(width);
    let y2 = random(height);
    walls[i] = new Boundary(x1, y1, x2, y2); // Note order: (x1, y1, x2, y2)
  }

  // Add screen boundary walls
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));
}

// Regenerate walls when mouse is clicked
function mousePressed() {
  generateWalls();
}

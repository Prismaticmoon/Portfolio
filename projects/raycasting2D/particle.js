class Particle{
  constructor(){
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    
    for (let a = 0; a < 360; a += 5) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }
  
  update(x,y){
    this.pos.set(x,y);
  }
  
  
  look(walls){
    for (let ray of this.rays){
      let closest = null;
      let record = Infinity;
      for(let wall of walls){
        const pt = ray.cast(wall);
        if (pt){
          const d = p5.Vector.dist(this.pos, pt);
          if (d < record){
            record = d;
            closest = pt;
          }
        } 
      }
      if (closest){
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }
  
  show(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, 16)
    for (let ray of this.rays) {
      ray.show();
    }
    
  }
}
// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 100; // Decide the initial number of particles.

let particles = [];

function preload(){
  flyIMG = loadImage("assets/pngwing.com (1).png");
 
}


function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");

  

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(0,20);

  if(mouseIsPressed == true){
    for(let i = 0; i < NUM_OF_PARTICLES; i++){
      particles.push(new Particle(mouseX, mouseY))
    }
  }

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  for(let i = particles.length-1; i >= 0; i--){
      if(particles[i].onCanvas == false){
        particles.splice(i, 1);
      }
    }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.speedY = 0.1;
    this. speedX = 0.3;
  }
  // methods (functions): particle's behaviors
  update() {
    this.x+=this.speedX;
    this.y+=this.speedY;
    this.speedY += 0.01;
    this.speedX +=0.03;
    this.photo = flyIMG;
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    scale(0.02)

    // stroke("yellow");
    // strokeWeight(1)
    // line(0, 0, 0, 1);

    let imgW = this.photo.width;
    let imgH = this.photo.height;
    image(this.photo, 0, 0);

    pop();
  }

  checkOutOfCanvas(){
    if(this.y > height){
      this.onCanvas = false;
    }
  }

}

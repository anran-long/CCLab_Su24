let confettis = [];
let numConfetti = 50;
let backgroundHue;

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < numConfetti; i++) {
    confettis.push(new Confetti(width / 2, height / 2))
  }

  colorMode(HSB);
  backgroundHUE = random(0, 360);

}

function draw() {
  background(backgroundHUE, 10, 100);

  if (mouseIsPressed == true) {
    for (let i = 0; i < numConfetti; i++) {
      confettis.push(new Confetti(mouseX, mouseY))
    }
  }
  // confettis.push(new Confetti(width/2, height/2))

  for (let i = 0; i < confettis.length; i++) {
    confettis[i].update();
    confettis[i].display();
    confettis[i].checkOutCanvas();
  }

  text(confettis.length, 20, 20)

  // if(confettis.length > 1000){

  //   let idx=0
  //   confettis.splice(idx,confettis.length-1000)
  // }
  for (let i = confettis.length-1; i>=0 ; i--) {
    if (confettis[i].onCanvas == false) {
      confettis.splice(i, 1);
    }

  }
}

class Confetti {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);

    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);

    this.cHUE = random(0, 360);

    this.onCanvas = true;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += 0.1;
    this.speedX *= 0.99;
  }
  display() {
    push();
    translate(this.x, this.y);

    fill(this.cHUE, 100, 100);
    noStroke();
    circle(0, 0, this.size);

    pop();
  }
  checkOutCanvas() {
    if (this.y > height) {
      this.onCanvas = false;
    }
  }

}

// function mousePressed(){
//   for(let i = 0; i < numConfetti; i++){
//     confettis.push(new Confetti(mouseX, mouseY))
//   }
// }
let confettis = [];
let numConfetti = 10;
let backgroundHUE;

function setup() {
  createCanvas(400, 400);
  
  // for(let i = 0; i < numConfetti; i++){
  //   confettis.push(new Confetti(width/2, height/2))
  // }

  colorMode(HSB);
  backgroundHUE = random(0, 360);
  
}

function draw() {
  //         HUE  SAT  BRI
  //         360   100  100
  background(backgroundHUE, 10, 100);

  if(mouseIsPressed == true){
    for(let i = 0; i < numConfetti; i++){
      confettis.push(new Confetti(mouseX, mouseY))
    }
  }
  
  // confettis.push(new Confetti(width/2, height/2))

  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].checkOutOfCanvas();
    confettis[i].display();
  }

  text(confettis.length, 20, 20);

  // SOLUTION 1: if bigger than threshold delete ONE element, then move on
  // PROBLEM: if we add more than one element per frame, this fails.

  // if(confettis.length > 100){
  //   let idx = 0;
  //   confettis.splice(idx, 1);
  // }

  // SOLUTION 2: as long as bgger than threshold, keep deleting from the beginning
  //             of the confetti array.
  // while(confettis.length > 300){
  //   let idx = 0;
  //   confettis.splice(idx, 1); // index, quantity of elms to delete
  // }

  // SABRINA REMIXING THE SOLUTIONS:
  // if(confettis.length > 1000){
  //   let idx = 0;
  //   confettis.splice(idx, confettis.length-1000);
  // }

  for(let i = confettis.length-1; i >= 0; i--){
  // for(let i = 0; i < confettis.length; i++){
    if(confettis[i].onCanvas == false){
      confettis.splice(i, 1);
    }
  }

}

class Confetti{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);
    
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);  
    
    this.cHUE = random(0, 360);

    this.onCanvas = true;
  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;
    // apply gravity to yspeed
    this.speedY += 0.1;
    this.speedX *= 0.99
  }
  display(){    
    push();
    translate(this.x, this.y);

      fill(this.cHUE, 100, 100);
      noStroke();
      circle(0, 0, this.size);
   
    pop();
  }
  checkOutOfCanvas(){
    if(this.y > height){
      this.onCanvas = false;
    }
  }

}



// function mousePressed(){
//   for(let i = 0; i < numConfetti; i++){
//     confettis.push(new Confetti(mouseX, mouseY))
//   }
// }
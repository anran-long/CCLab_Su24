/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new DancerAnran(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();

}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class DancerAnran {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.angle = 90;
    this.angleSpeed = radians(5);

    this.legAngle = 0;
    this.legSpeed = 0.5;
    // add properties for your dancer here:
    //..
    //..
    //..
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.angle+=this.angleSpeed;

    this.legAngle += this.legSpeed;
    if (this.legAngle > 20 || this.legAngle < -20) {
      this.legSpeed *= -1;
    }

    this.legAngle2 = this.legAngle; // Synchronize both leg angles

  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    //head
    fill("yellow");
    ellipse(0, -50, 20, 25);
    //body
    rect(-14, -35, 28.5, 50);
    // //leg + feet
    // strokeWeight(2);
    // stroke("red");
    // line(-10, 15, -10, 70);
    // line(10, 15, 10, 70);
    // strokeWeight(0.5);
    // fill("green");
  
    this.drawArm(-10,-30);
    this.drawArm2 (10,-30);
    this.drawLeg(-10, 15);
    this.drawLeg(10, 15);

  




    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

    pop();
  }
  drawArm(armx, army) {
    push();
    translate(armx, army);
    //arm 
    rotate(this.angle);
    stroke("green");
    strokeWeight(2);
    line(0,0,0,40);
    
    fill("red");
    circle(0, 0, 5);
    pop();
  }
    
    drawArm2(armx,army) {
    push();
    translate(armx,army);
     //arm2 
     rotate(this.angle);
     stroke("green");
     strokeWeight(2);
     line(0,0,0,40);

     fill("red");
     circle(0,0,5);
     pop();
    }

    drawLeg(legx, legy) {
      push();
      translate(legx, legy);
      strokeWeight(2);
      stroke("red");
  
      // Upper leg
      push();
      rotate(radians(this.legAngle));
      line(0, 0, 0, 25);
     
      translate(0, 25);
  
      // Lower leg
      rotate(radians(this.legAngle2) / 2); // Adjust the bending here
      line(0, 0, 0, 25);
      circle(0,25,10)
      pop();
  
      pop();
    }

  }




/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/
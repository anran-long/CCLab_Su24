let rectangles = [];
let cousinRectangles = [];
// let img = [];

// function preload(){
//   img = loadImage("assets/cousin08.jpg","assets/me08.jpg");
// }

class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.enlarged = false;
  }

  display() {
    if (this.enlarged==true) {
      fill(255, 0, 0);
      rect(width / 2 - 200, height / 2 - 200, 400, 400);
    } else {
      fill(255);
      rect(this.x, this.y, this.width, this.height);
    }
  }
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-parent");

  let rectWidth = 100;
  let rectHeight = 100;

  // my rectangles 
  for (let i = 0; i < 40; i++) {
    rectangles.push(new Rectangle(100, 50 + i * (rectHeight + 10), rectWidth, rectHeight));
  }

  // cousin's rectangles 
  for (let i = 0; i < 40; i++) {
    cousinRectangles.push(new Rectangle(width - 200, 50 + i * (rectHeight + 10), rectWidth, rectHeight));
  }
}

function draw() {
  background(0);

  for(let i = 0; i < rectangles.length; i++){
    rectangles[i].display();
  }

  for(let i = 0; i < cousinRectangles.length; i++){
    cousinRectangles[i].display();
  }
}

function mousePressed() {
  for (let i = 0; i < rectangles.length; i++) {
    let rect = rectangles[i];
    if (
      mouseX > rect.x &&
      mouseX < rect.x + rect.width &&
      mouseY > rect.y &&
      mouseY < rect.y + rect.height
    ) {
      rect.enlarged = true;
    } else {
      rect.enlarged = false;
    }
  }

  for (let i = 0; i < cousinRectangles.length; i++) {
    let rect = cousinRectangles[i];
    if (
      mouseX > rect.x &&
      mouseX < rect.x + rect.width &&
      mouseY > rect.y &&
      mouseY < rect.y + rect.height
    ) {
      rect.enlarged = true;
    } else {
      rect.enlarged = false;
    }
  }
}
// let myBackground = [];

let momentsMy = [];
let momentsCousin = [];
let imgMy = [];
let imgCousin = [];


function preload() {
  // myBackground = loadImage("assets/background.JPG")

  let imgMyPath = [
    "assets/me/04-e.JPEG", "assets/me/07-1.JPG", "assets/me/07-2.JPG",
    "assets/me/08-1.JPG", "assets/me/08-s.JPG", "assets/me/09-s.JPG",
    "assets/me/10-1.JPG", "assets/me/10-e.JPG", "assets/me/11-1.JPG",
    "assets/me/11-e.JPG", "assets/me/12-1.png", "assets/me/13-1.JPG",
    "assets/me/13-e.JPG", "assets/me/13-s.JPG", "assets/me/14-s.JPG",
    "assets/me/16-1.JPG", "assets/me/17-e.JPG", "assets/me/18-e.JPG",
    "assets/me/18-s.JPG", "assets/me/19-1.png", "assets/me/19-e.JPG",
    "assets/me/19-s.JPG", "assets/me/21-1.png", "assets/me/21-2.JPG",
    "assets/me/22-1.png", "assets/me/23-1.png", "assets/me/23-2.JPG",
    "assets/me/23-e.JPG", "assets/me/24-1.png", "assets/me/24-2.png",
    "assets/me/24-e.JPG"
  ];
  let imgCousinPath = [
    "assets/cousin/04-e.JPEG", "assets/cousin/07-1+.JPG", "assets/cousin/07-2+.JPG",
    "assets/cousin/08-1+.JPG", "assets/cousin/08-s.JPG", "assets/cousin/09-s.JPG",
    "assets/cousin/10-1+.JPG", "assets/cousin/10-e.JPG", "assets/cousin/11-1+.JPG",
    "assets/cousin/11-e.JPG", "assets/cousin/12-1+.JPG", "assets/cousin/13-1+.JPG",
    "assets/cousin/13-e.JPG", "assets/cousin/13-s.JPG", "assets/cousin/14-s.JPG",
    "assets/cousin/16-1+.JPG", "assets/cousin/17-e.JPG", "assets/cousin/18-e.JPG",
    "assets/cousin/18-s.JPG", "assets/cousin/19-1+.JPG", "assets/cousin/19-e.JPG",
    "assets/cousin/19-s.JPG", "assets/cousin/21-1+.JPG", "assets/cousin/21-2+.JPG",
    "assets/cousin/22-1+.JPG", "assets/cousin/23-1+.JPG", "assets/cousin/23-2+.JPG",
    "assets/cousin/23-e.JPG", "assets/cousin/24-1+.JPG", "assets/cousin/24-2+.JPG",
    "assets/cousin/24-e.JPG"
  ];

  // Shuffle image paths
  shuffle(imgMyPath, true);
  shuffle(imgCousinPath, true);

  //my images
  for (let i = 0; i < imgMyPath.length; i++) {
    imgMy.push(loadImage(imgMyPath[i]));
  }
  //cousin's images
  for (let i = 0; i < imgCousinPath.length; i++) {
    imgCousin.push(loadImage(imgCousinPath[i]));
  }
}


class Moment {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.enlarged = false;
    this.origWidth = img.width;
    this.origHeight = img.height;
    this.smallW = 100;
    this.smallH = this.origHeight * (this.smallW / this.origWidth)
  }

  display() {
    if (this.enlarged == true) {
      if (this.x < width / 2) {
        image(this.img, width / 2 - this.smallW * 2, height / 2 - this.smallH, this.smallW * 2, this.smallH * 2);
      } else {
        image(this.img, width / 2, height / 2 - this.smallH, this.smallW * 2, this.smallH * 2);
      }
    } else {
      image(this.img, this.x, this.y, this.smallW, this.smallH);
      
    }
  }

  checkIfClicked() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.smallW &&
      mouseY > this.y &&
      mouseY < this.y + this.smallH
    ) {
      this.enlarged = true;
    } else {
      this.enlarged = false;
    }
  }

}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("canvas-parent");

  let accumulativeHeightMy = 0;
  for (let i = 0; i < imgMy.length; i++) {
    let moment = new Moment(100, 50 + accumulativeHeightMy, imgMy[i]);
    momentsMy.push(moment);
    accumulativeHeightMy += moment.smallH + 10;
  }

  let accumulativeHeightCousin = 0;
  for (let i = 0; i < imgCousin.length; i++) {
    let moment = new Moment(width - 200, 50 + accumulativeHeightCousin, imgCousin[i]);
    momentsCousin.push(moment);
    accumulativeHeightCousin += moment.smallH + 10;
  }
}

function draw() {
  background(0);
  // image(myBackground, 0, 0, image.width, image.height);

  // Display my moments
  for (let i = 0; i < momentsMy.length; i++) {
    momentsMy[i].display();
  }

  // Display cousin's moments
  for (let i = 0; i < momentsCousin.length; i++) {
    momentsCousin[i].display();
  }

  //2 rectangle detectors
  noFill();
  strokeWeight(3);
  stroke("red")
  rect(100, height / 2, 100, 100)

  noFill();
  strokeWeight(3);
  stroke("red")
  rect(width - 200, height / 2, 100, 100)

  //midline
  stroke(255);
  strokeWeight(1);
  line(width / 2, 0, width / 2, height);
}

function mousePressed() {
  for (let i = 0; i < momentsMy.length; i++) {
    momentsMy[i].checkIfClicked();
  }
  for (let i = 0; i < momentsCousin.length; i++) {
    momentsCousin[i].checkIfClicked();
  }
}


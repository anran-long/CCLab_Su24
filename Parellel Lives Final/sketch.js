
let momentsMy = [];
let momentsCousin = [];
let imgMy = [];
let imgCousin = [];
let anranClicked = false;
let jiameiClicked = false;
let numPicsopen = 0;


function preload() {
  let imgMyPath = [
    { path: "assets/me/04-e.JPEG", year: 2004, story: "I was born." },
    { path: "assets/me/07-1.JPG", year: 2007, story: "posing in Guangzhou home." },
    { path: "assets/me/08-1.JPG", year: 2008, story: "Anqing Grandpa's house." },
    { path: "assets/me/10-1.JPG", year: 2010, story: "wrapped myself with curtain." },
    { path: "assets/me/11-e.JPG", year: 2011, story: "meet in Guangzhou." },
    { path: "assets/me/12-1.png", year: 2012, story: "grumpy 6-year-old." },
    { path: "assets/me/13-1.JPG", year: 2013, story: "got a dog but dies soon." },
    { path: "assets/me/16-1.JPG", year: 2016, story: "Graduation." },
    { path: "assets/me/17-e.JPG", year: 2017, story: "grandpa & grandchildren." },
    { path: "assets/me/18-e.JPG", year: 2018, story: "baby beaming." },
    { path: "assets/me/19-1.png", year: 2019, story: "america." },
    { path: "assets/me/21-1.png", year: 2021, story: "Pandemic in US." },
    { path: "assets/me/22-1.png", year: 2022, story: "臭美 before graduation prom." },
    { path: "assets/me/23-1.png", year: 2023, story: "architorture." },
    { path: "assets/me/24-e.JPG", year: 2024, story: "散步。" }
  ];
  let imgCousinPath = [
    { path: "assets/cousin/04-e.JPEG", year: 2004, story: "I was born." },
    { path: "assets/cousin/07-1+.JPG", year: 2007, story: "posing in Anqing studio." },
    { path: "assets/cousin/08-1+.JPG", year: 2008, story: "Pingyao, Shanxi, college trip." },
    { path: "assets/cousin/10-1+.JPG", year: 2010, story: "an all nighter on train to Shanghai." },
    { path: "assets/cousin/11-e.JPG", year: 2011, story: "meet in Guangzhou." },
    { path: "assets/cousin/12-1+.JPG", year: 2012, story: "drowsy cousin." },
    { path: "assets/cousin/13-1+.JPG", year: 2013, story: "got a dog but dies soon." },
    { path: "assets/cousin/16-1+.JPG", year: 2016, story: "baby coming." },
    { path: "assets/cousin/17-e.JPG", year: 2017, story: "grandpa & grandchildren." },
    { path: "assets/cousin/18-e.JPG", year: 2018, story: "baby beaming." },
    { path: "assets/cousin/19-1+.JPG", year: 2019, story: "anqing." },
    { path: "assets/cousin/21-1+.JPG", year: 2021, story: "Pandemic in China." },
    { path: "assets/cousin/22-1+.JPG", year: 2022, story: "自我欣赏." },
    { path: "assets/cousin/23-2+.JPG", year: 2023, story: "玩。" },
    { path: "assets/cousin/24-e.JPG", year: 2024, story: "散步。" }
  ];

  // Shuffle image paths
  shuffle(imgMyPath, true);
  shuffle(imgCousinPath, true);

  //my images
  for (let i = 0; i < imgMyPath.length; i++) {
    imgMy.push({ img: loadImage(imgMyPath[i].path), year: imgMyPath[i].year, story: imgMyPath[i].story });
  }
  //cousin's images
  for (let i = 0; i < imgCousinPath.length; i++) {
    imgCousin.push({ img: loadImage(imgCousinPath[i].path), year: imgCousinPath[i].year, story: imgCousinPath[i].story });
  }
}


class Moment {
  constructor(x, y, img, year, story, who) {
    this.x = random(0, width - 100);
    this.y = random(0, height - 100);
    this.img = img;
    this.year = year;
    this.story = story;
    this.enlarged = false;
    this.origWidth = img.width;
    this.origHeight = img.height;
    this.who = who
    this.smallW = 100;
    this.smallH = this.origHeight * (this.smallW / this.origWidth);
  }

  display() {
    if (this.enlarged == true) {
      image(this.img, this.x, this.y, this.smallW * 2, this.smallH * 2);
      fill(255);
      textSize(24);
      textAlign(CENTER);
      text(this.year, this.x + this.smallW, this.y + this.smallH * 2 + 24);
    } else {
      stroke(255);
      if (this.who === "Anran") {
        fill("red");
      } else {
        fill("255");
      }
      rect(this.x, this.y, this.smallW, this.smallH);
    }
  }

  checkIfClicked() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.smallW &&
      mouseY > this.y &&
      mouseY < this.y + this.smallH
    ) {
      // am i ana? 
      if (this.who == "Anran") {
        // was another ana clicked?
        if (anranClicked == false) {
          // no
          // -> enlarge and set global ana clicked to true
          this.enlarged = true;
          anranClicked = true;
          numPicsopen = 1;
        }
      } else {
        if (jiameiClicked == false) {
          this.enlarged = true;
          jiameiClicked = true;
          numPicsopen = 2
        }
      }
      // else
      // was another cousin clicked
      // no
      // enlarge global cousin true

      if (numPicsopen == 2) {
        if (imgMyPath[i].year == imgCousinPath[i].year) {
          this.enlarged = true;
          this.enlarged = true;
          anranClicked = true;
          jiameiClicked = true;
        } else {
          this.enlarged = false;
          this.enlarged = false;
          anranClicked = false;
          jiameiClicked = false;
        }
      }


    }
  }

}


function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("canvas-parent");

  for (let i = 0; i < imgMy.length; i++) {
    let moment = new Moment(random(0, width - 100), random(0, height - 100), imgMy[i].img, imgMy[i].year, imgMy[i].story, "Anran");
    momentsMy.push(moment);
  }

  for (let i = 0; i < imgCousin.length; i++) {
    let moment = new Moment(random(0, width - 100), random(0, height - 100), imgCousin[i].img, imgCousin[i].year, imgCousin[i].story, "Jiamei");
    momentsCousin.push(moment);
  }
}

function draw() {
  background(0);

  // Display my moments
  for (let i = 0; i < momentsMy.length; i++) {
    momentsMy[i].display();
  }

  // Display cousin's moments
  for (let i = 0; i < momentsCousin.length; i++) {
    momentsCousin[i].display();
  }
}

function mousePressed() {
  for (let i = 0; i < momentsMy.length; i++) {
    momentsMy[i].checkIfClicked();
  }
  for (let i = 0; i < momentsCousin.length; i++) {
    momentsCousin[i].checkIfClicked();
  }
}

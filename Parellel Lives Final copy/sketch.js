let momentsMy = [];
let momentsCousin = [];
let imgMy = [];
let imgCousin = [];
// let anranClicked = false;
// let jiameiClicked = false;
let numPicsopen = 0;
let firstMoment = false;
let secondMoment = false;
let currentCaption = "";
let matchedYears = [];

let timelineYears = [2004, 2007, 2008, 2010, 2011, 2012, 2013, 2016, 2017, 2018, 2019, 2021, 2022, 2023, 2024];
let camera;

function preload() {
  let imgMyPath = [
    { path: "assets/me/04-e.JPEG", year: 2004, story: "I was born." },
    { path: "assets/me/07-1.JPG", year: 2007, story: "posing in Guangzhou home." },
    { path: "assets/me/08-1.JPG", year: 2008, story: "Anqing Grandpa's house." },
    { path: "assets/me/10-1.JPG", year: 2010, story: "wrapped myself with curtain." },
    { path: "assets/me/11-e.JPG", year: 2011, story: "met in Guangzhou." },
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
    { path: "assets/cousin/11-e.JPG", year: 2011, story: "met in Guangzhou." },
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
  img = loadImage("assets/stupid.png");
  // img = loadImage("assets/cousin background.png");
  camera = loadSound("assets/camera.mp3");

  // Shuffle image paths
  shuffle(imgMyPath, true);
  shuffle(imgCousinPath, true);

  // My images
  for (let i = 0; i < imgMyPath.length; i++) {
    imgMy.push({ img: loadImage(imgMyPath[i].path), year: imgMyPath[i].year, story: imgMyPath[i].story });
  }
  // Cousin's images
  for (let i = 0; i < imgCousinPath.length; i++) {
    imgCousin.push({ img: loadImage(imgCousinPath[i].path), year: imgCousinPath[i].year, story: imgCousinPath[i].story });
  }
}

class Moment {
  constructor(x, y, img, year, story, who) {
    // this.x = random(0, width - 100);
    // this.y = random(0, height - 300);
    this.img = img;
    this.year = year;
    this.story = story;
    this.enlarged = false;
    this.origWidth = img.width;
    this.origHeight = img.height;
    this.who = who;
    this.smallW = 100;
    this.smallH = this.origHeight * (this.smallW / this.origWidth);
    this.enlargedW = this.smallW * 2;
    this.enlargedH = this.smallH * 2;
    this.setPosition(x, y);
  }

  setPosition(x, y) {
    var padding = 30;

    this.x = random(padding, width - this.smallW - padding);
    this.y = random(padding, height - 300 - padding);

    var tooClose = false;
    for (var i = 0; i < momentsMy.length; i++) {
      var moment = momentsMy[i];
      if (moment !== this && dist(this.x, this.y, moment.x, moment.y) < this.smallW + padding) {
        tooClose = true;
      }
    }

    for (var i = 0; i < momentsCousin.length; i++) {
      var moment = momentsCousin[i];
      if (moment !== this && dist(this.x, this.y, moment.x, moment.y) < this.smallW + padding) {
        tooClose = true;
      }
    }

    if (tooClose) {
      this.setPosition(x, y);
    }
  }

  display() {

    if (this.enlarged == true) {
      let xPos = this.x - this.smallW / 2;
      let yPos = this.y - this.smallH / 2;

      if (xPos + this.enlargedW > width) {
        xPos = width - this.enlargedW;
      }
      if (xPos < 0) {
        xPos = 0;
      }
      if (yPos + this.enlargedH > height) {
        yPos = height - this.enlargedH;
      }
      if (yPos < 0) {
        yPos = 0;
      }

      image(this.img, xPos, yPos, this.enlargedW, this.enlargedH);
      fill(255);
      textSize(20);
      textAlign(CENTER);
      text(this.year, xPos + this.enlargedW / 2, yPos + this.enlargedH + 24);
    } else {
      stroke(0, 50);
      strokeWeight(2);
      if (this.who === "Anran") {
        fill("blue");
      } else {
        fill("#F3E7C2");
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
      if (numPicsopen == 0) {
        this.enlarged = true;
        firstMoment = this;
        numPicsopen = 1;
        currentCaption = "";
      } else if (numPicsopen == 1 && this !== firstMoment) {
        this.enlarged = true;
        secondMoment = this;
        numPicsopen = 2;

        // match year?
        if (firstMoment.year == secondMoment.year) {
          // story
          currentCaption = `${firstMoment.story}     ${secondMoment.story}`;
          // timelinemark.play();

          let yearAlreadyMatched = false;
          for (let i = 0; i < matchedYears.length; i++) {
            if (matchedYears[i] == firstMoment.year) {
              yearAlreadyMatched = true;
            }
          }
          if (!yearAlreadyMatched) {
            matchedYears.push(firstMoment.year);
          }
          setTimeout(() => {
            removeMoment(firstMoment);
            removeMoment(secondMoment);
            firstMoment = false;
            secondMoment = false;
            numPicsopen = 0;
            currentCaption = "";
          }, 3500);
          camera.play();
        } else {
          setTimeout(() => {
            firstMoment.enlarged = false;
            secondMoment.enlarged = false;
            firstMoment = false;
            secondMoment = false;
            numPicsopen = 0;
            currentCaption = "";
          }, 1000);
        }

      }
    }
  }
}

function removeMoment(moment) {
  if (moment.who == "Anran") {
    for (let i = 0; i < momentsMy.length; i++) {
      if (momentsMy[i] == moment) {
        momentsMy.splice(i, 1);
      }
    }
  } else {
    for (let i = 0; i < momentsCousin.length; i++) {
      if (momentsCousin[i] == moment) {
        momentsCousin.splice(i, 1);
      }
    }
  }
}

function startGame() {
  document.getElementById('instructions-page').style.display = 'none';
  document.getElementById('game-page').style.display = 'block';
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("game-page");

  for (let i = 0; i < imgMy.length; i++) {
    let moment = new Moment(random(0, width - 100), random(0, height - 1000), imgMy[i].img, imgMy[i].year, imgMy[i].story, "Anran");
    momentsMy.push(moment);
  }

  for (let i = 0; i < imgCousin.length; i++) {
    let moment = new Moment(random(0, width - 100), random(0, height - 1000), imgCousin[i].img, imgCousin[i].year, imgCousin[i].story, "Jiamei");
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

  // Timeline
  stroke(255);
  line(0, height - 100, width, height - 100);
  noStroke();
  fill(255);
  textSize(12);
  for (let i = 0; i < timelineYears.length; i++) {
    let t = i * 100;
    text(timelineYears[i], t, height - 75);
    //circle dot
    let yearMatched = false;
    for (let j = 0; j < matchedYears.length; j++) {
      if (matchedYears[j] == timelineYears[i]) {
        yearMatched = true;
      }
    }
    if (yearMatched == true) {
      fill("red");
      ellipse(t, height - 100, 20);
      fill(255);
    }
  }
  // story display
  if (currentCaption !== "") {
    fill("red");
    textSize(24);
    textAlign(CENTER);
    text(currentCaption, width / 2, height - 150);
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

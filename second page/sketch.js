let myBackground = [];

let momentsMy = [];
let momentsCousin = [];
let imgMy = [];
let imgCousin = [];


function preload() {
  myBackground = loadImage("assets/cousin background.png")

}

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvas-parent")
  }
  
  function draw() {
    background("green");
    fill("red")
    rect(100,100,200,200)
  }
let y = 200;
let ySpeed = 0;
let pSpeed = 0;
let gravity = 0.9;

function setup() {
    let cnv = createCanvas(900, 400);
    cnv.parent("canvas-parent")
}

function draw() {
    background(220, 50, 120);
    noStroke();
    fill(0);
    rect(30, 30, width-60, height-60);
    fill(255);
    circle(90, y, 40);

    // ySpeed+=gravity;
    // y+=ySpeed;

    if(y > height-30-20){
        ySpeed = -0.85 * ySpeed;
        y = height -30-20; 
    }
    // text(round(ySpeed, 10)-round(pSpeed, 10), 10, 10)
    let dSpeed = round(ySpeed, 10)-round(pSpeed, 10)
    if(dSpeed ==0 && random()<0.01){

        ySpeed = random(-10, -25)
    }
    pSpeed = ySpeed;
}
function mousePressed(){
    ySpeed = -25
}
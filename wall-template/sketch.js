let x = 100

let numChunks = 25;
let chunkX = [];
let chunkY = [];
let chunkW = [];
let chunkH = [];
let chunkSpeed = [];
let sinInput = [];
let amp = 13;
let texts = ["你好呀 does it feel scary?", "this is getting weird","life is like a haunted house haha","guess who am i?","turning into those little chunkies","i hate the molds growing in here","it's time to refurnish this old house","cherish every moment of your life","最后,记得","我爱你"]
let countdown = ["10","9","8","7","6","5","4","3","2","1"];
let ChunksCountdown = ["25","24","23","22","21","20","19","18","17","16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1"];
let showChunkText = false;
let showcountdown = false;
let showChunksCountdown = false;
let frameCountAtLastChunkClick = 0;

function setup() {
    let cnv=createCanvas(800, 500);
    cnv.parent("p5-canvas-container")
  
  // Random chunks
  for (let i = 0; i < numChunks; i++) {
    chunkX[i] = random(width);
    chunkY[i] = random(height);
    chunkW[i] = random(20, 50);
    chunkH[i] = random(20, 50);
    chunkSpeed[i] = random(0.1, 0.3);
    sinInput[i] = random(0, 360);
  }
}

function draw() {
  
  // Wall
  background(180,50);

  // wall line
  stroke(80, 50, 50, 50);
  strokeWeight(8);
  line(width * 0.25, height - 150, width * 0.25, 0);
  line(width * 0.75, height - 150, width * 0.75, 0);

  // floor
  fill(80, 50, 50); // Brown color 
  beginShape();
  vertex(0, height);
  vertex(width, height);
  vertex(width * 0.75, height - 150);
  vertex(width * 0.25, height - 150);
  endShape(CLOSE);

  // Moldy noise effect
  noStroke();
  fill(100, 200, 100, 150);
  for (let i = 0; i < 10000; i++) {
    let x = random(width);
    let y = random(height);
    ellipse(x, y, 2, 2);
  }

  // Chunks
  for (let i = 0; i < chunkX.length; i++) {
    noStroke();
    fill("#F6EFDD44");
    // Shaking effect
    let sinValue = sin(sinInput[i]);
    sinInput[i] += 0.08;
    let shake = sinValue * amp;

    rect(chunkX[i] + shake, chunkY[i], chunkW[i], chunkH[i]);

    // Chunks fall until they reach the ground
    chunkY[i] += chunkSpeed[i];
    if (chunkY[i] + chunkH[i] >= height) {
      chunkY[i] = height - chunkH[i];
    }
  }
  // wall texture
  if (
    mouseY < height - 150 &&
    mouseY > 0 &&
    mouseX > width * 0.25 &&
    mouseX < width * 0.75
  ) {
    for (let y = 0; y < height-150; y += 50) {
      for (let x = 0; x < width; x += 50) {
        noStroke();
        fill("#FAF3DF1E");
        rect(x, y, random(-50, 50), random(-50, 50));
      }
    }
  }
  
//click on chunks on the ground--->message  



  let framesSinceLastClick = frameCount-frameCountAtLastChunkClick
  if (framesSinceLastClick>30 && showChunkText == true && showcountdown == true){
    showChunkText = false;
    showcountdown = true;
    // delete first element in texts array
    texts.splice(0,1)
    countdown.splice(0,1)
  }
  
  
  if(showChunkText == true){
    fill ("rgb(138,22,22)")
    textSize (20)
    text(texts[0],205,190)
  }
  
  if (showcountdown == true){
    fill ("rgb(138,22,22)")
    textSize (40)
    text(countdown[0],100,175)
  }
  
  if (showChunksCountdown == true){
    fill("#FAF3DF")
    textSize (40)
    text(ChunksCountdown[0],650,175)
  }

  
 if(chunkX.length==0){
  fill("#F3EEE1")
  rect(width*0.25,173,width*0.5,20)
  textSize(20)
  fill("rgb(138,22,22)")
  text("TIME TO REFURNISH THE HOUSE",235,190)
 }

  drawSofa(x,50)
  if (mouseX<110+x && mouseX>80+x && mouseY<300 && mouseY>200){
  x+=1.5
  }
  if (mouseX<280+x && mouseX>220+x && mouseY<300 && mouseY>200){
  x-=1.5
  }
textSize(15) 
fill("#FAF3DF9E")
text("move sofa",x+145,365)

}
function drawSofa(x) {
  push()
  translate(x,50)
  stroke(0)
  strokeWeight(2)
  // Sofa base
  fill(0,90); 
  rect(100, 250, 160, 50, 20); // Base of the sofa
  // Sofa cushions
  fill(0,90); 
  rect(110, 200, 140, 60, 10); // Back cushion
  rect(120, 250, 60, 50, 10);  // Left cushion
  // Armrests
  fill(0,97);
  rect(90, 250, 20, 50, 10);   // Left armrest
  rect(260, 250, 20, 50, 10);  // Right armrest
  // Legs
  fill("rgb(0,0,0)"); 
  rect(100, 300, 20, 10);  // Left leg
  rect(260, 300, 20, 10);  // Right leg  
pop()

}


//click on chunks falling--->disappearing
function mousePressed() {
  for (let i = 0; i < chunkX.length; i++) {
    if (
      mouseX > chunkX[i] &&
      mouseX < chunkX[i] + chunkW[i] &&
      mouseY > chunkY[i] &&
      mouseY < chunkY[i] + chunkH[i] 
    ) {
      // all the stuff that should happen when we click a chunk comes here:
      
      // show the text
      showChunkText=true
      showChunksCountdown=true
      frameCountAtLastChunkClick = frameCount;
      
      // delete chunk, donot show text
    if (mouseY<height-100){
      chunkX.splice(i,1)
      chunkY.splice(i,1)
      chunkW.splice(i,1)
      chunkH.splice(i,1)
      ChunksCountdown.splice(0,1)
      showChunkText=false
      showcountdown=true
      showChunksCountdown=true
    }else{
      chunkX.splice(i,1)
      chunkY.splice(i,1)
      chunkW.splice(i,1)
      chunkH.splice(i,1)
      ChunksCountdown.splice(0,1)
      showChunkText=true
      showcountdown=true
      showChunksCountdown=true
    }
  }
  }
}
let resetButton;
let x = 100
let jiggling = false;
let offsetX = 0;
let jigglingAmount = 500;



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
  resetButton = createButton('REENTER');
  resetButton.position(360, 185);
 resetButton.mousePressed(resetSketch);
 resetSketch();
}

function draw() {
  
  // Wall
  background(180,50);

  // wall line
  stroke(80, 50, 50, 50);
  strokeWeight(15);
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
    let d = dist(mouseX, mouseY, chunkX[i], chunkY[i]);

    rect(chunkX[i] + shake + offsetX, chunkY[i], chunkW[i], chunkH[i]);

    // Chunks fall until they reach the ground
    chunkY[i] += chunkSpeed[i];
    if (chunkY[i] + chunkH[i] >= height) {
      chunkY[i] = height - chunkH[i];
    }
      if (d < 100) { // If mouse is within 100 pixels
    jiggling = true;
  } else {
    jiggling = false;
    offsetX = 0;
  }
  if (jiggling==true) {
    // Apply a jiggling effect
    offsetX = sinValue*jigglingAmount 
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
        fill("#FAF3DF0F");
        rect(x, y, random(-50, 50), random(-50, 50));
      }
    }
  }
  
//click on chunks on the ground--->message  

  let framesSinceLastClick = frameCount-frameCountAtLastChunkClick
  if (framesSinceLastClick>35 && showChunkText == true && showcountdown == true){
    showChunkText = false;
    showcountdown = true;
    // delete first element in texts array
    texts.splice(0,1)
    countdown.splice(0,1)
  }
  
  if(showChunkText == true){
    fill ("#311C05")
    textSize (20)
    text(texts[0],205,175)
  }
  
  if (showcountdown == true){
    fill ("#311C05")
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
  fill(0)
  text("TIME TO REFURNISH THE HOUSE",235,190)
 }

  drawSofa(x,50)
  if (mouseX<150+x && mouseX>40+x && mouseY<300 && mouseY>160){
  x+=1.5
  }
  if (mouseX<320+x && mouseX>180+x && mouseY<300 && mouseY>160){
  x-=1.5
  }
  

}
function drawSofa(x) {
  push()
  translate(x,50)
  stroke("#DACDAA42")
  strokeWeight(2)
  // Sofa cushions
  fill("#DACDAA"); 
  rect(111, 200, 140, 60, 10); // Back cushion
  // Sofa base
  fill("#483027"); 
  rect(100, 250, 160, 50, 20); // Base of the sofa
  fill("#C8491A7A");
  rect(120, 230, 70, 60, 10);  // Left cushion
  // Armrests
  fill("#311C05");
  rect(90, 250, 20, 50, 10);   // Left armrest
  rect(255, 250, 20, 50, 10);  // Right armrest
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
    if (mouseY<height-200){
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

//RESTART
function resetSketch() {
  x = 100;
  chunkX = [];
  chunkY = [];
  chunkW = [];
  chunkH = [];
  chunkSpeed = [];
  sinInput = [];
  showChunkText = false;
  showcountdown = false;
  showChunksCountdown = false;
  frameCountAtLastChunkClick = 0;
  
  texts = ["你好呀 does it feel scary?", "this is getting weird","life is like a haunted house haha","guess who am i?","turning into those little chunkies","i hate the molds growing in here","it's time to refurnish this old house","cherish every moment of your life","最后,记得","我爱你"];
  countdown = ["10","9","8","7","6","5","4","3","2","1"];
  ChunksCountdown = ["25","24","23","22","21","20","19","18","17","16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1"];
  
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
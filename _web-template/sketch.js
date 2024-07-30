function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvas-parent")
  }
  
  function draw() {
    background("green");
    fill("red")
    rect(100,100,200,200)
  }
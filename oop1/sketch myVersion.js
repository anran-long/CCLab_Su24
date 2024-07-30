let instanceOfTaxi1;
let taxi2;

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvas-parent")

    instanceOfTaxi = new Taxi(100,100,1.1);

    taxi2 = new Taxi(300,100,0.3);
  }
  
  function draw() {
    background("green");
    instanceOfTaxi.display();
    instanceOfTaxi.spinWheel();
    instanceOfTaxi.move();

    taxi2.spinWheel();
    taxi2.display();
  }



  class Taxi{
    constructor(startX, startY, scaleFactor){
      this.x = startX;
      this.y = startY;
      this.s = scaleFactor;
      this.wheelAngle = 45;
      this.wheelSpeed = 3;
      this.speed = random(-2,2);
    }

    spinWheel(){
      this.wheelAngle+=this.wheelSpeed;
    }
    move(){
      this.x+=this.speed;
    }


    update(){
      this.wheelAngle+=this.WheelSpeed;
      this.x+=this.speed;
      if(this.x>width){
        thi
      }
      
    }
    display(){
      push();
      translate(this.x, this.y);
      scale(this.s);

          noStroke();
          fill(240, 220, 60);

          // base:
          rect(-50, -50, 100, 30);
          // top"
          rect(-25, -70, 50, 20);
          // wheel 1:
          this.drawWheel(-30, -15);
          // wheel 2:
          this.drawWheel( 30, -15);


          // just to see origin 
          // of translation matrix:
          fill("red");
          circle(0, 0, 5); 


      pop();
    }
       drawWheel(wheelx, wheely){
        push();
        translate(wheelx, wheely);
        rotate(radians(this.wheelAngle));

            noStroke();
            fill(0);
            // circle(0,0,30);
            ellipse(0,0,30, 27);

        pop();
    }
  }
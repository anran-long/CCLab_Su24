let worries = [];
let numWorries = 3;

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvas-parent")


    for(let i = 0; i < numWorries; i++){
        worries.push(new Worry(random(width), random(height)));
    }
}

function draw() {
    background(220, 50, 120);

    for(let i = 0; i < worries.length; i++){
        worries[i].update();
        worries[i].display();

    }
    


    // delete/clean up loop:
    for(let i = worries.length -1; i >=0 ; i--){
        if(worries[i].active == false){
            worries.splice(i, 1);
        }

    }

}


class Worry{
    constructor(startX,startY){
        this.x = startX;
        this.y = startY;
        this.dia = 30;
        this.active = true;
    }
    update(){
        this.x+= random(-1, 1)
        this.y+= random(-1, 1) 
    }
    display(){
        push();
        translate(this.x, this.y);

        fill(30);
        noStroke();
        circle(0, 0, this.dia);

        if(this.active == false){
            fill("red");
            circle(0, 0, 5);
        }


        pop();
    }
    checkClick(){
        let distanceToMouse  = dist(mouseX, mouseY, this.x, this.y);
        if(distanceToMouse < this.dia/2){
            this.active = false;
        } 
    }
}


function mousePressed(){
    // each worry should check if it was clicked
    for(let i = 0; i < worries.length; i++){
        worries[i].checkClick();

    }
}

function keyPressed(){
    worries.push(new Worry(mouseX, mouseY));
}
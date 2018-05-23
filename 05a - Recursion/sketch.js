

function setup() {
    createCanvas(900, 700);
}

var changeInLength = -2.5;
var changeInRadiusOfRotation = -4;
var changeInRotation = -3;

/**
Draws a spiral of rectangles recursively.
@param {number} length The inital length of a rectangle in the spiral
@param {number} radiusOfRotation The radius which is used to determine the rectangle's position in the spiral
@param {number} rotation The current amount of rotation for the rectangle
**/
function recursiveDraw(length, radiusOfRotation, rotation){
  if(length <=1 || radiusOfRotation < 0){ //stop drawing when the length or radius is too small
    return;
  }
  rectMode(CENTER);
  var x = cos(radians(rotation)) * radiusOfRotation; //determine position in spiral based on current rotation
  var y = sin(radians(rotation)) * radiusOfRotation;

  push();
  translate(width/2, height/2); //translate to center
  rotate(radians(rotation+180));
  noStroke();
  rect(x, y, length, length* 0.1);
  pop();

  //gradually shrink the length of the rectangle, the radius (which determines position), and increment the rotation
  recursiveDraw(length +changeInLength, radiusOfRotation + changeInRadiusOfRotation, rotation +changeInRotation);
}

var count = 0;
function draw() {
  background(255);
  changeInRotation = - (1 + mouseX/width * 10); //user controls certain variables used in the recusive function by mouse position
  changeInRadiusOfRotation = - (2 + mouseY/height * 10);

  fill(0, 100, 255, 100);
  recursiveDraw(200, width/2, 0); //draw 3 spirals at different starting rotations
  fill(100, 200, 255, 100);
  recursiveDraw(200, width/2, 120);
  fill(190, 220, 255, 100);
  recursiveDraw(200, width/2, 240);
}

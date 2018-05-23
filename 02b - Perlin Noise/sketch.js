var x, y; //hold coordinates of the circle
var count; //value that is slowly incremented to get new noise values
function setup() {
createCanvas(1200, 600);
  count = 0;
  x = 0;
  y = 0;
}

function draw() {
  count +=0.005;
  background(240);
  x = width * noise(count); //x of ellipse within 0 and width
  y = height * noise(count+999999);//y of ellipse within 0 and height. Added a large number to the noise function's parameter so that
                                   //the y coordinate does not have the same value as the x coordinate
  fill(255, 100, 0);
  ellipse(x, y, 40, 40);
}

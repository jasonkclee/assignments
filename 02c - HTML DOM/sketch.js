//the html controls used for the program
var txtNCircles, btnUpdate, slNoiseDist;

var circles = []; //list of circles; contains the color for the ith circle
var count; //a counter variable that increases slowly. Used for the noise function.
var noiseDist; //determines how far apart the noise coordinates of each circle will be from each other.

function setup() {
  createCanvas(500, 500);
  count = 0;
  txtNCircles = createInput("50"); //create textbox for number of circles, set default number of circles to 5
  btnUpdate = createButton("Update");
  btnUpdate.mousePressed(updateNumberOfCircles); //number of circles will be updated when btnUpdate is pressed
  updateNumberOfCircles(); //get circles on screen initially
  slNoiseDist = createSlider(0, 0.5, 0.01, 0.0001); //slider for noiseDist
  slNoiseDist.changed(updateNoiseDist); //update the noiseDist variable when the slider changes in value
  noiseDist = 0.01; //default value for noiseDist
  ellipseMode(CENTER);
}

function draw() {
  count +=0.005;
  background(0);
  for(var i = 0; i < circles.length; i++){
    var val = noiseDist * i + count; //determine the value to pass into the noise function
    var x = noise(val) * width;
    var y = noise(val + 99999)* height; //add large value to the noise parameter for y so its distinct from the x coordinate
    fill(circles[i]);
    ellipse(x, y, 40, 40);
  }
}

/**
This function updates the noiseDist variable with the value found in the slider "slNoiseDist"
**/
function updateNoiseDist(){
  noiseDist = slNoiseDist.value();
}

/**
This function updates the number of circles on screen with the value found in the textbox "txtNCircles".
The user will be notified if the inputted value is invalid (i.e. out of the range 0-100, or not a number).
Items are pushed/removed from the array "circles" until the size matches the number.
**/
function updateNumberOfCircles(){
  var n = txtNCircles.value();
  if(isNaN(n) ||n == null){
    alert("Invalid value for number of circles");
    return;
  }
  else if(n<0 || n > 100){
    alert("Input number of circles between 0 and 100");
    return;
  }
  while(circles.length < n){
    circles.push(color(random(255), random(255), random(255)));
  }
  if(circles.length > n){
    circles.splice(0, circles.length-n);//remove at 0 index, remove (difference between target and current # of circles) items
  }
}

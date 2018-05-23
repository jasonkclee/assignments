var ship;

var keys = {}; //dictionary of keys pressed
var rocks = [];
var rFrames = 0; //counter for when to add a rock
var framesPerRock = 40;
var maxRocks = 10;
var highScore = 0;
var score = 0;
var sFrames = 0; //counter for when to increment score

var txtMaxRocks, slShipAccel, chkBezier, btnUpdate; //html controls
function setup() {
  createCanvas(600, 600);
	ship = new Ship(width/2, height/2);

	btnUpdate = createButton('Update');
	btnUpdate.position(width+10, 20);
	btnUpdate.mousePressed(btnUpdateClicked);

  var maxRocksP = createP("Max # rocks (1-20):");
	maxRocksP.position(width +10, 50);
	txtMaxRocks = createInput();
	txtMaxRocks.position(width+10, 100);

  var shipAccelP = createP("Ship acceleration : ");
  shipAccelP.position(width +10, 130);
  slShipAccel = createSlider(0.05, 1.2, 0.2, 0.02);
  slShipAccel.position(width+10, 180);

  chkBezier = createCheckbox('Bezier Curve for Rocks', true);
  chkBezier.position(width+10, 230);
}

/**
Handles the click event of btnUpdate. Updates the max number of rocks with the value in the textbox
**/
function btnUpdateClicked(){
	var mRocks = -1;
	if(!isNaN(txtMaxRocks.value())){
		mRocks = int(txtMaxRocks.value());
	}
	if(mRocks >=1 && mRocks <=20){
		maxRocks = mRocks;
	}
	else{
		alert("Invalid input for Max # of rocks. Choose a value between 1 and 20");
	}

}

function addRandomRock(){

	var r = new Rock();
	r.setup();

	//determine random position (offscreen) to start
	//ASSUMES SQUARE CANVAS => KEEP CANVAS SQUARE
	var border = 75;
	var u = border + random(width-border*2);
	var v = random()>0.5?-r.maxRadius : width + r.maxRadius;

	if(random()>0.5){
		r.x = u;
		r.y = v;
		r.vX = (random(0.6)) * (random()<0.5?1:-1);
		r.vY = (0.7 + random(2)) * r.y<0?1:-1;
	}
	else{
		r.x = v;
		r.y = u;
		r.vY = (random(1)) * random()>0.5?1:-1;
	  r.vX = (0.7 + random(2)) * r.x<0?1:-1;
	}

	rocks.push(r);
}

/**
Reset the game
**/
function reset(){
	sFrames = 0;
	rFrames = 0;
	score = 0;
	rocks = []; //clear rocks

	ship.x = width/2;
	ship.y = height/2;
	ship.col = color(30+random(255), 30+random(255), 30+random(255));
	ship.vX = 0;
	ship.vY = 0;
	ship.angle = 0;
}

function draw() {
  ship.accel = slShipAccel.value();
  background(0);
	rectMode(CORNER);
	noStroke();
	fill(255);
	text("Highscore : " + highScore, 5, 20);
	text("Current Score : " + score, 5, 40);

	rFrames ++;
	if(rocks.length < maxRocks && rFrames > framesPerRock){
		rFrames = 0;
		addRandomRock();
	}

	sFrames ++;
	if(sFrames % 60 ==0){
		 score ++;
		if(score > highScore){
			highScore = score;
		}
		sFrames = 0;
	}

	//update/draw rocks
	//also check for collisions here
  var drawBezier = chkBezier.checked();
	for(var i = 0; i < rocks.length; i++){
		if(rocks[i].isActive){
	    rock = rocks[i];
			rock.update();
			rock.draw(drawBezier);
			if(dist(rock.x, rock.y, ship.x, ship.y)<rock.radius+10){ //if ship collides with rock , reset game
				 reset();
			}
		}
		else{
			rocks.splice(i, 1);
			i--;
		}
	}

	//handle user inputs
	if(keys["W"] == true){
		 ship.moveForward();
	}
	if(keys["A"] == true){
		 ship.rotateLeft();
	}
	if(keys["D"] == true){
		 ship.rotateRight();
	}

	//update/draw ship
	ship.draw();
	ship.update();

}

//use key dictionary to keep track of keys held down
function keyPressed(){
	keys[key] = true;
}
function keyReleased(){
	keys[key] = false;
}

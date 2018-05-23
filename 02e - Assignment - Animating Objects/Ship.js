/**
@class
@constructor
@param {number} x X position of the ship
@param {number} y Y position of the ship
**/
function Ship (x, y){
	this.x = x;
	this.y = y;
	this.vX = 0;
	this.vY = 0;
	this.angle = 0;
	this.accel = 0.2;
	this.rotSpd = 7; //how fast you can rotate the ship
	this.moving = false; //is ship boosting forward
	this.col = color(30+random(255), 30+random(255), 30+random(255));


  /**
	This function applies a forward (in the direction where the ship is pointing) acceleration on the ship
	**/
	this.moveForward = function(){
		this.moving = true;

		//accelerate according to current angle of rotation
		this.vX += this.accel * cos(this.angle)
		this.vY += this.accel * sin(this.angle)
	};

	/**
	This function rotates the ship left
	**/
	this.rotateLeft = function(){
		this.angle -= radians(this.rotSpd);
	};

	/**
	This function rotates the ship right
	**/
	this.rotateRight = function(){
		this.angle += radians(this.rotSpd);
	};

	/**
	This function updates the position and velocity of the ship
	**/
	this.update = function(){
		if(!this.moving){ //gradually slow down if user is not moving
			this.vX *= 0.99;
			this.vY *= 0.99;
		}
		this.handleWalls();
		this.moving = false;
		this.x += this.vX;
		this.y += this.vY;

	};

  /**
	This function handles wall collisions with the ship (i.e. bounce off of wall)
	**/
	this.handleWalls = function(){
		var hitWall = false;
		//bounce off of walls by flipping velocities
		if(this.x < 0){
			this.x = 0;
			this.vX = this.vX < 0 ? -this.vX : this.vX;
			hitWall = true;
		}
		else if(this.x > width){
			this.x = width;
			this.vX = this.vX < 0? this.vX : -this.vX;
			hitWall = true;
		}
		if(this.y < 0){
			this.y = 0;
			this.vY = this.vY > 0? this.vY : -this.vY;
			hitWall = true;
		}
		else if(this.y > height){
			this.y = height;
			this.vY = this.vY > 0? -this.vY : this.vY;
			hitWall = true;
		}
		if(hitWall){
			this.vX *=0.5; //slow down when colliding with wall
			this.vY *=0.5;
		}
	}

	/**
	This function draws the ship at its current position
	**/
	this.draw = function(){

		noStroke();
		fill(this.col);
		push();

		translate(this.x, this.y);
		rotate(this.angle);
		triangle(20, 0, -20, 15, -20, -15); //draw ship

		if(this.moving){ //draw a blue triangle if user boosts forward
			fill(0, 100, 255);
			triangle(-20, 10, -20, -10, -40, 0);
	  }
		pop();

	};
}

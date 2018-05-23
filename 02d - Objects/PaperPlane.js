/**
@class
@constructor
@param {number} x X position of the plane
@param {number} y Y position of the plane
@param {number} count Starting position for the noise function
@param {number} rotRate Tendency for the plane to rotate/spin
**/

function PaperPlane(x, y, count, rotRate) {
  this.x = x;
  this.y = y;
  this.count = count; //used to keep track of current position in the noise() function
  this.rotRate = rotRate; //rate of rotation
	this.rad = 0;
	this.isActive = true;
	this.spd = 5;
	this.variance = 0.999 + random() * 0.002; //add slight noise to rotation of plane
	this.color = color(100 + random(155),100 + random(155), 100 + random(155), 150);

  /**
  Updates the PaperPlane's rotation and x/y position. Checks if the plane is outside of the screen; if so, the variable isActive is set to false.
  **/
  this.update = function() {
		this.rad = this.rad%(2*PI);
		if((this.rad > 5/4*PI && this.rad < 7/4*PI) ||
			(this.rad > 1/4*PI && this.rad < 3/4*PI)){
			this.count+=2; //quickly go through rotations that makes the plane look more vertical
		}
	  else{
      this.count +=0.6; //go through horizontal rotations slower
		}

    //determine the rotation based on the current count value, rotation rate, and variance
		this.rad = noise(this.count * 0.005) *PI*this.rotRate * this.variance;

    //speed of the plane is noisy as well
		this.spd = 2.5+ noise(this.count*0.001)*6;

		this.x += cos(this.rad) * this.spd;
		this.y += sin(this.rad) * this.spd;

    var b = 100; //border so that planes are removed when they are fully offScreen
    if(this.x > width + b|this.x < -b|this.y > height +b|this.y < -b){
      this.isActive = false; //warns that this plane should not be active (i.e. remove from list)
    }
  };

/**
Draws the PaperPlane at its current location
**/
  this.render = function() {
    rectMode(CENTER);
    push();
    translate(this.x, this.y);
    rotate(this.rad);
		fill(this.color);
		noStroke();
    triangle(-20, -10, -20, 10, 20, -20);
    pop();
  }
};

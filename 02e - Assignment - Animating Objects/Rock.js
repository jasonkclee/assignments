/**
@class
@constructor
**/
function Rock (){
	this.x = 0;
	this.y = 0;
	this.vX = 0;
	this.vY = 0;
	this.radius = 0;
	this.nOffset = random(99999); //noise offset value for noise()
	this.variance = 0; //how much noise is allowed to affect the bezier during line drawing
	this.maxRadius = 0; //largest possible radius of shape; this is needed due to noisiness of the shape
	this.points = []; //points to draw
	this.rot = 0; //current rotation of shape
	this.dRot = radians((3 + random(3)) * (random()>0.5?1:-1)); //change in rotation
	this.isActive = true;

	/**
	This function sets up the points that make up the rock's shape
	**/
	this.setup = function(){
		this.radius = 25 + random(50);
		this.variance = this.radius * 0.3;
		this.maxRadius = this.radius + this.variance;
		var nPoints = int(5 + random(4));

		for(var i =0; i < nPoints; i++){
			var angle = 2 * PI / (nPoints) * i;

			//plot points along a circle, adding some noise as well
			//These points will be used in the draw function (i.e. draw lines between consecutive points)
			var px = cos(angle) * this.radius * (1 - random(0.3));
			var py = sin(angle) * this.radius * (1 - random(0.3));
			this.points.push([px, py]);
		}

	}

	/**
	This function updates the position of the rock and its rotation. The rock is considered not active if it is offscreen
	**/
	this.update = function(){
		this.x += this.vX;
		this.y += this.vY;
		this.rot += this.dRot;

		//check if offscreen; if offscreen, signal that the rock is inactive
		if(this.x > width + this.maxRadius*2 || this.x < -this.maxRadius*2
			 || this.y > height + this.maxRadius*2 || this.y < -this.maxRadius*2){
			this.isActive = false; //outside of screen
		}
	}

	/**
	This function draws the rock
	@param {boolean} drawBezier If the rock should be drawn with bezier curves
	**/
	this.draw = function(drawBezier){
		push();
		translate(this.x, this.y);
		rotate(this.rot);
		for(var i = 0; i < this.points.length; i++){
				//endpoints of bezier curve: p1, p2
				var p1 = this.points[i];
				var p2 = this.points[i+1];
				if(i == this.points.length-1){ //connect last point with first point
					p2 = this.points[0];
				}

				strokeWeight(5);
				stroke(255);
				fill(255);

				if(!drawBezier){
					line(p1[0], p1[1], p2[0], p2[1]); //just draw straight line
				}
				else{
					//noisy control points of bezier curve: noiseP1, noiseP2
					//Their initial values are set so that a straight line would be drawn
					//when used with p1 and p2 in the bezier function
					var noiseP1 = [p1[0] + (p2[0]-p1[0]) * 0.3,
												p1[1] + (p2[1] - p1[1]) * 0.3];

					var noiseP2 = [p1[0] + (p2[0]-p1[0]) * 0.5,
												p1[1] + (p2[1] - p1[1]) * 0.5];

					//Now add noise to the coordinates of the control points:
					// I found that for the best results, only one of the points in the bezier curve
					// should have "noisy" coordinates. If you uncomment the two lines below (i.e.
					// both points of the berzier become noisy), the shape resembles a cloud. The goal
					// is to have a smooth, rocky shape

					//The noise value added to the coordinate should have the same sign as the coordinate
					//so that the curve is always bent outwards (round shape) rather than inwards (spikey shape)

					//noiseP1[0] += noise(this.nOffset+i)*this.variance * (p1[0]<0?-1:1);
					//noiseP1[1] += noise(this.nOffset +i*2)*this.variance * (p1[1]<0?-1:1);

					noiseP2[0] += noise(this.nOffset+i*3)*this.variance * (p2[0]<0?-1:1);
					noiseP2[1] += noise(this.nOffset+i*4)*this.variance * (noiseP2[1]<0?-1:1);

					bezier(p1[0], p1[1],noiseP1[0], noiseP1[1], noiseP2[0], noiseP2[1], p2[0], p2[1]);
			}
		}
		pop();
	}

}

# Explanation

The program has a user controlled ship (with keys W = moveForward, A = rotate left, D= rotate right) which can fly around the screen, avoiding rocks which also move across the screen. If the ship collides with the rock, the game is reset. The longer your ship avoids the rocks, the higher the score. You can change the maximum number of rocks on screen by inputting a number into the textbox and pressing the update button. The acceleration rate of the ship is controlled by a slider. The rocks can be drawn with/without bezier curves by setting the check box on/off.

The Ship class is responsible for keeping track of its position, velocity, and acceleration. Functions moveForward(), rotateLeft(), rotateRight(), give the user control over the ship's movement. handleWalls() detects when the ship is against the border of the screen, bouncing the ship back off the wall. draw() and update() are self explanatory.

The Rock class is responsible for keeping track of its position and velocity. The function setup() is used to create the points of the rock shape which will be used later in the draw() function. The noise() function is used to determine the control points of the bezier curves for the rock. draw() and update() are self explanatory.  

# Explanation
This program draws a variable number of balls moving around the screen. The distance between the balls is variable and helps demonstrate the idea of noise being scalable.

The program uses an array, "circles", to hold the colors of each circle to be drawn. For every color in the array, x and y coordinates are determined by the noise function which is determined by the "count" variable (slowly incremented every frame) and the "noiseDist" variable and the index of the current item. The greater the value of noiseDist, the further apart the balls will be from each other (i.e. it will take longer for circles[0] to reach the position of circles[1] if the value of noiseDist is greater).  

There are two controls that allow the user to change two of the variables in the program. The txtNCircles is a textbox that allows users to enter the number of balls to display (between 0 and 100). The btnUpdate updates the array with the new number of circles in the textbox when clicked. The slNoiseDist allows users to change the value of noiseDist by using a slider.

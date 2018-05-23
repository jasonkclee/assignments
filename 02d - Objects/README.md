# Explanation
  The program spawns paper planes that are blown by wind. You can click on the screen to spawn a cluster of planes.

  The PaperPlane class is responsible for updating the position and drawing the plane. 1D Perlin noise is used to smoothly change the rotation of the plane. The plane's velocity (change in coordinates) is determined by the rotation of the plane (i.e. sin and cos of the rotation). The speed of the plane is determined by the noise function. The variable "count" is incremented every frame and is passed into the noise function when the noise function is needed. The variance variable is set randomly so that there is slightly more variation in rotation. 

  The sketch.js file uses arrPlanes to keep a list of planes that have to be updated/drawn and qPlanes to queue up planes to be added to arrPlanes, delaying the spawning slightly so that the planes are not too close to each other. The file also handles mouseClicked so that a cluster of planes spawn if the user clicks on the screen.

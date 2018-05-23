var arrPlanes, qPlanes;
var count, framesDelay;

/**
  This function adds a cluster of PaperPlanes to the array of PaperPlanes "arrPlanes"
  @param {number} x The x coordinate of where to spawn a cluster of planes
  @param {number} y The y coordinate of where to spawn a cluster of planes
  @param {number} nPlanes The number of planes to spawn
  @param {number} rotRate Controls how often/fast the planes rotate
**/
function addCluster(x, y, nPlanes, rotRate) {
    var sCount = random() * 99999; //random starting place for the noise
    for (var i = 0; i < nPlanes; i++) {
        var sx = x + (random() - 0.5) * 2 * 20;
        var sy = y + (random() - 0.5) * 2 * 20;
        var nPart = new PaperPlane(sx, sy, sCount, rotRate);
        qPlanes.push(nPart);
    }
}

function setup() {
    createCanvas(1300, 700);
    count = 0;
    rectMode(CENTER);
    arrPlanes = [];
    qPlanes = []; //to queue parts to add into arrPlanes
    addCluster(width / 2, height / 2, 10);
    framesDelay = 2;
}

function draw() {
    count++;

    //use qPlanes to delay the addition of planes slightly
    if (count > framesDelay) {
        count = 0;
        if (qPlanes.length > 0) {
            arrPlanes.push(qPlanes.pop());
        }
    }

    //automatically add some planes if there are less than 15
    if(qPlanes.length + arrPlanes.length < 15){
      var b = 200; //add planes in at positions where 200< x <width-200, 200< y <height-200, so planes are closer to the center
      //radomize some attributes of the planes
      addCluster(b + random(width - b*2), b + random(height - b*2), 7 + random(16),  1+random(12));
    }

    background(220, 240, 255);

    //loop through planes, update/draw/remove planes
    for (var i = 0; i < arrPlanes.length; i++) {
        var a = arrPlanes[i];
        if (a.isActive) {
            a.update();
            a.render();
        } else { //remove plane if inactive
            arrPlanes.splice(i, 1);
            i--;
        }
    }

}

/**
Adds a cluster where the mouse is clicked
**/
function mouseClicked() {
    addCluster(mouseX, mouseY, 7 + random(16), 1+random(12));
}

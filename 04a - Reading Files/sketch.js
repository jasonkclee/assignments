var firstWords = []; //lists 1st word in each sentence

function preload(){
  loadStrings('rhesus.txt', onFileLoaded, onFileLoadError );
}

/**
  Callback function for when file 'rhesus.txt' is loaded. Gets the first word of each sentence and adds to an array, sorting the words
  by length.
**/
function onFileLoaded(result){
  for(var i = 0; i < result.length; i++){
    var sentence = result[i].split(" ");
    for(var j = 0; j < sentence.length; j++){
      var word = sentence[j];
      if(word != "" && word != " " && firstWords.indexOf(word)==-1){ //skip over blank spaces and duplicates
        firstWords.push(word);
        break; //stop searching in this sentence
      }
    }
  }
  //sort firstWords by length of words
  firstWords.sort(compareLength);
  console.log(firstWords);
}

/**
  Function provided to the array's sort function to determine the order of the sort. In this case, the comparison is between the lengths
  of the strings.
**/
function compareLength(a, b){
  return a.length - b.length;
}

function onFileLoadError(result){
  alert("error occurred : " + result);
}


function setup(){
  createCanvas(1300, 700);

  background(0, 255, 255);
  noStroke();

  //create background that transitions for c1 to c2
  var c1 = color(255, 200, 0);
  var c2 = color(0, 200, 255);
  var rects = 100; //split the screen into 100 seperate rectangles and fill in the rectangles
  for(var i = 0; i < rects; i++){
    fill(lerpColor(c1, c2, i/rects));
    var w = width / rects;
    rect(i * w, 0, w, height);
  }

  //draw spiral of words
  rectMode(CENTER);
  textAlign(CENTER);
  fill(255, 100);
  for(var i = 0; i < firstWords.length; i++){
    var rad = i/firstWords.length * 2 * PI * 7; //have 7 rotations total
    var radius = i/firstWords.length * width * 0.55; //radius approaches half the width
    var y = sin(rad) * radius + height/2;
    var x = cos(rad) * radius + width/2;

    push();
    translate(x, y);
    rotate(rad + PI*0.25); //put words at an angle
    textSize(13 + 15 * i/firstWords.length); //increase size as spiralling out
    text(firstWords[i], 0, 0);
    pop();
  }
}


function draw(){ //nothing in draw function since I only want to draw once in setup
}

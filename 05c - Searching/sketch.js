
var regNumber = /\d+/g; //match numbers
var numbers; //list of numbers
var txtSearch, btnBinarySearch, btnLinearSearch, pOut; //html controls

function preload(){
  loadStrings('rhesus.txt', onFileLoaded, onFileLoadError );
}

/**
  Callback function for when file 'rhesus.txt' is loaded.
**/
function onFileLoaded(result){
  var string = result.join("\n");
  var sNumbers = string.match(regNumber);
  numbers = [];
  for(var i = 0; i < sNumbers.length; i++){
    numbers.push(int(sNumbers[i]));
  }
}

function onFileLoadError(result){
  alert("error occurred : " + result);
}

/**Sorts an array using the built-in sort
@param {array} arr Array to sort
@return {array} Sorted array
*/
function superSort(arr){
  return sort(arr); //arr.sort doesn't work
}


function setup(){
  console.log(superSort(numbers)); //sort numbers
  createP("Search for number here:");
  txtSearch = createInput(); //create textbox to receive input
  btnBinarySearch = createButton("Binary Search");
  btnLinearSearch = createButton("Linear Search");
  pOut = createP(""); //used to store output

  btnBinarySearch.mousePressed(function(){
    var val = int(txtSearch.value());
    var start = performance.now();
    var index = binarySearch(numbers, val);
    var end = performance.now();
    pOut.html("Index: " + index + "   Time needed for binary search: " + (end - start));
  });

  btnLinearSearch.mousePressed(function(){
    var val = int(txtSearch.value());
    var start = performance.now();
    var index = linearSearch(numbers, val);
    var end = performance.now();
    pOut.html("Index: " + index + "   Time needed for linear search: " + (end - start));
  });

  createCanvas(50, 50);

  background(0, 150, 150);
  noStroke();
  var red = color(205, 0, 0);
  fill(red); //red pixel drawn on turquoise background
  rect(width/2, height/2, 1, 1);
  //set(0, 0, red);
  loadPixels();
  updatePixels();
  console.log(pixels);
  //search for red pixel

  console.log(pixels.length);
  console.log("Linear search - Index of red pixel: " + linearSearch(pixels, red));

}

/** Binary search an array for a value; returns the index.
@param {array} arr Array to search through
@param {number} val Value to search for in arr
@return {number} Returns the index where the value is found*/
function binarySearch(arr, val){
  var min = 0;
  var max = arr.length - 1;
  while(min <= max){
    var mid = floor((min+max)/2);
    if(arr[mid] < val){
      min = mid+1;
    }
    else if(arr[mid] > val){
      max = mid - 1;
    }
    else if(arr[mid] == val){
      return mid;
    }
  }
  return -1;
}

/** Linear search an array for a value; returns the index.
@param {array} arr Array to search through
@param {number} val Value to search for in arr
@return {number} Returns the index where the value is found*/
function linearSearch(arr, val){
  for(var i = 0; i < arr.length; i++){
    if(arr[i] == val){
      return i;
    }
  }
  return -1;
}

function draw(){ //nothing in draw function
}

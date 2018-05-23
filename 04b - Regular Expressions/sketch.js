
function preload(){
  nItalics = 0;
  n2digit = 0;
  n3digit = 0;
  n4digit = 0;
  loadStrings('rhesus.txt', onFileLoaded, onFileLoadError );
}


var nItalics, n2digit, n3digit, n4digit; //integers to output in the DOM
var regWords = /(\b)(\w+)(\b)/g; //match words
var regItalics = /_[^_]+_/g; //match stuff between italics
var reg2digit = /\b\d{2}\b/g; //match 2 digit
var reg3digit = /\b\d{3}\b/g; //match 3 digit
var reg4digit = /\b\d{4}\b/g; //match 4 digit

/**
  Callback function for when file 'rhesus.txt' is loaded.
**/
function onFileLoaded(result){ //result is an array of strings; each string is 1 sentence
  var str = "";
  for(var i = 0; i < result.length; i++){
    str += result[i]; //put entire file into 1 string
  }
  console.log(str);

  n2digit = numberOfMatches(str, reg2digit);
  n3digit = numberOfMatches(str, reg3digit);
  n4digit = numberOfMatches(str, reg4digit);


 var matches = str.match(regItalics); //get chunks of italicized text
 console.log(matches);
 for(var i =0; i < matches.length; i++){ //go through each chunk of italics, count # words
   nItalics += numberOfMatches(matches[i], regWords);
 }

  console.log("n italicized: " + nItalics);
  console.log("n 2 digits: " + n2digit);
  console.log("n 3 digits: " + n3digit);
  console.log("n 4 digits: " + n4digit);
}

/** Returns number of matches on a string given a regex expression
@param {string} str  String to match with
@param {regex} regex Regex expression to look for in the string
**/
function numberOfMatches(str, regex){
  var result = str.match(regex);
  return (result !=null && result != undefined)? result.length : 0; //avoid returning null/undefined
}

function onFileLoadError(result){
  alert("error occurred : " + result);
}


function setup(){
  noCanvas();
  createP("Number of italicized words: " + nItalics);
  createP("Number of 2 digit numbers: " + n2digit);
  createP("Number of 3 digit numbers: " + n3digit);
  createP("Number of 4 digit numbers: " + n4digit);
}


function draw(){ //nothing in draw function since I only want to draw once in setup
}

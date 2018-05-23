
function preload(){
  loadStrings('rhesus.txt', onFileLoaded, onFileLoadError );
}

var regNumber = /\d+/g; //match numbers
var regWord = /\b\w+\b/g; //match words

/**
  Callback function for when file 'rhesus.txt' is loaded.
**/
function onFileLoaded(result){
  var string = result.join("\n");
  var numbers = string.match(regNumber);
  var words = string.match(regWord);

  var numbersBubbleSort = []; //array of numbers for bubble sort
  var wordsInsertSort = []; //array of words for insert sort
  var numbersSort = [];//array of numbers for sort function
  var wordsSort = []; //array of words for sort function

  for(var i = 0; i < numbers.length; i++){
    var n = int(numbers[i]);
    numbersBubbleSort.push(n);
    numbersSort.push(n);
  }
  for(var i = 0; i < words.length; i++){
    var word = words[i];
    wordsInsertSort.push(word);
    wordsSort.push(word);
  }

  var start = performance.now(); //get time needed for bubbleSort
  bubbleSort(numbersBubbleSort);
  var end = performance.now();
  var millisBubbleSort = end - start;

  //display sorted array
  createP("Bubble sorted numbers : " + numbersBubbleSort);

  //get time needed for built in sort
  start = performance.now();
  sort(numbersSort);
  end = performance.now();
  var millisNumberSort = end - start;

  //log both times
  console.log("Bubble Sort : " + millisBubbleSort + "    Built-in Sort: " + millisNumberSort);
  console.log("Number of numbers sorted: " + numbers.length);

  //get time needed for insertSort
  start = performance.now();
  insertSort(wordsInsertSort);
  end = performance.now();
  var millisInsertSort = end - start;

  //display sorted array
  createP("Insert sorted words: " + wordsInsertSort);

  //get time needed for built-in sort
  start = performance.now();
  sort(wordsSort);
  end = performance.now();
  var millisWordSort = end - start;

  //log both times
  console.log("Insert Sort : " + millisInsertSort + "    Built-in Sort: " + millisWordSort);
  console.log("Number of words sorted: " + words.length);

}

function bubbleSort(arr){
  for(var i = 0; i < arr.length; i++){
    var hasSwapped  = false;
    for(var j = 0; j < arr.length - 1 - i ; j ++){
      if(arr[j] > arr[j+1]){
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp
        hasSwapped = true;
      }
    }
    if(!hasSwapped){
      return arr;
    }
  }
}

function insertSort(arr){
  for(var i = 0; i < arr.length; i++){
    var cur = arr[i];
    for(var j = i; j > 0 && cur < arr[j-1]; j --){
      arr[j] = arr[j-1];
    }
    arr[j] = cur;
  }
  return arr;
}


function onFileLoadError(result){
  alert("error occurred : " + result);
}


function setup(){
  createCanvas(1300, 700);
  background( 255);

}


function draw(){ //nothing in draw function since I only want to draw once in setup
}

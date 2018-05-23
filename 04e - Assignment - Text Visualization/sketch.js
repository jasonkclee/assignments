var wordCount = {}; //dictionary where key = word, value = number of occurrences in the text
var wordPositions = [];
//array of dictionaries. wordPositions splits the text into n sections; wordPositions.length = n
//each section contains a dictionary which keeps track of the number of occurrence of a word within that section
//i.e. wordPositions[1]["cat"] = number of times "cat" appears in the second section of the text
var wordConnections = {};
//dictionary of dictionaries. wordConnections["cat"] is the dictionary of word connections for the word "cat"
//wordConnections["cat"]["dog"] = weight of connection between the word "cat" and "dog"
//weight of connection = (occurrences of cat + occurrences of dog within the same section) for each section
//wordConnections["cat"]["dog"] has the same weight as wordConnections["dog"]["cat"]

var regWords = /(\b)(\w+)(\b)/g; //match words
var selectedWord = "";
var wordsToRemove = []; //list of words to remove from wordConnections after preload finishes
var pOccurrencesInText;

function preload(){
  loadStrings('data.txt', onFileLoaded, onFileLoadError );
}

/**
Callback function for loading JSON data for word definitions from wordnik.
Filters out words which are of certain parts of speech (i.e. filter out pronouns)
@param {JSON} data JSON data retrieved on the word to check
**/
function addToRemovalList(data){
  if(data.length > 0){
    var partOfSpeech = data[0].partOfSpeech;
    var word = data[0].word;
    if(partOfSpeech != undefined){
      if(partOfSpeech == "pronoun" || partOfSpeech == "preposition" || partOfSpeech.indexOf("article")!=-1
        || partOfSpeech == 'conjunction'){ //filter out certain parts of speech
        if(wordsToRemove.indexOf(word) == -1){
          wordsToRemove.push(word);
          //also add word with first letter uppercase
          var firstLetter = word[0]; //get first character of string
          firstLetter = firstLetter.toUpperCase(); //turn uppercase
          wordsToRemove.push(firstLetter + word.substring(1, word.length));
        }
      }
    }
  }
}

function onFileLoaded(data){
  var str = data.join("\n");
  var words = str.match(regWords);

  var wordPositionSize = 600; //number of words in each section of wordPositions
  for(var i = 0; i < words.length; i++){
    if(! (words[i] in wordCount)){ //create new entry if word doesnt exist in wordCount
      wordCount[words[i]] = 0;
    }
    wordCount[words[i]] += 1; //increment number of occurrences for this word

    var wordPosition = int(i / (wordPositionSize)); //get current wordPosition
    if(wordPositions[wordPosition] == undefined){
      wordPositions[wordPosition] = {}; //create dictionary for this position if its not created yet
    }
    if(!(words[i] in wordPositions[wordPosition])){
      wordPositions[wordPosition][words[i]] = 0; //create new entry if word doesn't exist in wordPositions yet
    }
    wordPositions[wordPosition][words[i]] += 1;
  }

  for(var pos = 0; pos < wordPositions.length; pos++){ //go through word positions
    for(var word in wordPositions[pos]){ //go through words in current position
      if(wordPositions[pos][word] > 3){ //if word occurs 5+ times in current position
        if(!(word in wordConnections)){
          wordConnections[word] = {}; //create new entry
        }
        for(var connectedWord in wordPositions[pos]){
          if(connectedWord != word && wordPositions[pos][connectedWord] > 3){ //go through connected words
            if(!(connectedWord in wordConnections[word])){
              wordConnections[word][connectedWord] = 0; //create new entry
            }
            //strength of connection is occurences of connectedWord + occurences of word
            wordConnections[word][connectedWord] += wordPositions[pos][connectedWord] + wordPositions[pos][word];
          }
        }
      }
    }
  }

  console.log(wordConnections);

  var apiStart = "http://api.wordnik.com:80/v4/word.json/";
  var apiKey = "api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
  var apiEnd = "/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false&";
  var nWords = 0;
  var filter = ["got", "said", "too", "up", "re", "will", "very","have", "here","not","his","could","get", "em", "is", "its","such",
  "your","wasn","s","a","so","as","are","were","there","been","went", "be", "do", "t", "d", "ll",
   "m", "our", "would", "don", "had", "her","ve", "was", "their", "so", "all", "about", "any"];
  for(var word in wordConnections){
    if( filter.indexOf(word) != -1){ //words which can't be filtered out by part of speech (i.e. these are nouns, verbs, etc)
      wordsToRemove.push(word);
      //also add word with first letter uppercase
      var firstLetter = word.substring(0, 1);
      firstLetter = firstLetter.toUpperCase();
      wordsToRemove.push(firstLetter + word.substring(1, word.length));
    }
    else{ //filter out by part of speech
      loadJSON(apiStart + word + apiEnd + apiKey, addToRemovalList);
    }
  }
}

function onFileLoadError(){
  alert("Error on loading file");
}

function setup() {
  createCanvas(1300, 700);
  background(255);
  textAlign(CENTER);
  console.log(wordsToRemove);
  pOccurrencesInText = createP("");

//remove words you dont want (i.e. pronouns)
  for(var i = 0; i < wordsToRemove.length; i++){
    var wordToRemove = wordsToRemove[i];
    for(var word in wordConnections){
      if(word == wordToRemove){
        delete wordConnections[word]; //remove the word if its in the list for removal
      }
      else{
        //give random position to word
        var border = 150;
        var x = border + random(width-border);
        var y = border + random(height-border);
        wordConnections[word]["x"] = x;
        wordConnections[word]["y"] = y;

        for(var connectedWord in wordConnections[word]){
          if(connectedWord == wordToRemove){
            delete wordConnections[word][connectedWord]; // delete connections to the wordToRemove
          }
        }
      }
    }
  }
selectedWord = Object.keys(wordConnections)[0];

  console.log(wordConnections);
}

function draw() {
  background(255);
  var r = 0;
  var g = 200;
  var b = 255;
  var count = 0;
  //draw connections first
  for(var word in wordConnections){
    count ++;
    var wordX = wordConnections[word]["x"];
    var wordY = wordConnections[word]["y"];
    var transparency = word == selectedWord ? 255 : 26; //make the selected word more noticable
    if(count % 2 == 0){ //alternate colors
      var temp = r;
      r = b;
      b = temp;
    }
    stroke(r, g, b, transparency/2); //halve the transparency since connections are drawn twice
    for(var connectedWord in wordConnections[word]){
      if(wordConnections[connectedWord]!=undefined){ //draw connections
        line(wordX, wordY, wordConnections[connectedWord]["x"], wordConnections[connectedWord]["y"]);
      }
    }
  }

  count = 0;

  //draw words ontop of connections
  for(var word in wordConnections){
    var wordX = wordConnections[word]["x"];
    var wordY = wordConnections[word]["y"];
    var transparency = word == selectedWord|| (word in wordConnections[selectedWord]) ? 255 : 50;
    if(word == selectedWord){
      transparency = 255;//make the selected word more noticable
    }
    else if(word in wordConnections[selectedWord]){
      transparency = 100; //connected words are also noticable
    }
    else{
      transparency = 30; //make words transparent if not the selectedWord and is not connected to selectedWord
    }
    strokeWeight(1);
    if(count % 2 == 0){ //alternate colors
      var temp = r;
      r = b;
      b = temp;
    }
    stroke(r, g, b, transparency);
    fill(r, g, b, transparency);
    var diameter = wordCount[word];
    ellipse(wordX, wordY, diameter, diameter);
    fill(0, transparency);
    noStroke();
    text(word, wordX, wordY);
    count ++;
  }
}

function mousePressed(){
  var minDist = 999999;
  for(var word in wordConnections){
    var dx = wordConnections[word]["x"] - mouseX;
    var dy = wordConnections[word]["y"] - mouseY;
    var dist = sqrt(dx * dx + dy * dy);
    //if distance is smaller than minDist and smaller than radius of circle + small # so its easier to click
    if(dist < minDist && dist < wordCount[word]/2 + 7){
      minDist = dist;
      selectedWord = word;
    }
  }
  pOccurrencesInText.html("occurrences of '" + selectedWord + "': " + wordCount[selectedWord]);
}

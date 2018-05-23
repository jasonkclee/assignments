var words = ["dog", "door", "student", "truck", "plane", "building", "turtle", "chair", "desk", "pen"];
var definitions = {};
var phrases = {};
var relatedWords = {};

function preload(){
  var apiStart = "http://api.wordnik.com:80/v4/word.json/";
  var apiKey = "api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
  for(var i = 0 ; i < words.length; i++){
    var word = words[i];
    var apiEnd = "/definitions?limit=5&includeRelated=true&useCanonical=false&includeTags=false&";
    definitions[word] = loadJSON(apiStart + word + apiEnd + apiKey);

    apiEnd =  "/phrases?limit=5&wlmi=0&useCanonical=false&includeTags=false&";
    phrases[word] = loadJSON(apiStart + word + apiEnd + apiKey);

    apiEnd = "/relatedWords?useCanonical=false&limitPerRelationshipType=10&";
    relatedWords[word] = loadJSON(apiStart + word + apiEnd + apiKey);

  }

}


function setup() {
  noCanvas();
  var tab = "&nbsp;&nbsp;&nbsp;&nbsp;";
  for(var i  = 0; i < words.length; i++){ //go through all words
    var word = words[i];
    createP('<br/>"' + word + '"'); //newline between words
    var lettersUsed = [];
    for(var j = 0; j < word.length; j++){
      var letter = word.charAt(j); //get character from string
      if(lettersUsed.indexOf(letter)==-1){
        lettersUsed.push(letter);
      }
    }
    createP("Unique letters : " + lettersUsed.join(",")); //turn characters back to string

    createP(tab +tab + "Definitions : ");
    var definition = definitions[word];
    for(var key in definition){
      createP(tab +definition[key].text); //create paragraphs for definitions
    }

    createP(tab +tab +"Phrases : ");
    var phrase = phrases[word];
    for(var key in phrase){
      createP(tab +phrase[key].gram1 + " " + phrase[key].gram2); //put both "gram"'s together
    }

    createP(tab +tab +"Related Words : ");
    var related = relatedWords[word];
    for(var key in related){
      var data = related[key];
      var string = tab +data.relationshipType + " : "; //state relationshipType before listing words
      for(var j = 0; j < data.words.length; j++){
        string += data.words[j] + ", ";
      }
      string = string.substring(0, string.length -2);
      createP(string);
    }
  }
}


function draw() {

}

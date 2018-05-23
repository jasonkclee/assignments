
var ritaString;
var ritaPos;
var textArray;
function preload(){
  textArray = loadStrings('rhesus.txt', onFileLoaded, onFileLoadError );
}

/**
  Callback function for when file 'rhesus.txt' is loaded.
**/
function onFileLoaded(){
  var str = textArray.join("\n");
  ritaString = RiString(str);
  console.log(ritaString);
  ritaPos = ritaString.pos();
}


function onFileLoadError(result){
  alert("error occurred : " + result);
}


function setup(){
  noCanvas();
  //output number of:
  var nSingularNouns = 0;
  var nPronouns = 0;
  var nVerbs = 0;
  for(var i = 0; i < ritaPos.length; i++){
    var tag = ritaPos[i];
    if(tag == "nn" || tag == "nnp"){
      nSingularNouns ++;
    }
    if(tag=="prp" || tag == "prp$" || tag == "wp" || tag == "wp$"){
      nPronouns ++;
    }
    if(tag.indexOf("vb")!=-1){
      nVerbs ++;
    }
  }
  createP("Singular nouns: " + nSingularNouns + "  Pronouns:" + nPronouns + "   Verbs:" +nVerbs);
  //console.log(nSingularNouns + " " + nPronouns + " " +nVerbs);
}


function draw(){ //nothing in draw function since I only want to draw once in setup
}

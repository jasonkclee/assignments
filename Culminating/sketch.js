
var started = false;  //set to true once the start button is clicked and a file has been selected
var nav; //File navigator to help read text file
var curIndex = 0; //current index in the text file
var nObjectsObserved = 0; //number of objects that have been observed/displayed
var count = 0;
var pNGalaxiesStars, btnNGalaxiesStars; //html controls for updating the text showing number of galaxies/stars obeserved
var arrGalaxiesStars = []; //array holding 1 or 0, 1 = galaxy, 0 = star
var arrRadi = [] //array holding all radi of observed objects
var pMaxRadi, btnMaxRadi;

/**Callback for when the start button is clicked.**/
function onBtnStartClick(){
  if ( $('#file-select')[0].files.length == 0 || $('#file-select')[0].files[0] == null) { //check if file is chosen
        alert('Choose a file!');
        return null;
    }
    var myFile = $('#file-select')[0].files[0];
    alert("File found");
    started = true;
    nav = new FileNavigator(myFile); //create new FileNavigator with the file
}

/**
Callback for when btnNGalaxiesStars is clicked
**/
function onBtnNGalaxiesStarsClick(){
  insertSort(arrGalaxiesStars);//sort in ascending order
  var index = linearSearch(arrGalaxiesStars, 1);//search for first occurrence of a galaxy
  var nStars = 0;
  var nGalaxies = 0;
  if(index == -1){ //no galaxies => nStars = arrGalaxiesStars.length
    nStars = arrGalaxiesStars.length;
  }
  else{
    nStars = index;
    nGalaxies = arrGalaxiesStars.length - nStars;
  }
  //update text
  pNGalaxiesStars.html("Stars: " + nStars + "   Galaxies: " + nGalaxies);
}

function onBtnMaxRadiClick(){
  insertSort(arrRadi); //sort maxRadi
  var maxRadius = arrRadi[arrRadi.length-1]; //lsat element is largest
  pMaxRadi.html("Largest stellar radius observed: " + maxRadius); //update text
}
function setup() {
  frameRate(10);
  createCanvas(window.innerWidth-50, window.innerHeight-100); //Use most of window size
  background(0);
  pNGalaxiesStars = createP("Stars: 0    Galaxies: 0");
  btnNGalaxiesStars = createButton("Get number of galaxies and stars");
  btnNGalaxiesStars.mousePressed(onBtnNGalaxiesStarsClick);

  pMaxRadi = createP("Largest stellar radius observed: 0");
  btnMaxRadi = createButton("Get max radius observed");
  btnMaxRadi.mousePressed(onBtnMaxRadiClick);
}

var prevX, prevY;

//columns for the kic.txt table of data
var sColumns = "kic_ra|kic_dec|kic_pmra|kic_pmdec|kic_umag|kic_gmag|kic_rmag|kic_imag|kic_zmag|kic_gredmag|kic_d51mag|kic_jmag|kic_hmag|kic_kmag|kic_kepmag|kic_kepler_id|kic_tmid|kic_scpid|kic_altid|kic_altsource|kic_galaxy|kic_blend|kic_variable|kic_teff|kic_logg|kic_feh|kic_ebminusv|kic_av|kic_radius|kic_cq|kic_pq|kic_aq|kic_catkey|kic_scpkey|kic_parallax|kic_glon|kic_glat|kic_pmtotal|kic_grcolor|kic_jkcolor|kic_gkcolor|kic_degree_ra|kic_fov_flag|kic_tm_designation";
var arrColumns = sColumns.split("|");

function draw() {
  background(0, 7);
  if(started && count < 2100){

    //read a single line at a time from the file
    nav.readLines(curIndex, 1,  function linesReadHandler(err, index, lines, eof, progress){ //callback for when the FileNavigator has read the line
      if (err) {
        console.log("error occurred in nav readLines");
      }
      //var row = new KeplerRow(lines[0]); //get the KeplerRow from the line of text
      var row = new KeplerRow(arrColumns);
      row.recursiveSetData(0, lines[0].split("|"));

      arrGalaxiesStars.push(row.isGalaxy()? 1 : 0); //add to list of galaxies/stars
      arrRadi.push(row.getRadius());

      ellipseMode(CENTER);
      fill(255);

      var x = cos(radians(row.getLongitude())) * width/2 + width/2;
      var y = sin (radians(row.getLatitude())) * height/2 + height/2;

      if(count ==0){
        prevX = x;
        prevY = y;
      }
      if(abs(x - prevX) + abs(y - prevY) > 10){ //only draw line if they are far apart enough
        stroke(0, 60, 255, 100);
        strokeWeight(1);
        line(x, y, prevX, prevY);
      }
      prevX = x;
      prevY = y;

      var radius = max(row.getRadius() * 5, 5); //draw the object
      noStroke();
      fill(row.getColor(150));
      ellipse(x, y, radius, radius);
      curIndex += lines[0].length; //update the index
      nObjectsObserved ++; //increment number of objects observed
    });
    count ++;
  }

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

/**
Sorts values in array in ascending order
**/
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

console.log(insertSort([4, 3, 2, 8, 1, 4]));

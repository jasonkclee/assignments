/**
*@class This object holds data from the Kepler data file.
@constructor
@param {array} arrColumns The array of columns for this row. The order of these columns must match the order of the data sent through recursiveSetData
**/
//function KeplerRow(txtRow){
function KeplerRow(arrColumns){
  this.data = {}; //hold data as a dictionary
  this.arrColumns = arrColumns; //set the columns of the row

/**
Recursively sets the data of the row when given a starting index and array of data
@param {number} index Starting index/column number to start putting data in
@param {array} arrData Array of strings containing the data for the columns
**/
  this.recursiveSetData = function(index, arrData){
    if(index >= this.arrColumns.length){
      return;
    }
    if(this.arrColumns[index]!= "kic_2mass_id" && this.arrColumns[index]!= "kic_cq"){ //check if the current column is one that contains strings
      var value = arrData[index] == ""? 0 : parseFloat(arrData[index]); //if not, parse the value as a float
      this.data[this.arrColumns[index]] = value;
    }
    else{
      //otherwise, set the value as is
      this.data[this.arrColumns[index]] = arrData[index];
    }
    this.recursiveSetData(index+1, arrData); //increment the index
  }

  /*Useful columns:
  kic_radius: Estimated Stellar Radius (solar = 1.0) range: 0.097 to 316.303
  kic_teff: Derived Effective Temperature  range: 3103 to 19337 degrees K
  kic_galaxy: Star/galaxy indicator   range:	1 - galaxy, 0 - star
  kic_glon: Galactic longitude range: 2.85 to 348.8598 degrees
  kic_glat: Galactic latitude  range: -58.363 to 79.231 degrees
  kic_kepmag: Kepler magnitude (bright/intensity) range: 2.982 to 25.0
  */

  /**
  Returns stellar radius of object. Range: 0.097 to 316.303
  **/
  this.getRadius = function(){
    return this.data["kic_radius"];
  }

  /**Returns if this object is a galaxy or not**/
  this.isGalaxy =function(){
    return this.data["kic_galaxy"] == 1;
  }

  /**Returns the galactic longitude. Range: 2.85 to 348.8598 degrees**/
  this.getLongitude = function(){
    return this.data["kic_glon"];
  }

  /**Returns the galactic latitude. Range: -58.363 to 79.231 degrees**/
  this.getLatitude = function(){
    return this.data["kic_glat"];
  }

/**
Returns normalized intensity(brightness) based on min/max values in the dataset
**/
  this.getIntensity = function(){
    return (this.data["kic_kepmag"] - 2.982) / (25 - 2.982);
  }

  /**
  Returns a color based min/max values in the dataset on columns:
  kic_umag  range: 8.391 to 21.146
  kic_gmag range: 2.872 to 25.4
  kic_rmag	range: 2.895 to 25.114
  **/
  this.getColor = function(transparency){
    var r = (this.data["kic_rmag"] -2.895) / (25.114 - 2.895) * 255;
    var g = (this.data["kic_gmag"] -2.872) / (25.4 - 2.872) * 255;
    var b = (this.data["kic_umag"] -8.391) / (21.146 - 8.391) * 255;
    return color(r, g, b, transparency);
  }
}

#External documentation

#KeplerRow

This object is used to help you organize the information from a line of text from the kic.txt file. This object represents the data held in a single row from the kic.txt file.


###Constructor

Requires a string array of column names used in the row. The order of the columns must match the order of the data sent through recursiveSetData().


###Fields

_arrColumns_: An array of strings holding the names of the columns.

_data_: An object/dictionary where the key is a string (name of column) and the value returned is a string or float (data in the column)


###Functions

_recursiveSetData(index, arrData)_: Recursively sets the given data to the KeplerRow data dictionary starting from the given index.

These other functions returns data from the KeplerRow so you don't have to access it through the "data" dictionary with cumbersome column names. More detailed documentation is on the KeplerRow.js file:

_getRadius(), isGalaxy(), getLatitude(), getLongitude(), getIntensity(), getColor(transparency)_


#FileNavigator

This was created by Anton Purin, 2015 MIT https://github.com/anpur/client-line-navigator. This object allows you to read files from the client/browser (i.e. kic.txt is too large to hold on github so you have to upload the file from the computer to the browser). This is used to lazily read the large kic.txt file (i.e. you only load a couple of lines at a time so that the program doesn't hang for too long).

This program mainly utilizes FileNavigator's readLines() function, which allows the lazy reading of a specified number of lines from a text file. If I had used p5's builtin loadStrings, the program would have attempted to load the entire file at once, resulting in a hanging program. More detailed documentation for FileNavigator is available in the link above.

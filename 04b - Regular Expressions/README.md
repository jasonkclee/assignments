# Explanation
This program counts the number of italicized words, 2/3/4 digit numbers in the file rhesus.txt. The program reads the file into a single string variable and then searches for 2/3/4 digit numbers by using regex.
To find the number of italicized words, the program uses a regex expression which searches for anything that is contained between two underscores. The array of matches is then looped through, matching the strings with a regex that searches for words, summing up to get the total number of italicized words.

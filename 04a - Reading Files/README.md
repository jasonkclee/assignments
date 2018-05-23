# Explanation
This program creates a spiral of words with a background that transitions from one color to another.
The words in the spiral are taken from the first word of each sentence in the text file 'rhesus.txt'. The words were then sorted by their lengths, with the shortest length words appearing first. The words in the spiral are placed by gradually increasing the angle of rotation and using sin/cos to determine position. The radius of the spiral and text size gradually increased as the words spiral outwards.
The transitioning background was made by drawing rectangles across the screen that gradually changed in color using the lerpColor(c1, c2) function.

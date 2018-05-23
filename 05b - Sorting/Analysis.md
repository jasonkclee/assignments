#Analysis

The following times were outputted through the console:

Sorting numbers (264 numbers in the array):
Bubble Sort : 0.9449999999999932    Built-in Sort: 0.3299999999999841

Sorting words (16025 words in the array):
Insert Sort : 1574.1650000000002    Built-in Sort: 15.49499999999989

For sorting numbers, the built-in sort was about 3 times faster than the implemented bubble sort.
For sorting words, the built-in sort was about 100 times faster than the implemented insert sort.
It is clear that the built-in sort is more efficient than the implemented sort functions:
Bubble sort and insertion sort are both O(n^2); compared to the implemented sort which is supposedly O(nlog(n)), the difference in
efficiency clearly increases as the number of items sorted increases (i.e. 3 times faster vs. 100 times faster). 

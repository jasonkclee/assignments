#Analysis
_Linear search - Worst case scenario_
- Occurs when target is the last item in the array
- Will take "n" time

_Binary search - Typical basis_
- When the target is not at the ends of the array (i.e. somewhere in the middle)
- Will take less than base 2 log(n) time

- Worst case occurs when the target is the first or last item in the array
- Will take base 2 log(n) time 

_sort() + binarySearch() vs. linearSearch()_
- If the array does not change very often, binary search is better (you won't have to sort the array as often, binary search is faster)
- If the array constantly changes, linear search is better (for binary search, constantly sorting becomes more expensive)

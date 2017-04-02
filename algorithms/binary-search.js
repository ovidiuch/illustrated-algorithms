let binary_search = (arr, item) => { // Sorted array
  let start = 0;
  let end = arr.length - 1;

  while (end >= start) {
    let i = ((end - start) >> 1) + start; // Right shift the bit and get the item from array 
    if (arr[i] === item) { return i; } // Return the position

    if (arr[i] < item) { start = i + 1; } // Right half
    else { end = i - 1; } // Left half
  }

  return null;
};

export default binary_search;

export default function quicksort(list) {
  if (list.length < 2) {
    return list;
  }

  const pivot = list[0]; // TODO: random
  const less = list.filter(i => i < pivot);
  const greater = list.filter(i => i > pivot);

  return [...quicksort(less), pivot, ...quicksort(greater)];
}

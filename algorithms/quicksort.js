function random(list) {
  return list[Math.round(Math.random() * (list.length - 1))];
}

export default function quicksort(list) {
  if (list.length < 2) {
    return list;
  }

  const pivot = random(list);
  const less = list.filter(i => i < pivot);
  const greater = list.filter(i => i > pivot);

  return [
    ...quicksort(less),
    pivot,
    ...quicksort(greater)
  ];
}

function isSeller(name) {
  return name.split('').pop() === 'm';
}

export default function bfs(graph, name) {
  const queue = [...graph[name]];
  const searched = new Set();

  while (queue.length > 0) {
    const person = queue.shift();

    if (!searched.has(person)) {
      if (isSeller(person)) {
        return person;
      }

      queue.push(...graph[person]);
      searched.add(person);
    }
  }

  return false;
}

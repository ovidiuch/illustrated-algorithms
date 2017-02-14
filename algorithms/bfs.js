function isSeller(name) {
  return name.split('').pop() === 'm';
}

export default function bfs(graph, name) {
  const queue = [...graph[name]];
  const searched = [];

  while (queue.length > 0) {
    const person = queue.shift();

    if (!searched.includes(person)) {
      if (isSeller(person)) {
        return person;
      }

      queue.push(...graph[person]);
      searched.push(person);
    }
  }

  return false;
}

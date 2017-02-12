export const retrieveFromCache = (cache, ...fields) => {
  let index = 0;
  let node = cache;

  while (node && index < fields.length) {
    node = node.get(fields[index++]);
  }

  return node;
};

export const addToCache = (cache, value, ...fields) => {
  let index = 0;
  let node = cache;

  while (index < fields.length - 1) {
    const field = fields[index];
    let childNode = node.get(field);

    if (!childNode) {
      childNode = new Map();
      node.set(field, childNode);
    }

    node = childNode;
    index++;
  }

  node.set(fields[index], value);
};

export const transitionValues = (prev, next, progress) => {
  const curr = {};
  const uniqueKeys = new Set(Object.keys(next).concat(Object.keys(prev)));

  uniqueKeys.forEach(key => {
    const nextHasIt = next[key] !== undefined;
    const prevHasIt = prev[key] !== undefined;
    if (nextHasIt && prevHasIt) {
      curr[key] = prev[key] + (progress * (next[key] - prev[key]));
    } else if (nextHasIt) {
      curr[key] = next[key];
    } else {
      curr[key] = prev[key];
    }
  });

  return curr;
};

export const getBindingValue = (prevStep, nextStep, key) => {
  if (nextStep.bindings[key] !== undefined) {
    return nextStep.bindings[key];
  }

  if (prevStep !== undefined) {
    return prevStep.bindings[key];
  }

  return undefined;
};

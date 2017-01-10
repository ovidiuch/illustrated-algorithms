export const transitionValue = (prev, next, progress) => {
  const nextHasIt = next !== undefined;
  const prevHasIt = prev !== undefined;
  if (nextHasIt && prevHasIt) {
    return prev + (progress * (next - prev));
  }

  return nextHasIt ? next : prev;
};

export const transitionValues = (prev, next, progress) => {
  const curr = {};
  const uniqueKeys = new Set(Object.keys(next).concat(Object.keys(prev)));

  uniqueKeys.forEach(key => {
    curr[key] = transitionValue(prev[key], next[key], progress);
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

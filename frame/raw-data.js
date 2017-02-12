import computeBaseFrame from '../frame/base';

export default (layout, stack, stepProgress) => {
  const baseFrame = computeBaseFrame(layout, stack, stepProgress);
  const entries = stack.entries.map(({ prevStep, nextStep }, i) => {
    return {
      ...baseFrame.entries[i],
      isFirstStep: prevStep.intro
    };
  });

  return {
    ...baseFrame,
    entries,
  };
};

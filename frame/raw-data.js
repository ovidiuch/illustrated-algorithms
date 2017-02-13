import computeBaseFrame from '../frame/base';

export default (layout, stack, stepProgress) => {
  const baseFrame = computeBaseFrame(layout, stack, stepProgress);
  const entries = stack.entries.map(({ prevStep, nextStep }, i) => {
    const baseEntry = baseFrame.entries[i];
    return {
      ...baseEntry,
      frame: {
        ...baseEntry.frame,
        isFirstStep: prevStep.intro
      }
    };
  });

  return {
    ...baseFrame,
    entries,
  };
};

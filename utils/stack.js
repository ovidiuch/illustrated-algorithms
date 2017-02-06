export default (steps, index) => {
  const { length } = steps;

  if (length === 0) {
    return {
      entries: []
    };
  }

  if (length === 1) {
    return {
      entries: [{
        prevStep: steps[0],
        nextStep: steps[0],
      }]
    };
  }

  const entries = [];
  const prevStep = steps[index];
  const nextStep = index < length - 1 ? steps[index + 1] : steps[index];
  let parentStepId = prevStep.parentStepId;
  let isAddingToStack = false;
  let isRemovingFromStack = false;

  if (parentStepId === nextStep.parentStepId) {
    entries.push({
      prevStep,
      nextStep,
    });
  } else if (nextStep.parentStepId === index) {
    entries.push({
      prevStep: nextStep,
      nextStep,
    }, {
      prevStep,
      nextStep: prevStep
    });

    parentStepId = prevStep.parentStepId;
    isAddingToStack = true;
  } else if (nextStep.parentStepId === steps[parentStepId].parentStepId) {
    entries.push({
      prevStep,
      nextStep: prevStep
    }, {
      prevStep: steps[parentStepId],
      nextStep,
    });

    parentStepId = steps[parentStepId].parentStepId;
    isRemovingFromStack = true;
  }

  while (parentStepId) {
    const lastFromParentCall = steps[parentStepId];

    entries.push({
      prevStep: lastFromParentCall,
      nextStep: lastFromParentCall,
    });

    parentStepId = lastFromParentCall.parentStepId;
  }

  return {
    entries,
    isAddingToStack,
    isRemovingFromStack,
  };
};

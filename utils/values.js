export const onlyDefined = items => items.filter(i => i !== undefined);

export const ofSameValue = (val, others) => others.filter(i => i === val).length;

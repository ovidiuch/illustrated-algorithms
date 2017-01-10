const TIMES = 2;
const MAX_ANGLE = 5;

const getWobbleRotation = stepProgress => {
  const rotation = Math.sin(Math.PI * 2 * TIMES * stepProgress) * MAX_ANGLE;
  return Math.round(rotation * 100) / 100;
};

export default getWobbleRotation;

const TIMES = 2;
const MAX_ANGLE = 5;

const getWobbleRotation = stepProgress =>
  Math.sin(Math.PI * 2 * TIMES * stepProgress) * MAX_ANGLE;

export default getWobbleRotation;

import keys from 'object-keys'
const COLOURS_STEPS = ["eye_colour", "hair_colour", "skin_colour", "investment_colours", "favourite_colours"];
const BODY_SHAPE_STEPS = ["body_proportions", "bust_and_waist", "height_and_weight", "sizes", "reveal_and_conceal"];
const PERSONALITY_STEPS = [
  "likes_change",
  "confidence",
  "dressing_up",
  "weekday_occupation",
  "age",
  "brands_probably_liked",
  "garments_step_1",
  "garments_step_2",
];

let steps = {
  COLOURS_STEPS,
  BODY_SHAPE_STEPS,
  PERSONALITY_STEPS
};

let STEPS_ARRAY = [COLOURS_STEPS, BODY_SHAPE_STEPS, PERSONALITY_STEPS, "complete"];

/**
 * returns the classname of current stage for a given step.
 * e.g. stage-body_shape 
 *
 * @name getSageNumber
 * @function
 * @param step {String}
 * @return {String}
 */
const getStepName = function(step) {

  if (!step)
    return "";
  
  let matchedStepsName = keys(steps).filter((stepName, idx, stepNameArray) => {
    let currentSteps = steps[stepName];
    let currentStepsLength = currentSteps.length;

    return currentSteps.indexOf(step) >= 0;
  });
  matchedStepsName = matchedStepsName[0] || '';
  let stepName = matchedStepsName ? ("stage-" + matchedStepsName.replace("_STEPS", "").toLowerCase()) : "";
  return stepName;
}

/**
 * returns the classname of step number for a given step.
 * e.g. step-8 
 *
 * @name getSageNumber
 * @function
 * @param step {String}
 * @return {String}
 */
const getSageNumber = function(step) {
  if (!step)
    return "";

  const ORDERED_STEPS = Array.prototype.concat.apply([], STEPS_ARRAY);
  let stepNumber = ORDERED_STEPS.indexOf(step);
  return stepNumber >= 0 ? `step-${stepNumber}` : "";
}


/**
 * given step name and return the stage name
 * and step number classes joined with single space
 * e.g. {stage Name} + ' ' + {step Number}
 *
 * @name headerClasses
 * @function
 * @param step {String}
 * @return {String}
 */
export function headerClasses (step = '') {
  if (!step)
    return "";

  let stepNumber = getSageNumber(step);
  let stageName = getStepName(step);

  return (stepNumber && stageName) ? `${stageName} ${stepNumber}` : ( stageName || stepNumber);

}

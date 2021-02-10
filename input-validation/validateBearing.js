exports.validateBearing = function validateBearing(bearing) {
  if (typeof bearing !== "number") {
    const ARGUMENT_TYPE = Array.isArray(bearing) ? "array" : typeof bearing;
    throw new Error(`ERROR! Bearing has to be a number but was: ${ARGUMENT_TYPE}`);
  }
};

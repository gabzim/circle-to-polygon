exports.validateEarthRadius = function validateEarthRadius(earthRadius) {
  if (typeof earthRadius !== "number") {
    const ARGUMENT_TYPE = Array.isArray(earthRadius) ? "array" : typeof earthRadius;
    throw new Error(`ERROR! Earth radius has to be a number but was: ${ARGUMENT_TYPE}`);
  }

  if (earthRadius <= 0) {
    throw new Error(`ERROR! Earth radius has to be a positive number but was: ${earthRadius}`);
  }
};

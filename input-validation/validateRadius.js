exports.validateRadius = function validateRadius(radius) {
  if (typeof radius !== "number") {
    throw new Error(`ERROR! Radius has to be a positive number but was: ${typeof radius}`);
  }

  if (radius <= 0) {
    throw new Error(`ERROR! Radius has to be a positive number but was: ${radius}`);
  }
};

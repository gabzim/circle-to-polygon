exports.validateNumberOfSegments = function validateNumberOfSegments(numberOfSegments) {
  if (typeof numberOfSegments !== "number") {
    const ARGUMENT_TYPE = Array.isArray(numberOfSegments) ? "array" : typeof numberOfSegments;
    throw new Error(`ERROR! Number of segments has to be a number but was: ${ARGUMENT_TYPE}`);
  }

  if (numberOfSegments < 3) {
    throw new Error(`ERROR! Number of segments has to be at least 3 but was: ${numberOfSegments}`);
  }
};

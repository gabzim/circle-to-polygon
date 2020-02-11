exports.validateNumberOfSegments = function validateNumberOfSegments(
  numberOfSegments
) {
  if (typeof numberOfSegments !== "number") {
    throw new Error(
      `ERROR! Number of segments has to be a number but was: ${typeof numberOfSegments}`
    );
  }

  if (numberOfSegments < 3) {
    throw new Error(
      `ERROR! Number of segments has to be at least 3 but was: ${numberOfSegments}`
    );
  }
};

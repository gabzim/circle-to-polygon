exports.validateNumberOfEdges = function validateNumberOfEdges(numberOfEdges) {
  if (typeof numberOfEdges !== "number") {
    const ARGUMENT_TYPE = Array.isArray(numberOfEdges) ? "array" : typeof numberOfEdges;
    throw new Error(`ERROR! Number of edges has to be a number but was: ${ARGUMENT_TYPE}`);
  }

  if (numberOfEdges < 3) {
    throw new Error(`ERROR! Number of edges has to be at least 3 but was: ${numberOfEdges}`);
  }
};

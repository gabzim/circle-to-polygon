var validateCenter = require("./validateCenter").validateCenter;
var validateRadius = require("./validateRadius").validateRadius;
var validateNumberOfEdges = require("./validateNumberOfEdges").validateNumberOfEdges;

function validateInput({ center, radius, numberOfEdges }) {
  validateCenter(center);
  validateRadius(radius);
  validateNumberOfEdges(numberOfEdges);
}

exports.validateCenter = validateCenter;
exports.validateRadius = validateRadius;
exports.validateNumberOfEdges = validateNumberOfEdges;
exports.validateInput = validateInput;

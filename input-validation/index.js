var validateCenter = require("./validateCenter").validateCenter;
var validateRadius = require("./validateRadius").validateRadius;
var validateNumberOfEdges = require("./validateNumberOfEdges").validateNumberOfEdges;
var validateEarthRadius = require("./validateEarthRadius").validateEarthRadius;

function validateInput({ center, radius, numberOfEdges, earthRadius }) {
  validateCenter(center);
  validateRadius(radius);
  validateNumberOfEdges(numberOfEdges);
  validateEarthRadius(earthRadius);
}

exports.validateCenter = validateCenter;
exports.validateRadius = validateRadius;
exports.validateNumberOfEdges = validateNumberOfEdges;
exports.validateEarthRadius = validateEarthRadius;
exports.validateInput = validateInput;

var validateCenter = require("./validateCenter").validateCenter;
var validateRadius = require("./validateRadius").validateRadius;
var validateNumberOfEdges = require("./validateNumberOfEdges").validateNumberOfEdges;
var validateEarthRadius = require("./validateEarthRadius").validateEarthRadius;
var validateBearing = require("./validateBearing").validateBearing;

function validateInput({ center, radius, numberOfEdges, earthRadius, bearing }) {
  validateCenter(center);
  validateRadius(radius);
  validateNumberOfEdges(numberOfEdges);
  validateEarthRadius(earthRadius);
  validateBearing(bearing);
}

exports.validateCenter = validateCenter;
exports.validateRadius = validateRadius;
exports.validateNumberOfEdges = validateNumberOfEdges;
exports.validateEarthRadius = validateEarthRadius;
exports.validateBearing = validateBearing;
exports.validateInput = validateInput;

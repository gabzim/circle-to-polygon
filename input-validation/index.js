var validateCenter = require("./validateCenter").validateCenter;
var validateRadius = require("./validateRadius").validateRadius;
var validateNumberOfSegments = require("./validateNumberOfSegments").validateNumberOfSegments;

function validateInput({ center, radius, numberOfSegments }) {
  validateCenter(center);
  validateRadius(radius);
  validateNumberOfSegments(numberOfSegments);
}

exports.validateCenter = validateCenter;
exports.validateRadius = validateRadius;
exports.validateNumberOfSegments = validateNumberOfSegments;
exports.validateInput = validateInput;

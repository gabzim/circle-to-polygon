"use strict";
var { validateInput } = require("./input-validation");

function toRadians(angleInDegrees) {
  return (angleInDegrees * Math.PI) / 180;
}

function toDegrees(angleInRadians) {
  return (angleInRadians * 180) / Math.PI;
}

function offset(c1, distance, bearing) {
  var lat1 = toRadians(c1[1]);
  var lon1 = toRadians(c1[0]);
  var dByR = distance / 6378137; // distance divided by 6378137 (radius of the earth) wgs84
  var lat = Math.asin(
    Math.sin(lat1) * Math.cos(dByR) + Math.cos(lat1) * Math.sin(dByR) * Math.cos(bearing)
  );
  var lon =
    lon1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(dByR) * Math.cos(lat1),
      Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat)
    );
  return [toDegrees(lon), toDegrees(lat)];
}

module.exports = function circleToPolygon(center, radius, options) {
  var n = getNumberOfSegments(options);

  // validateInput() throws error on invalid input and do nothing on valid input
  validateInput({ center, radius, numberOfSegments: n });

  var coordinates = [];
  for (var i = 0; i < n; ++i) {
    coordinates.push(offset(center, radius, (2 * Math.PI * -i) / n));
  }
  coordinates.push(coordinates[0]);

  return {
    type: "Polygon",
    coordinates: [coordinates]
  };
};

function getNumberOfSegments(options) {
  if (options === undefined) {
    return 32;
  } else if (isObjectNotArray(options)) {
    var numberOfSegments = options.numberOfSegments;
    return numberOfSegments === undefined ? 32 : numberOfSegments;
  }
  return options;
}

function isObjectNotArray(argument) {
  return typeof argument === "object" && !Array.isArray(argument);
}

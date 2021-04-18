"use strict";
var { validateInput } = require("./input-validation");

const defaultEarthRadius = 6378137; // equatorial Earth radius

function toRadians(angleInDegrees) {
  return (angleInDegrees * Math.PI) / 180;
}

function toDegrees(angleInRadians) {
  return (angleInRadians * 180) / Math.PI;
}

function offset(c1, distance, earthRadius, bearing) {
  var lat1 = toRadians(c1[1]);
  var lon1 = toRadians(c1[0]);
  var dByR = distance / earthRadius;
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
  var n = getNumberOfEdges(options);
  var earthRadius = getEarthRadius(options);
  var bearing = getBearing(options);
  var direction = getDirection(options);

  // validateInput() throws error on invalid input and do nothing on valid input
  validateInput({ center, radius, numberOfEdges: n, earthRadius, bearing });

  var start = toRadians(bearing);
  var coordinates = [];
  for (var i = 0; i < n; ++i) {
    coordinates.push(
      offset(
        center, radius, earthRadius, start + (direction * 2 * Math.PI * -i) / n
      )
    );
  }
  coordinates.push(coordinates[0]);

  return {
    type: "Polygon",
    coordinates: [coordinates]
  };
};

function getNumberOfEdges(options) {
  if (options === undefined) {
    return 32;
  } else if (isObjectNotArray(options)) {
    var numberOfEdges = options.numberOfEdges;
    return numberOfEdges === undefined ? 32 : numberOfEdges;
  }
  return options;
}

function getEarthRadius(options) {
  if (options === undefined) {
    return defaultEarthRadius;
  } else if (isObjectNotArray(options)) {
    var earthRadius = options.earthRadius;
    return earthRadius === undefined ? defaultEarthRadius : earthRadius;
  }
  return defaultEarthRadius;
}

function getDirection(options){
  if (isObjectNotArray(options) && options.rightHandRule === true){
    return -1;
  }
  return 1;
}

function getBearing(options) {
  if (options === undefined) {
    return 0;
  } else if (isObjectNotArray(options)) {
    var bearing = options.bearing;
    return bearing === undefined ? 0 : bearing;
  }
  return 0;
}

function isObjectNotArray(argument) {
  return typeof argument === "object" && !Array.isArray(argument);
}

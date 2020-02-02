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
    Math.sin(lat1) * Math.cos(dByR) +
      Math.cos(lat1) * Math.sin(dByR) * Math.cos(bearing)
  );
  var lon =
    lon1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(dByR) * Math.cos(lat1),
      Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat)
    );
  return [toDegrees(lon), toDegrees(lat)];
}

module.exports = function circleToPolygon(center, radius, numberOfSegments) {
  var n = numberOfSegments ? numberOfSegments : 32;

  var centerAsLonLat = getCenterAsLonLat(center);
  // validateInput() throws error on invalid input and do nothing on valid input
  validateInput({ center: centerAsLonLat, radius, numberOfSegments });

  var coordinates = [];
  for (var i = 0; i < n; ++i) {
    coordinates.push(offset(centerAsLonLat, radius, (2 * Math.PI * -i) / n));
  }
  coordinates.push(coordinates[0]);

  return {
    type: "Polygon",
    coordinates: [coordinates]
  };
};

function getCenterAsLonLat(center) {
  function objHasProp(obj, prop) {
    // .hasOwnProperty is not a protected method name
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  if (Array.isArray(center)) {
    return center;
  }

  var lat;
  if (objHasProp(center, "lat")) {
    lat = center.lat;
  } else {
    lat = center.latitude;
  }

  var lon;
  if (objHasProp(center, "lon")) {
    lon = center.lon;
  } else if (objHasProp(center, "lng")) {
    lon = center.lng;
  } else {
    lon = center.longitude;
  }

  return [lon, lat];
}

"use strict";
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

function validateCenter(center) {
  const validCenterLengths = [2, 3]
  if (!Array.isArray(center) || !validCenterLengths.includes(center.length)) {
    throw new Error("ERROR! Center has to be an array of length two or three");
  }
  const [lng, lat] = center;
  if (typeof lng !== "number" || typeof lat !== "number") {
    throw new Error(
      `ERROR! Longitude and Latitude has to be numbers but where ${typeof lng} and ${typeof lat}`
    );
  }
  if (lng > 180 || lng < -180) {
    throw new Error(
      `ERROR! Longitude has to be between -180 and 180 but was ${lng}`
    );
  }

  if (lat > 90 || lat < -90) {
    throw new Error(
      `ERROR! Latitude has to be between -90 and 90 but was ${lat}`
    );
  }
}

function validateRadius(radius) {
  if (typeof radius !== "number") {
    throw new Error(
      `ERROR! Radius has to be a positive number but was: ${typeof radius}`
    );
  }

  if (radius <= 0) {
    throw new Error(
      `ERROR! Radius has to be a positive number but was: ${radius}`
    );
  }
}

function validateNumberOfSegments(numberOfSegments) {
  if (typeof numberOfSegments !== "number" && numberOfSegments !== undefined) {
    throw new Error(
      `ERROR! Number of segments has to be a number but was: ${typeof numberOfSegments}`
    );
  }

  if (numberOfSegments < 3) {
    throw new Error(
      `ERROR! Number of segments has to be at least 3 but was: ${numberOfSegments}`
    );
  }
}

function validateInput({ center, radius, numberOfSegments }) {
  validateCenter(center);
  validateRadius(radius);
  validateNumberOfSegments(numberOfSegments);
}

module.exports = function circleToPolygon(center, radius, numberOfSegments) {
  var n = numberOfSegments ? numberOfSegments : 32;

  // validateInput() throws error on invalid input and do nothing on valid input
  validateInput({ center, radius, numberOfSegments });

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

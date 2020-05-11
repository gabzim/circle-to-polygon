exports.validateCenter = function validateCenter(center) {
  var validCenterLengths = [2, 3];
  if (!Array.isArray(center) || !validCenterLengths.includes(center.length)) {
    throw new Error("ERROR! Center has to be an array of length two or three");
  }

  var [lng, lat] = center;
  if (typeof lng !== "number" || typeof lat !== "number") {
    throw new Error(
      `ERROR! Longitude and Latitude has to be numbers but where ${typeof lng} and ${typeof lat}`
    );
  }
  if (lng > 180 || lng < -180) {
    throw new Error(`ERROR! Longitude has to be between -180 and 180 but was ${lng}`);
  }

  if (lat > 90 || lat < -90) {
    throw new Error(`ERROR! Latitude has to be between -90 and 90 but was ${lat}`);
  }
};

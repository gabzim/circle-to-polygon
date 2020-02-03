exports.centerKeyValidation = function centerKeyValidation(center) {
  if (
    !(hasLngAndLatKey(center) ||
    hasLonAndLatKey(center) ||
    hasLongitudeAndLatitudeKey(center))
  ) {
    throw new Error(
      "ERROR! center argument have to have key-pair 'lat & log' or 'lat & lng' or 'latitude & longitude' IF passed as an object"
    );
  }
};

function hasLongitudeAndLatitudeKey(obj) {
  return objHasProp(obj, "longitude") && objHasProp(obj, "latitude");
}

function hasLngAndLatKey(obj) {
  return objHasProp(obj, "lat") && objHasProp(obj, "lng");
}

function hasLonAndLatKey(obj) {
  return objHasProp(obj, "lat") && objHasProp(obj, "lon");
}

function objHasProp(obj, prop) {
  // .hasOwnProperty is not a protected method name
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

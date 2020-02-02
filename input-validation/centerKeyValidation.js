exports.centerKeyValidation = function centerKeyValidation(center) {
  if (objHasProp(center, "lat") && !hasLonOrLngKey(center)) {
    throw new Error(
      "ERROR! Longitude has to be passed with key 'lon' or 'lng' when latiude is passed with key 'lat'"
    );
  }

  if (hasLonOrLngKey(center) && !objHasProp(center, "lat")) {
    throw new Error(
      "ERROR! Latitude has to be passed with key 'lat' when longitude is passed with key 'lon' or 'lng'"
    );
  }
};

function hasLonOrLngKey(obj) {
  return objHasProp(obj, "lon") || objHasProp(obj, "lng");
}

function objHasProp(obj, prop) {
  // .hasOwnProperty is not a protected method name
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

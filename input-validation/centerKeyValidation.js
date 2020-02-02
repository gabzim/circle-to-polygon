exports.centerKeyValidation = function centerKeyValidation(center) {
  function objHasProp(obj, prop) {
    // .hasOwnProperty is not a protected method name
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  if (
    objHasProp(center, "lat") &&
    !(objHasProp(center, "lon") || objHasProp(center, "lng"))
  ) {
    throw new Error(
      "ERROR! Longitude has to be passed with key 'lon' or 'lng' when latiude is passed with key 'lat'"
    );
  }

  if (objHasProp(center, "lon") && !objHasProp(center, "lat")) {
    throw new Error(
      "ERROR! Latitude has to be passed with key 'lat' when longitude is passed with key 'lon' or 'lng'"
    );
  }
};

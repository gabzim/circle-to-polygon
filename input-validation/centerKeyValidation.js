
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
};

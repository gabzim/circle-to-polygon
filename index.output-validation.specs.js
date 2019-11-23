const { expect } = require("chai");
const circleToPolygon = require("./index.js");

describe("Output verification", () => {
  describe("Polygon should have correct attributes", () => {
    let result;

    beforeEach(() => {
      result = circleToPolygon([16.226412, 58.556493], 138, 3);
    });

    it("should have atribute 'type' with value 'Polygon'", () => {
      expect(result).to.haveOwnProperty("type", "Polygon");
    });

    it("should have atribute 'coordinates' of type 'array'", () => {
      expect(result).to.haveOwnProperty("coordinates");
      expect(result.coordinates).to.be.an("array");
    });

    it("coordinates should be an 'array of arrays' of '2d-points'", () => {
      expect(result.coordinates[0]).to.be.an("array");
      result.coordinates[0].forEach(coordinate => {
        expect(coordinate).to.be.an("array");

        // 2d-point?
        expect(coordinate.length).to.equal(2);
        coordinate.forEach(value => {
          expect(value).to.be.a("number");
        });
      });
    });
  });
});

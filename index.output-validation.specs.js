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

    it("coordinates should be an 'array of an array of arrays' of '2d-points'", () => {
      expect(result.coordinates[0]).to.be.an("array");
      expect(result.coordinates.length).to.equal(1);

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

  describe("Polygon should have valid coordinates", () => {
    /*
      Not all engins get the same value, so we use rounded values.
      6 decimal points is about 11 cm (true for both lat/lng and 
      geoJSON coordinates).
    */
    describe("Testing trivial points", () => {
      it("should give correct coordinates for trivial point 1", () => {
        const coordinates = circleToPolygon([16.226412, 58.556493], 138, 3)
          .coordinates[0];

        const expectedCoordinates = [
          [16.226412, 58.557732],
          [16.224354, 58.555873],
          [16.228469, 58.555873],
          [16.226412, 58.557732]
        ];

        coordinates.forEach((cord, cordIndex) => {
          cord.forEach((value, valueIndex) => {
            const expectedValue = expectedCoordinates[cordIndex][valueIndex];
            expect(value).to.be.closeTo(expectedValue, 0.00001);
          });
        });
      });
      it("should give correct coordinates for trivial point 2", () => {
        const coordinates = circleToPolygon([18.08311, 59.293594], 5000, 32)
          .coordinates[0];

        const expectedCoordinates = [
          [18.083109, 59.338509],
          [18.065927, 59.337645],
          [18.049408, 59.335086],
          [18.034188, 59.33093],
          [18.020854, 59.325339],
          [18.00992, 59.318527],
          [18.001804, 59.310757],
          [17.996818, 59.302328],
          [17.99515, 59.293564],
          [17.996862, 59.284802],
          [18.001886, 59.27638],
          [18.010027, 59.268619],
          [18.02097, 59.261818],
          [18.034295, 59.256238],
          [18.04949, 59.252092],
          [18.065972, 59.24954],
          [18.083109, 59.248678],
          [18.100247, 59.24954],
          [18.116729, 59.252092],
          [18.131924, 59.256238],
          [18.145249, 59.261818],
          [18.156192, 59.268619],
          [18.164333, 59.27638],
          [18.169357, 59.284802],
          [18.171069, 59.293564],
          [18.169401, 59.302328],
          [18.164415, 59.310757],
          [18.156299, 59.318527],
          [18.145365, 59.325339],
          [18.132031, 59.33093],
          [18.116811, 59.335086],
          [18.100292, 59.337645],
          [18.083109, 59.338509]
        ];

        coordinates.forEach((cord, cordIndex) => {
          cord.forEach((value, valueIndex) => {
            const expectedValue = expectedCoordinates[cordIndex][valueIndex];
            expect(value).to.be.closeTo(expectedValue, 0.00001);
          });
        });
      });
    });

    describe("Testing non-trivial points", () => {
      xit("should return corret circle for center in lat -90", () => {});
      xit("should return corret circle for center in lat 90 ", () => {});
      xit("should return corret circle for center in lng 180 ", () => {});
      xit("should return corret circle for center in lng -180 ", () => {});
      xit("should return corret circle for center in lat 90 lng 180 ", () => {});
      xit("should return corret circle for center in lat 90 lng -180 ", () => {});
      xit("should return corret circle for center in lat -90 lng 180 ", () => {});
      xit("should return corret circle for center in lat -90 lng -180 ", () => {});
    });

    describe("Testing circles crossing the International Date Line", () => {
      xit("center on one side", () => {});
      xit("center the other side", () => {});
    });

    describe("Testing circles crossing the north pole", () => {
      xit("test 1", () => {});
      xit("test 2", () => {});
    });

    describe("Testing circles crossing the south pole", () => {
      xit("test 1", () => {});
      xit("test 2", () => {});
    });
  });
});

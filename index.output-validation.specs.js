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
      it("should give correct coordinates for point east of GMT, north of equator", () => {
        const coordinates = circleToPolygon([16.226412, 58.556493], 138, 10)
          .coordinates[0];

        const expectedCoordinates = [
          [16.226412, 58.557732],
          [16.225015, 58.557495],
          [16.224151, 58.556876],
          [16.224151, 58.556109],
          [16.225015, 58.55549],
          [16.226412, 58.555253],
          [16.227808, 58.55549],
          [16.228672, 58.556109],
          [16.228672, 58.556876],
          [16.227808, 58.557495],
          [16.226412, 58.557732]
        ];

        coordinates.forEach((cord, cordIndex) => {
          cord.forEach((value, valueIndex) => {
            const expectedValue = expectedCoordinates[cordIndex][valueIndex];
            expect(value).to.be.closeTo(expectedValue, 0.00001);
          });
        });
      });

      it("should give correct coordinates for center in [0, 0]", () => {
        const coordinates = circleToPolygon([0, 0], 13, 12).coordinates[0];

        const expectedCoordinates = [
          [0, 0.000116],
          [-0.000058, 0.000101],
          [-0.000101, 0.000058],
          [-0.000116, -2.145231e-20],
          [-0.000101, -0.000058],
          [-0.000058, -0.000101],
          [1.430154e-20, -0.000116],
          [0.000058, -0.000101],
          [0.000101, -0.000058],
          [0.000116, 7.150773e-21],
          [0.000101, 0.000058],
          [0.000058, 0.000101],
          [0, 0.000116]
        ];

        coordinates.forEach((cord, cordIndex) => {
          cord.forEach((value, valueIndex) => {
            const expectedValue = expectedCoordinates[cordIndex][valueIndex];
            expect(value).to.be.closeTo(expectedValue, 0.00001);
          });
        });
      });

      it("should give correct coordinates for point east of GMT, south of equator", () => {
        const coordinates = circleToPolygon([131.034184, -25.343467], 5000, 32)
          .coordinates[0];

        const expectedCoordinates = [
          [131.034184, -25.298551],
          [131.024491, -25.299413],
          [131.015171, -25.301969],
          [131.006581, -25.306118],
          [130.99905, -25.311702],
          [130.992869, -25.318507],
          [130.988274, -25.326271],
          [130.985443, -25.334696],
          [130.984485, -25.343458],
          [130.985436, -25.352221],
          [130.988261, -25.360648],
          [130.992852, -25.368415],
          [130.999032, -25.375223],
          [131.006564, -25.38081],
          [131.015158, -25.384962],
          [131.024484, -25.387519],
          [131.034184, -25.388382],
          [131.043883, -25.387519],
          [131.053209, -25.384962],
          [131.061803, -25.38081],
          [131.069335, -25.375223],
          [131.075515, -25.368415],
          [131.080106, -25.360648],
          [131.082931, -25.352221],
          [131.083882, -25.343458],
          [131.082924, -25.334696],
          [131.080093, -25.326271],
          [131.075498, -25.318507],
          [131.069317, -25.311702],
          [131.061786, -25.306118],
          [131.053196, -25.301969],
          [131.043876, -25.299413],
          [131.034184, -25.298551]
        ];

        coordinates.forEach((cord, cordIndex) => {
          cord.forEach((value, valueIndex) => {
            const expectedValue = expectedCoordinates[cordIndex][valueIndex];
            expect(value).to.be.closeTo(expectedValue, 0.00001);
          });
        });
      });

      it("should give correct coordinates for point west of GMT, north of equator", () => {
        const coordinates = circleToPolygon([-121.003331, 66.001764], 50000, 64)
          .coordinates[0];

        const expectedCoordinates = [
          [-121.003331, 66.450921],
          [-121.113511, 66.44872],
          [-121.222573, 66.442137],
          [-121.329411, 66.431241],
          [-121.432946, 66.416142],
          [-121.532136, 66.396992],
          [-121.625992, 66.373985],
          [-121.713583, 66.347352],
          [-121.794052, 66.317362],
          [-121.866619, 66.284315],
          [-121.930593, 66.24854],
          [-121.985376, 66.210392],
          [-122.030471, 66.170249],
          [-122.065479, 66.128506],
          [-122.090108, 66.085572],
          [-122.104172, 66.041865],
          [-122.107589, 65.997809],
          [-122.10038, 65.953829],
          [-122.082669, 65.910347],
          [-122.054678, 65.867778],
          [-122.016723, 65.826527],
          [-121.96921, 65.786983],
          [-121.912629, 65.749519],
          [-121.847547, 65.714486],
          [-121.774605, 65.68221],
          [-121.694509, 65.652991],
          [-121.608023, 65.627101],
          [-121.515964, 65.604777],
          [-121.419191, 65.586227],
          [-121.318604, 65.571619],
          [-121.215128, 65.561089],
          [-121.109716, 65.554731],
          [-121.003331, 65.552606],
          [-120.896945, 65.554731],
          [-120.791533, 65.561089],
          [-120.688057, 65.571619],
          [-120.58747, 65.586227],
          [-120.490697, 65.604777],
          [-120.398638, 65.627101],
          [-120.312152, 65.652991],
          [-120.232056, 65.68221],
          [-120.159114, 65.714486],
          [-120.094032, 65.749519],
          [-120.037451, 65.786983],
          [-119.989938, 65.826527],
          [-119.951983, 65.867778],
          [-119.923992, 65.910347],
          [-119.906281, 65.953829],
          [-119.899072, 65.997809],
          [-119.902489, 66.041865],
          [-119.916553, 66.085572],
          [-119.941182, 66.128506],
          [-119.97619, 66.170249],
          [-120.021285, 66.210392],
          [-120.076068, 66.24854],
          [-120.140042, 66.284315],
          [-120.212609, 66.317362],
          [-120.293078, 66.347352],
          [-120.380669, 66.373985],
          [-120.474525, 66.396992],
          [-120.573715, 66.416142],
          [-120.67725, 66.431241],
          [-120.784088, 66.442137],
          [-120.89315, 66.44872],
          [-121.003331, 66.450921]
        ];

        coordinates.forEach((cord, cordIndex) => {
          cord.forEach((value, valueIndex) => {
            const expectedValue = expectedCoordinates[cordIndex][valueIndex];
            expect(value).to.be.closeTo(expectedValue, 0.00001);
          });
        });
      });

      it("should give correct coordinates for point west of GMT, south of equator", () => {
        const coordinates = circleToPolygon(
          [-75.1299566, -14.7391814],
          5000,
          12
        ).coordinates[0];

        const expectedCoordinates = [
          [-75.129956, -14.694265],
          [-75.153174, -14.700282],
          [-75.170174, -14.71672],
          [-75.1764, -14.739176],
          [-75.170182, -14.761635],
          [-75.153182, -14.778078],
          [-75.129956, -14.784097],
          [-75.10673, -14.778078],
          [-75.08973, -14.761635],
          [-75.083512, -14.739176],
          [-75.089739, -14.71672],
          [-75.106738, -14.700282],
          [-75.129956, -14.694265]
        ];

        coordinates.forEach((cord, cordIndex) => {
          cord.forEach((value, valueIndex) => {
            const expectedValue = expectedCoordinates[cordIndex][valueIndex];
            expect(value).to.be.closeTo(expectedValue, 0.00001);
          });
        });
      });

      it("should pass the pentagon test", () => {
        // A pentagon on Pentagon, Virginia
        const coordinates = circleToPolygon([-77.055961, 38.870996], 200, 5)
          .coordinates[0];

        const expectedCoordinates = [
          [-77.055961, 38.872792],
          [-77.058155, 38.871551],
          [-77.057317, 38.869542],
          [-77.054604, 38.869542],
          [-77.053766, 38.871551],
          [-77.055961, 38.872792]
        ];

        coordinates.forEach((cord, cordIndex) => {
          cord.forEach((value, valueIndex) => {
            const expectedValue = expectedCoordinates[cordIndex][valueIndex];
            expect(value).to.be.closeTo(expectedValue, 0.00001);
          });
        });
      });

      it("should accept coordinates with 'Altitude' or 'Elevation' attribute", () => {
        const coordinates = circleToPolygon([0, 0, 34], 13, 12).coordinates[0];

        const expectedCoordinates = [
          [0, 0.000116],
          [-0.000058, 0.000101],
          [-0.000101, 0.000058],
          [-0.000116, -2.145231e-20],
          [-0.000101, -0.000058],
          [-0.000058, -0.000101],
          [1.430154e-20, -0.000116],
          [0.000058, -0.000101],
          [0.000101, -0.000058],
          [0.000116, 7.150773e-21],
          [0.000101, 0.000058],
          [0.000058, 0.000101],
          [0, 0.000116]
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

    describe("Testing circles crossing the 180th Meridian", () => {
      xit("center's longitude value is close to 180", () => {});
      xit("center's longitude value is close to -180", () => {});
    });

    describe("Testing circles where the north pole is inside the circle's radius", () => {
      xit("test 1", () => {});
      xit("test 2", () => {});
    });

    describe("Testing circles where the south pole is inside the circle's radius", () => {
      xit("test 1", () => {});
      xit("test 2", () => {});
    });
  });
});

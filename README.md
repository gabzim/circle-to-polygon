# Circle To Polygon

The GeoJSON spec does not support circles. If you wish to create an area that represents a circle, your best bet is to create a polygon that roughly approximates the circle. In the limit of the number of edges becoming infinite, your Polygon will match a circle.

`circleToPolygon([173.283966, -41.270634], 20000, { numberOfEdges: 32 })` would yield the polygon below:

![Example of a polygon with 20000 meter radius, 32 edges and center in 173.283966,-41.270634 (lon,lat)](example.png "Example circle (20km radius with 32 edges)")

## Installation

`npm install --save circle-to-polygon`

or

`yarn add circle-to-polygon`

## Usage

### Example

```javascript
const circleToPolygon = require("circle-to-polygon");

const coordinates = [173.283966, -41.270634]; //[lon, lat]
const radius = 200000; // in meters
const options = { numberOfEdges: 32 }; //optional, defaults to { numberOfEdges: 32 }

const polygon = circleToPolygon(coordinates, radius, options);

console.log(polygon);
/*
{
  type: "Polygon",
  coordinates: [
    [
      [173.283966, -39.47400343176097],
      [172.8297426608343, -39.50761945331798],
      [172.39166717580562, -39.607271255365916],
      [171.98544458449058, -39.76940340765346],
      [171.62589074038397, -39.98820144316868],
      [171.3264802848837, -40.255758887782214],
      [171.09888995216616, -40.56231121046952],
      [170.9525431282912, -40.89653624994988],
      [170.894168491739, -41.24591956982946],
      [170.92739416288478, -41.597181119390946],
      [171.0524081585746, -41.9367562214545],
      [171.26572430426506, -42.251319123422796],
      [171.56009750883513, -42.528331314494025],
      [171.9246304894919, -42.75659019219929],
      [172.3451031959859, -42.92674764018193],
      [172.80453558092947, -43.03176422124745],
      [173.283966, -43.06726456823905],
      [173.76339641907052, -43.03176422124745],
      [174.22282880401409, -42.92674764018193],
      [174.64330151050808, -42.75659019219929],
      [175.00783449116483, -42.528331314494025],
      [175.3022076957349, -42.251319123422796],
      [175.51552384142542, -41.9367562214545],
      [175.6405378371152, -41.597181119390946],
      [175.673763508261, -41.24591956982946],
      [175.61538887170875, -40.89653624994988],
      [175.46904204783382, -40.56231121046952],
      [175.24145171511628, -40.255758887782214],
      [174.94204125961602, -39.98820144316868],
      [174.58248741550943, -39.76940340765346],
      [174.17626482419436, -39.607271255365916],
      [173.73818933916564, -39.50761945331798],
      [173.283966, -39.47400343176097],
    ],
  ],
};
*/
```

### Parameters

- `coordinates` **[Array][arraydef]** of length 2 or 3 **\*required**
  - First Element: `longitude` **[Number][numberdef]** **\*required**, can be any number `<=180` and `>=-180`
  - Second Element: `latitude` **[Number][numberdef]** **\*required**, can be any number `<=90 `and `>=-90`
  - Third Element: Ignored if present
- `radius` **[Number][numberdef]** **\*required**, can be any number `>0`
- `options` **[Object][objectdef]** or **[Number][numberdef]**. Omitting this variable is same as passing `{ numberOfEdges: 32 }` and passing a number is same as passing `{ numberOfEdges: <number> }`
  - `numberOfEdges` **[Number][numberdef]** can be any number >=3. Defaults to 32 when undefined
  - `earthRadius` **[Number][numberdef]** can be any number `>0`. Defaults to 6378137 (equatorial Earth radius) when undefined
  - `bearing` **[Number][numberdef]** can be any number. Defaults to 0 when undefined. How many degrees the circle should be rotated. (Most noticeable for "circles" with few edges.)
  - `rightHandRule` **[Boolean][booldef]** default to false when undefined. If true, the circle will be drawn in the opposite direction. This is useful when drawing a hole in another shape, or if your system is following the old standard.

## Disclaimers

- **Decimal values will not throw error for numberOfEdges!** Instead one of the edges of the polygon will be smaller than the others. In other words, all edges will not have the same length if a decimal number is passed as numberOfEdges.
- A circle whose edge cross longitude edges (-180 or 180) or a latitude edge (-90 or 90) will contain coordinate points that are outside the standardized coordinates (eg: [182, 23]). This is because there are two ways to represent a line going from [179, x] to [181, y]. One way is simply writing it as [[179, x], [182, y]] while the other is to write it as a multi-polygon. There is a plan to support multi-polygons but it has not yet been implemented.

## Authors

- Gabriel Zimmermann
- Johannes Jarbratt

## Contributors

- Jan Žák

## License

[ISC](./LICENSE.txt)

[arraydef]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
[booldef]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[numberdef]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number
[objectdef]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

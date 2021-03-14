# Circle To Polygon

The GeoJSON spec does not support circles. If you wish to create an area that represents a circle, your best bet is to create a polygon that roughly approximates the circle. In the limit of the number of edges becoming infinite, your Polygon will match a circle.

## Installation

`npm install --save circle-to-polygon`

or

`yarn add circle-to-polygon`

## Usage

### Example

```javascript
const circleToPolygon = require("circle-to-polygon");

const coordinates = [-27.4575887, -58.99029]; //[lon, lat]
const radius = 100; // in meters
const numberOfEdges = 32; //optional that defaults to 32

let polygon = circleToPolygon(coordinates, radius, numberOfEdges);

/*
 *
polygon:
 
 type = 'Polygon'
 coordinates = [ [ [ -27.457588699999995, -58.98939168471588 ],
                    [ -27.457248533454194, -58.98940894514629 ],
                    [ -27.456921438327615, -58.9894600631796 ],
                    [ -27.45661998386292, -58.98954307452298 ],
                    [ -27.4563557542251, -58.989654789313285 ],
                    [ -27.456138903413915, -58.98979091466893 ],
                    [ -27.45597776508136, -58.98994621962397 ],
                    [ -27.45587853224417, -58.99011473611232 ],
                    [ -27.455845019204208, -58.99028998828441 ],
                    [ -27.455878514839235, -58.99046524134828 ],
                    [ -27.455977732921237, -58.99063376037627 ],
                    [ -27.456138861394688, -58.99078906913211 ],
                    [ -27.456355708743818, -58.990925198971134 ],
                    [ -27.45661994184369, -58.99103691824481 ],
                    [ -27.45692140616749, -58.99111993338897 ],
                    [ -27.457248516049262, -58.99117105396192 ],
                    [ -27.457588699999995, -58.99118831528412 ],
                    [ -27.45792888395073, -58.99117105396192 ],
                    [ -27.458255993832502, -58.99111993338897 ],
                    [ -27.458557458156303, -58.99103691824481 ],
                    [ -27.458821691256173, -58.990925198971134 ],
                    [ -27.459038538605306, -58.99078906913211 ],
                    [ -27.45919966707875, -58.99063376037627 ],
                    [ -27.459298885160756, -58.99046524134828 ],
                    [ -27.459332380795786, -58.99028998828441 ],
                    [ -27.459298867755823, -58.99011473611232 ],
                    [ -27.459199634918626, -58.98994621962397 ],
                    [ -27.45903849658608, -58.98979091466893 ],
                    [ -27.45882164577489, -58.989654789313285 ],
                    [ -27.458557416137072, -58.98954307452298 ],
                    [ -27.45825596167238, -58.9894600631796 ],
                    [ -27.4579288665458, -58.98940894514629 ],
                    [ -27.457588699999995, -58.98939168471588 ] ] ]
*/
```

### Parameters

- `coordinates` **[Array][arraydef]** of length 2 or 3 **\*required**
  - First Element: `longitude` **[Number][numberdef]** **\*required**, can be any number `<=180` and `>=-180`
  - Second Element: `latitude` **[Number][numberdef]** **\*required**, can be any number `<=90 `and `>=-90`
  - Third Element: Ignored if present
- `radius` **[Number][numberdef]** **\*required**, can be any number `>0`
- `numberOfEdges` **[Number][numberdef]** can be any number `>=3`, defaults to 32 when undefined
- `earthRadius` **[Number][numberdef]** can be any number `>0`, defaults to 6378137 (equatorial Earth radius) when undefined
- `bearing` **[Number][numberdef]** can be any number, defaults to 0 when undefined

## Disclaimers

- **Decimal values will not throw error for numberOfEdges!** Instead one of the edges of the polygon will be smaller than the others. In other words, all edges will not have the same length if a decimal number is passed as numberOfEdges.
- A circle whoes edge cross longitude edges (-180 or 180) or a latitude edge (-90 or 90) will contain coordinate points that are outside the stanardized coordinates (eg: [182, 23]). This is because there are two ways to represent a line going from [179, x] to [181, y]. One way is simply writing it as [[179, x], [182, y]] while the other is to write it as a multi-polygon. Version <= 2.0.x does only support the first way while release of 2.1.0 will support multi-polygons as well.

## Authors

- Gabriel Zimmermann
- Johannes Jarbratt

## Contributors

- Jan Žák

## License

[ISC](./LICENSE.txt)

[arraydef]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
[numberdef]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

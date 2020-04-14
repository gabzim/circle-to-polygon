import * as GeoJSON from 'geojson'

declare const circleToPolygon: (center: GeoJSON.Position, radius: number, numberOfSegments?: number) => GeoJSON.Polygon;

export default circleToPolygon;
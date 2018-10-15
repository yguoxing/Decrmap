import { CirclePoint } from './circlePoint';
import { MarkerPoint } from './markerPoint';
import { Polygon } from './polygon';
import { Line } from './line';
import { openInterface } from '../openInterface';

let Layer = {
    ...openInterface,
    CirclePoint: CirclePoint,
    MarkerPoint: MarkerPoint,
    Polygon: Polygon,
    Line: Line
};

export { Layer }
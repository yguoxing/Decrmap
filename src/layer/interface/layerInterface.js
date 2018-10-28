import { CirclePoint } from './circlePoint';
import { Heatmap } from './heatmap';
import { MarkerPoint } from './markerPoint';
import { Polygon } from './polygon';
import { Line } from './line';
import { Track } from './track';
import { openInterface } from '../openInterface';

let Layer = {
    ...openInterface,
    CirclePoint: CirclePoint,
    Heatmap: Heatmap,
    MarkerPoint: MarkerPoint,
    Polygon: Polygon,
    Line: Line,
    Track: Track
};

export { Layer }
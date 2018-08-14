import MapBase from './MapBase';
import { CONST } from '../dataUtil/constant';
import { Log } from '../dataUtil/consoleLog';

export default class Osm extends MapBase {

    constructor(options){
        super(options);
    }

    addMap(mapId, options){
        super.addMap(mapId, options);
        this.olMap.addLayer(new ol.layer.Tile({
            source: new ol.source.OSM({
                url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        }))
    }
}
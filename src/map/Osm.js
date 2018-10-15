import MapBase from './MapBase';
import { CONST } from '../dataUtil/constant';
import { Log } from '../dataUtil/consoleLog';

export default class Osm extends MapBase {

    constructor(options){
        super(options);
    }

    addMap(mapId, options){
        super.addMap(mapId, options);
        this.olMap.addLayer(this.createLayer());
        this.createChange();
    }
    createLayer(){
        let osmLayer = new ol.layer.Tile({
            source: new ol.source.TileImage({
                url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                wrapX: false,
                crossOrigin: 'anonymous'
            }),
            baselayer: true
        })
        return osmLayer
    }
}
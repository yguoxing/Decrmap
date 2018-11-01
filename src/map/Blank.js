import ol from 'openlayers';
import MapBase from './MapBase';

export default class Blank extends MapBase {

    constructor(options){
        super(options);
    }

    addMap(mapId, options){
        super.addMap(mapId, options);
        this.olMap.addLayer(this.createLayer());
        this.createChange();
    }
    createLayer(){
        let blankLayer = new ol.layer.Tile({
            source: new ol.source.TileImage({
                url: '',
                wrapX: false,
                crossOrigin: 'anonymous'
            }),
            baselayer: true
        });
        return blankLayer;
    }
}
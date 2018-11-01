import ol from 'openlayers';
import MapBase from './MapBase';

ol.source.gaodeSource = function(options){
    options = options ? options : {};

    var url;
    if(options.mapType == 'sat'){
        url ='http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}';
    }else{
        url = 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}';
    }

    ol.source.XYZ.call(this, {
        crossOrigin: 'anonymous',   //跨域
        projection: ol.proj.get('EPSG:3857'),
        url:url,
        wrapX: options.wrapX !== undefined ? options.wrapX : true
    });
};

ol.inherits(ol.source.gaodeSource,ol.source.TileImage);

export default class Gaode extends MapBase {

    constructor(options){
        super(options);
    }

    addMap(mapId, options){
        super.addMap(mapId, options);
        this.olMap.addLayer(this.createLayer());
        this.createChange();
    }
    
    createLayer(){
        return new ol.layer.Tile({
            source: this.createRoadSource(),
            baselayer: true
        });
    }

    createRoadSource(){
        return new ol.source.gaodeSource({
            mapType: '',
            wrapX: false,
            crossOrigin: 'anonymous'
        });
    }

    switchSatellite(){
        this.getBaselayer().setSource(new ol.source.gaodeSource({
            mapType: 'sat',
            wrapX: false,
            crossOrigin: 'anonymous'
        }));
    }
}
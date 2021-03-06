import ol from 'openlayers';
import MapBase from './MapBase';

/**
 * Google地图加载文件，可切换卫星地图以及普通地图
 */
export default class Google extends MapBase {
    
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
        return new ol.source.XYZ({
            url: 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN' +
                '!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0',
            wrapX: false,
            crossOrigin: 'anonymous'
        });
    }

    switchSatellite(){
        this.getBaselayer().setSource(new ol.source.XYZ({
            url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
            wrapX: false,
            crossOrigin: 'anonymous'
        }));
    }
}
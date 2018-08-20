import ol from 'openlayers';
import MapBase from './MapBase';
import { CONST } from '../dataUtil/constant';
import { Log } from '../dataUtil/consoleLog';

export default class Google extends MapBase {

    constructor(options){
        super(options);
    }

    addMap(mapId, options){
        super.addMap(mapId, options);
        this.olMap.addLayer(new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0',
                wrapX: false
            })
        }));
    }
}
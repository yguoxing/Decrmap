import { Log } from '../dataUtil/consoleLog';
import { geoUtil } from '../dataUtil/geoUtil';
import ol from 'openlayers';

export default class MapBase {

    constructor(options) {
        this.DLayer = [];
        this.mapId = null;
        this.olMap = null;
    }

    addMap(mapId, options){
        options = options || {};
        let mapObj = new ol.Map({
            target: mapId,
            view: new ol.View({
                center: geoUtil.projTo3857(options.defaultCenter || [0,0]),
                zoom: options.zoom || 9
            })
        });
        this.olMap = mapObj;
        this.mapId = mapId;
    }
    updateMap(){
        Log.console.log('Update a map is not implemented');
    }
}
import { Log } from '../dataUtil/consoleLog';
import { ol } from 'openlayers';

export default class MapBase {

    constructor(options) {
    }

    addMap(mapId, options){
        let mapObj = new ol.Map({
            target: mapId
        });
        this.map = mapObj;
        this.mapId = mapId;
    }
    delMap(){
        Log.console.log('Delete a map is not implemented');
    }
    updateMap(){
        Log.console.log('Update a map is not implemented');
    }
}
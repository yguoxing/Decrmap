import MapBase from './MapBase';
import { CONST } from '../dataUtil/constant';
import { Log } from '../dataUtil/consoleLog';

export default class Wms extends MapBase {

    constructor(options){
        super(options);
    }

    addMap(mapId, options){
        super.addMap(mapId, options);
    }
}
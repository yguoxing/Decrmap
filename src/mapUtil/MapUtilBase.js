import ol from 'openlayers';
import { dataHandler } from '../dataUtil/dataHandler';
import { layerCtrl } from '../layer/layerCtrl';
import { CONST } from '../dataUtil/constant';
import LayerBase from "./../layer/LayerBase";

export default class MapUtilBase {

    constructor(options) {
        this.utilId = options.utilId || dataHandler.getUUID('mapUtil');
        this.style = {
            fill: {
                color: 'rgba(255,0,0,0.2)'
            },
            stroke: {
                color: '#ce717d',
                width: 3
            }
        };
        const utilLayer = CONST.MAPUTILLAYER;
        const layerOpt = {
            mapId: options.mapId,
            layerId: utilLayer,
        };
        if(!layerCtrl.isLayerExist(layerOpt)){
            let layerObj = new LayerBase();
            layerObj.addLayer(layerOpt);
        }
    }
}
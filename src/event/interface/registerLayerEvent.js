import SingleEvent from '../SingleClick';
import { eventCtrl } from '../eventCtrl';
import { CONST } from '../../dataUtil/constant'


function registerLayerEvent(options){
    options = {
        ...options,
        eventType: CONST.EVENTTYPE.SINGLECLICK,
        openType: CONST.OPENTYPE.PUBLIC,
        active: true
    };
    let eventIns = new SingleEvent(options);
    let param = {
        mapId: options.mapId,
        layerId: options.layerId,
        eventIns: eventIns
    };
    eventCtrl.setSingle(param);
}

export { registerLayerEvent };
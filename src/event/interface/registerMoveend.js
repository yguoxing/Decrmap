import MoveEnd from '../MoveEnd';
import { eventCtrl } from '../eventCtrl';
import { CONST } from '../../dataUtil/constant'


function registerMoveend(options){
    options = {
        ...options,
        eventType: CONST.EVENTTYPE.MOVEEND,
        openType: options.openType || CONST.OPENTYPE.PUBLIC,
        active: true
    };
    let eventIns = new MoveEnd(options);
    let param = {
        mapId: options.mapId,
        eventIns: eventIns
    };
    eventCtrl.setMoveend(param);
}

export { registerMoveend }
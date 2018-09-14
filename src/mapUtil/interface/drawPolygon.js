import DrawPolygon from "../DrawPolygon";
import { utilCtrl } from '../mapUtilCtrl';
import { CONST } from '../../dataUtil/constant'

function drawPolygon(options) {
    let param = {
        mapId: options.mapId,
        active: options.active === false? false:true,
        utilId: options.utilId,
        layerId: CONST.MAPUTILLAYER,
        callback: options.callback
    }
    if(!param.active && utilCtrl.isUtilExist(param)){
        utilCtrl.setActive(false);
    }else if(param.active && !utilCtrl.isUtilExist(param)){
        utilCtrl.removeUtil(param);
        let utilIns = new DrawPolygon(param);
        param.utilId = utilIns.utilId;
        utilCtrl.setUtil({
            ...param,
            utilIns: utilIns
        });
    }
}

export { drawPolygon };

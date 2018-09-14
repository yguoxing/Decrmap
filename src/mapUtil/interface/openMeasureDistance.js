import MeasureDistance from "../MeasureDistance";
import { utilCtrl } from '../mapUtilCtrl';
import { CONST } from '../../dataUtil/constant'
import { mapCtrl } from "../../map/mapCtrl";

function openMeasureDistance(options) {
    let param = {
        mapId: options.mapId,
        active: options.active === false? false:true,
        utilId: options.utilId,
        layerId: CONST.MAPUTILLAYER
    }
    if(!param.active && utilCtrl.isUtilExist(param)){
        utilCtrl.setActive(false);
    }else if(param.active && !utilCtrl.isUtilExist(param)){
        utilCtrl.removeUtil(param);
        let utilIns = new MeasureDistance(param);
        param.utilId = utilIns.utilId;
        utilCtrl.setUtil({
            ...param,
            utilIns: utilIns
        });
    }
}

export { openMeasureDistance };

import MeasureDistance from '../MeasureDistance';
import { utilCtrl } from '../mapUtilCtrl';

function openMeasureDistance(options) {
    let param = {
        mapId: options.mapId,
        active: options.active === false? false:true,
        utilId: options.utilId,
        callback: options.callback || null
    }

    if(utilCtrl.isUtilExist(param)){
        utilCtrl.setActive(param, param.active);
    }else if(param.active){
        let utilIns = new MeasureDistance(param);
        param.utilId = utilIns.utilId;
        utilCtrl.setUtil({
            ...param,
            utilIns: utilIns
        });
    }
}

export { openMeasureDistance };

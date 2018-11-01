import MeasureAngle from '../MeasureAngle';
import { utilCtrl } from '../mapUtilCtrl';

function openMeasureAngle(options) {
    let param = {
        mapId: options.mapId,
        active: options.active === false? false:true,
        utilId: options.utilId,
        callback: options.callback || null
    }
    
    if(utilCtrl.isUtilExist(param)){
        utilCtrl.setActive(param, param.active);
    }else{
        let utilIns = new MeasureAngle(param);
        param.utilId = utilIns.utilId;
        utilCtrl.setUtil({
            ...param,
            utilIns: utilIns
        });
    }
}

export { openMeasureAngle };

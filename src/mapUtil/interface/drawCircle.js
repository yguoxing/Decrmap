import DrawCircle from "../DrawCircle";
import { utilCtrl } from '../mapUtilCtrl';

function drawCircle(options) {
    let param = {
        mapId: options.mapId,
        active: options.active === false? false:true,
        utilId: options.utilId,
        callback: options.callback
    }

    if(utilCtrl.isUtilExist(param)){
        utilCtrl.setActive(param, param.active);
    }else{
        let utilIns = new DrawCircle(param);
        param.utilId = utilIns.utilId;
        utilCtrl.setUtil({
            ...param,
            utilIns: utilIns
        });
    }
}

export { drawCircle };

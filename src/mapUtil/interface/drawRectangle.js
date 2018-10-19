import DrawRectangle from "../DrawRectangle";
import { utilCtrl } from '../mapUtilCtrl';

function drawRectangle(options) {
    let param = {
        mapId: options.mapId,
        active: options.active === false? false:true,
        utilId: options.utilId,
        callback: options.callback
    }

    if(utilCtrl.isUtilExist(param)){
        utilCtrl.setActive(param, param.active);
    }else{
        let utilIns = new DrawRectangle(param);
        param.utilId = utilIns.utilId;
        utilCtrl.setUtil({
            ...param,
            utilIns: utilIns
        });
    }
}

export { drawRectangle };

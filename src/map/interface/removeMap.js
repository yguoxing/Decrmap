import { mapCtrl } from "../mapCtrl";
import { Log } from "../../dataUtil/consoleLog";

function removeMap(mapId) {
    const mapObj = mapCtrl.getMapObj(mapId);
    if(mapObj){
        mapCtrl.removeMap(mapId);
    }else{
        Log.warn('The map ' + mapId + 'is not exist');
    }
}

export { removeMap };

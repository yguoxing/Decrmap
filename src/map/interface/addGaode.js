import Gaode from "../Gaode";
import { mapCtrl } from '../mapCtrl';
import { controlCtrl } from '../../control/controlCtrl';

function addGaodeMap(mapId, options) {
    let gaodeObj = new Gaode();
    gaodeObj.addMap(mapId, options);
    mapCtrl.setMap(mapId, gaodeObj);
    controlCtrl.addCtrl(mapId, options.ctrls);
}

export { addGaodeMap };

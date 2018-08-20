import Gaode from "../Gaode";
import { mapCtrl } from '../mapCtrl';

function addGaodeMap(mapId, options) {
    let gaodeObj = new Gaode();
    gaodeObj.addMap(mapId, options);
    mapCtrl.setMap(mapId, gaodeObj);
}

export { addGaodeMap };

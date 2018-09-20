import Google from "../Google";
import { mapCtrl } from '../mapCtrl';
import { controlCtrl } from '../../control/controlCtrl';

function addGoogleMap(mapId, options) {
    let googleObj = new Google();
    googleObj.addMap(mapId, options);
    mapCtrl.setMap(mapId, googleObj);
    options.mapId = mapId;
    controlCtrl.addCtrl(mapId, options.ctrls);
}

export { addGoogleMap };

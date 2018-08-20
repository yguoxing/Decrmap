import Google from "../Google";
import { mapCtrl } from '../mapCtrl';

function addGoogleMap(mapId, options) {
    let googleObj = new Google();
    googleObj.addMap(mapId, options);
    mapCtrl.setMap(mapId, googleObj);
}

export { addGoogleMap };

import Osm from "../Osm";
import { mapCtrl } from '../mapCtrl';

function addOsmMap(mapId, options) {
    let osmObj = new Osm();
    osmObj.addMap(mapId, options);
    mapCtrl.setMap(mapId, osmObj);
}

export { addOsmMap };

import Osm from '../Osm';
import { mapCtrl } from '../mapCtrl';
import { controlCtrl } from '../../control/controlCtrl';

function addOsmMap(mapId, options) {
    let osmObj = new Osm();
    osmObj.addMap(mapId, options);
    mapCtrl.setMap(mapId, osmObj);
    controlCtrl.addCtrl(mapId, options.ctrls);
}

export { addOsmMap };

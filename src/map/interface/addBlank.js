import Blank from '../Blank';
import { mapCtrl } from '../mapCtrl';
import { controlCtrl } from '../../control/controlCtrl';

function addBlankMap(mapId, options) {
    let blankObj = new Blank();
    blankObj.addMap(mapId, options);
    mapCtrl.setMap(mapId, blankObj);
    controlCtrl.addCtrl(mapId, options.ctrls);
}

export { addBlankMap };

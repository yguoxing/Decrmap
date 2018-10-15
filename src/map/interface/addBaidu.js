import Baidu from "../Baidu";
import { mapCtrl } from '../mapCtrl';
import { controlCtrl } from '../../control/controlCtrl';

function addBaiduMap(mapId, options) {
    let baiduObj = new Baidu();
    baiduObj.addMap(mapId, options);
    mapCtrl.setMap(mapId, baiduObj);
    controlCtrl.addCtrl(mapId, options.ctrls);
}

export { addBaiduMap };

import Baidu from "../Baidu";
import { mapCtrl } from '../mapCtrl';

function addBaiduMap(mapId, options) {
    let baiduObj = new Baidu();
    baiduObj.addMap(mapId, options);
    mapCtrl.setMap(mapId, baiduObj);
}

export { addBaiduMap };

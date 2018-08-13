import Baidu from "../Baidu";

function addBaiduMap(mapId, options) {
    let baiduObj = new Baidu();
    baiduObj.addMap(mapId, options);
}

export { addBaiduMap };

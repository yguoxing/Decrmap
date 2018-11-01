import { mapCtrl } from '../map/mapCtrl';

let overlayCollection = {};

function setOverlay(options){
    overlayCollection[options.mapId] = overlayCollection[options.mapId] || {};
    overlayCollection[options.mapId][options.overlayIns.id] = options.overlayIns;
}

function removeOverlay(options){
    if(overlayCollection[options.mapId]){
        overlayCollection[options.mapId][options.id].removeOverlay(options);
        delete overlayCollection[options.mapId][options.id];
    }
}

function removeAllOverlay(mapId){
    let olMap = mapCtrl.getMapObj(mapId).olMap;
    let overlays = olMap.getOverlays();
    for(let i = overlays.length - 1; i >=0; i--){
        olMap.removeOverlay(overlays[i].olOverlay);
    }
    delete overlayCollection[mapId];
}

/**
 * 获取overlay实例化对象
 * @param {*} options 地图ID 弹出框ID
 */
function _getOverlayIns(options){
    if(overlayCollection[options.mapId]){
        return overlayCollection[options.mapId][options.id];
    }
    return null;
}

function _getAllOverlay(mapId){
    return overlayCollection[mapId];
}

let overlayCtrl = {
    setOverlay: setOverlay,
    removeOverlay: removeOverlay,
    removeAllOverlay: removeAllOverlay,
    _getOverlayIns: _getOverlayIns,
    _getAllOverlay: _getAllOverlay
};

export { overlayCtrl };

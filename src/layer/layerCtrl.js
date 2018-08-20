import { mapCtrl } from '../map/mapCtrl';

let layerCtrl = {};

function isLayerExist(options){
    mapCtrl.getMapObj()
}

function getLayerIns(options){
    let mapIns = mapCtrl.getMapObj(options.mapId);
    let layerIns = mapIns.DLayer.filter(ele => {
        return ele.layerId === options.layerId
    });
    return layerIns[0];
}

function getAllLayerList(mapId){

}

function removeAllLayer(mapId){

}

layerCtrl = {
    isLayerExist: isLayerExist,
    getLayerIns: getLayerIns
}

export { layerCtrl }

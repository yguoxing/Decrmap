import { mapCtrl } from '../map/mapCtrl';

let layerCtrl = {};

function isLayerExist(){
    mapCtrl.getMapObj()
}

function getLayerIns(options){
    let mapIns = mapCtrl.getMapObj(options.mapId);
    let layerIns = mapIns.DLayer.filter(ele => {
        return ele.layerId === options.layerId
    })
    return layerIns[0];
}
layerCtrl = {
    isLayerExist: isLayerExist,
    getLayerIns: getLayerIns
}

export { layerCtrl }

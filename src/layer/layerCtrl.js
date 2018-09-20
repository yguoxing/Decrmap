import { mapCtrl } from '../map/mapCtrl';

let layerCtrl = {};

function isLayerExist(options){
    var layerArr = mapCtrl.getMapObj(options.mapId).DLayer;
    var filterLayer = layerArr.filter(l => {
        return l.layerId === options.layerId
    })[0]
    return filterLayer?true:false
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

function removeLayer(){

}

function setLayerVisible(){

}

function setLayerOpacity(){

}

function getLayerData(){

}

function getLayerParam(){

}

function setLayerData(){

}

layerCtrl = {
    isLayerExist: isLayerExist,
    getLayerIns: getLayerIns
}

export { layerCtrl }

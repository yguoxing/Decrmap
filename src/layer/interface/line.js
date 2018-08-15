import { layerCtrl } from '../layerCtrl';
import Line from '../Line';

function addLayer(options){
    let layerInstance = new Line();
    layerInstance.addLayer(options);
}

function setData(options){
    var layerIns = layerCtrl.getLayerIns(options);
    layerIns.setData(options);
}

function removeLayer(options){
    var layerIns = layerCtrl.getLayerIns(options);
    if(layerIns){
        layerIns.removeLayer(options);
    }
}

function setLayerOpacity(options){
    var layerIns = layerCtrl.getLayerIns(options);
    layerIns.setLayerOpacity(options);
}

function setLayerVisible(options){
    var layerIns = layerCtrl.getLayerIns(options);
    layerIns.setLayerVisible(options);
}

function getLayerData(options){
    var layerIns = layerCtrl.getLayerIns(options);
    layerIns.getLayerData(options);
}

const line = {
    addLayer: addLayer,
    setData: setData,
    removeLayer: removeLayer,
    setLayerOpacity: setLayerOpacity,
    setLayerVisible: setLayerVisible,
    getLayerData: getLayerData
}


export { line as Line }
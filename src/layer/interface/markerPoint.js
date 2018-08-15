import { layerCtrl } from '../layerCtrl';
import MarkerPoint from '../MarkerPoint';

function addLayer(options){
    let layerInstance = new MarkerPoint();
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

const markerPoint = {
    addLayer: addLayer,
    setData: setData,
    removeLayer: removeLayer,
    setLayerOpacity: setLayerOpacity,
    setLayerVisible: setLayerVisible,
    getLayerData: getLayerData
}


export { markerPoint as MarkerPoint }
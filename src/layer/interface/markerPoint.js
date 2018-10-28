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

const markerPoint = {
    addLayer: addLayer,
    setData: setData
}


export { markerPoint as MarkerPoint }
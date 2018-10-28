import { layerCtrl } from '../layerCtrl';
import CirclePoint from '../CirclePoint';

function addLayer(options){
    let layerInstance = new CirclePoint();
    layerInstance.addLayer(options);
}

function setData(options){
    var layerIns = layerCtrl.getLayerIns(options);
    layerIns.setData(options);
}

const circlePoint = {
    addLayer: addLayer,
    setData: setData
}


export { circlePoint as CirclePoint }
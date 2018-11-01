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

const line = {
    addLayer: addLayer,
    setData: setData
};

export { line as Line };
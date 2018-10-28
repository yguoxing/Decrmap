import { layerCtrl } from '../layerCtrl';
import Polygon from '../Polygon';

function addLayer(options){
    let layerInstance = new Polygon();
    layerInstance.addLayer(options);
}

function setData(options){
    var layerIns = layerCtrl.getLayerIns(options);
    layerIns.setData(options);
}

const polygon = {
    addLayer: addLayer,
    setData: setData
}


export { polygon as Polygon }
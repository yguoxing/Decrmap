import { layerCtrl } from '../layerCtrl';
import Heatmap from '../Heatmap';

function addLayer(options){
    let layerInstance = new Heatmap();
    layerInstance.addLayer(options);
}

function setData(options){
    var layerIns = layerCtrl.getLayerIns(options);
    layerIns.setData(options);
}

const heatmap = {
    addLayer: addLayer,
    setData: setData
};

export { heatmap as Heatmap };
import { layerCtrl } from '../layerCtrl';
import Track from '../Track';

function addLayer(options){
    let layerInstance = new Track();
    layerInstance.addLayer(options);
}

function setData(options){
    var layerIns = layerCtrl.getLayerIns(options);
    layerIns.setData(options);
}

function stop(options){
    var layerIns = layerCtrl.getLayerIns(options);
    layerIns.stop(options.id);
}

function start(options){
    var layerIns = layerCtrl.getLayerIns(options);
    layerIns.start(options.id);
}

const track = {
    addLayer: addLayer,
    setData: setData,
    start: start,
    stop: stop
};

export { track as Track };
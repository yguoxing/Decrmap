import { Log } from '../dataUtil/consoleLog';
import ol from 'openlayers';
import { mapCtrl } from '../map/mapCtrl';

export default class LayerBase {

    constructor(options) {
        this.layerId = null;
        this.data = [];
        this.olLayer = null;
    }

    addLayer(options){

        let existLayer = mapCtrl.getMapObj(options.mapId).DLayer.filter(ele => {
            return ele.layerId === options.layerId
        });
        if(existLayer.length !== 0){
            Log.warn('Add layer ' + options.layerId + ' already exists');
            return
        }

        let layerInstance = new ol.layer.Vector({
            source: new ol.source.Vector({})
        });
        layerInstance.set('layerId', options.layerId);
        this.layerId = options.layerId;
        this.olLayer = layerInstance;

        mapCtrl.getMapObj(options.mapId).olMap.addLayer(layerInstance);
        mapCtrl.getMapObj(options.mapId).DLayer.push(this);
        options.callback(options.layerId);
    }

    setData(layerId, data){

    }

    removeLayer(options){
        let mapIns = mapCtrl.getMapObj(options.mapId);
        mapIns.removeLayer(this.olLayer);
        let layerArr = mapIns.DLayer;
        layerArr.splice(layerArr.findIndex(e => e.layerId == options.layerId), 1);
    }

    setLayerOpacity(options){
        this.olLayer.setOpacity(options.opacity);
    }

    setLayerVisible(options){
        this.olLayer.setVisible(options.visible);
    }

    getLayerData(options){
        return this.data;
    }
}
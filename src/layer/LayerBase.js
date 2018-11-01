import { Log } from '../dataUtil/consoleLog';
import ol from 'openlayers';
import { mapCtrl } from '../map/mapCtrl';

export default class LayerBase {

    constructor() {
        this.layerId = null;
        this.data = [];
        this.labelName = '';
        this.olLayer = null;
    }

    addLayer(options){

        let existLayer = mapCtrl.getMapObj(options.mapId).DLayer.filter(ele => {
            return ele.layerId === options.layerId;
        });
        if(existLayer.length !== 0){
            Log.warn('Add layer ' + options.layerId + ' already exists');
            return;
        }

        let layerInstance = new ol.layer.Vector({
            source: new ol.source.Vector({wrapX: false})
        });
        layerInstance.set('layerId', options.layerId);
        this.layerId = options.layerId;
        this.olLayer = layerInstance;

        mapCtrl.getMapObj(options.mapId).olMap.addLayer(layerInstance);
        mapCtrl.getMapObj(options.mapId).DLayer.push(this);
        if(options.callback){
            options.callback(options.layerId);
        }
    }

    setData(){

    }

    removeLayer(){
    }

    setLayerOpacity(options){
        this.olLayer.setOpacity(options.opacity);
    }

    setLayerVisible(options){
        this.olLayer.setVisible(options.visible);
    }

    getLayerData(){
        return this.data;
    }
}
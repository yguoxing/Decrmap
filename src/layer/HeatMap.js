import ol from 'openlayers';
import { Log } from '../dataUtil/consoleLog';
import LayerBase from './LayerBase';
import { CONST } from '../dataUtil/constant';
import { mapCtrl } from '../map/mapCtrl';

export default class CirclePoint extends LayerBase {

    constructor(options){
        super(options);
        this.layerType = CONST.LAYERTYPE.HEATMAP;
        this.defaultStyle = {
            radius: 20,
            stroke: {
                color: '#999',
                width: 2
            },
            fill: {
                color: '#4bea6f'
            }
        };
    }
    
    addLayer(options){
        let existLayer = mapCtrl.getMapObj(options.mapId).DLayer.filter(ele => {
            return ele.layerId === options.layerId;
        });
        if(existLayer.length !== 0){
            Log.warn('Add layer ' + options.layerId + ' already exists');
            return;
        }

        let layerInstance = new ol.layer.Heatmap({
            source: new ol.source.Vector({wrapX: false}),
            radius: options.radius,
            blur: options.blur
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

    setData(options){

        var pointFea = new ol.Feature({
            geometry: new ol.geom.MultiPoint(options.data).transform('EPSG:4326','EPSG:3857')
        });
        this.olLayer.getSource().addFeature(pointFea);
        this.data = options.data;
    }
}
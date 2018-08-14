import ol from 'openlayers';
import { Log } from '../dataUtil/consoleLog';
import LayerBase from "./LayerBase";
import { CONST } from '../dataUtil/constant';
import { mapCtrl } from '../map/mapCtrl';
import { geoUtil } from '../dataUtil/geoUtil';

export default class CirclePoint extends LayerBase {

    constructor(options){
        super(options);
        this.layerType = CONST.LAYERTYPE.CIRCLEPOINT;
        this.defaultStyle = {
            radius: 20,
            stroke: {
                color: '#999',
                width: 2
            },
            fill: {
                color: '#4bea6f'
            }
        }
    }
    
    addLayer(options){
        if(!super.addLayer(options)){
            Log.warn('Add layer ' + options.layerId + ' already exists');
            return
        }
        let layerInstance = new ol.layer.Vector({
            source: new ol.source.Vector({})
        });
        this.layerId = options.layerId;
        this.olLayer = layerInstance;
        mapCtrl.getMapObj(options.mapId).DLayer.push(this);
        options.callback(options.layerId);
    }

    setData(options){
        var pointFeaArr = options.data.map(ele => {
            let pointFea = new ol.Feature({
                geometry: new ol.geom.MultiPoint(
                    ele.point.map(e => {
                        return geoUtil.projTo3857(e);
                    })
                )
            });
            pointFea.setStyle(new ol.style.Style({
               /*  fill: new ol.style.Fill({
                    color: this.defaultStyle.fill.color || ele.style.fillColor
                }),
                stroke: new ol.style.Stroke({
                    color: this.defaultStyle.stroke.color || ele.style.strokeColor,
                    width: this.defaultStyle.stroke.width || ele.style.strokeWidth
                }), */
                image: new ol.style.Circle({
                    // radius: this.defaultStyle.radius || ele.radius,
                    // fill: new ol.style.Fill({
                    //     color: this.defaultStyle.fill.color || ele.style.fillColor
                    // }),
                    // stroke: new ol.style.Stroke({
                    //     color: this.defaultStyle.stroke.color || ele.style.strokeColor,
                    //     width: this.defaultStyle.stroke.width || ele.style.strokeWidth
                    // })
                    radius: 26,
                    fill: new ol.style.Fill({
                        color: '#FF0000'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#FF0000',
                        width: 2
                    })
                })
            }))
            return pointFea;
        });

        this.olLayer.getSource().addFeatures(pointFeaArr);
        this.data = options.data;
    }
}
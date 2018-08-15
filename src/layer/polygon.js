import ol from 'openlayers';
import { Log } from '../dataUtil/consoleLog';
import LayerBase from "./LayerBase";
import { CONST } from '../dataUtil/constant';
import { mapCtrl } from '../map/mapCtrl';

export default class Polygon extends LayerBase {

    constructor(options){
        super(options);
        this.layerType = CONST.LAYERTYPE.POLYGON;
        this.defaultStyle = {
           fill: {
               color: 'rgba(153,153,153,0.2)'
           },
           stroke: {
               color: '#ccc',
               width: 2
           }
        }
    }
    
    addLayer(options){
        super.addLayer(options);
    }

    setData(options){

        var pointFeaArr = options.data.map(ele => {
            let pointFea = new ol.Feature({
                geometry: new ol.geom.MultiPolygon(ele.point).transform('EPSG:4326','EPSG:3857')
            });
            ele.style = ele.style || {};
            pointFea.setStyle(new ol.style.Style({
                fill: new ol.style.Fill({
                    color: ele.style.fillColor || this.defaultStyle.fill.color
                }),
                stroke: new ol.style.Stroke({
                    color: ele.style.strokeColor || this.defaultStyle.stroke.color,
                    width: ele.style.strokeWidth || this.defaultStyle.stroke.width
                })
            }))
            return pointFea;
        });

        this.olLayer.getSource().addFeatures(pointFeaArr);
        this.data = options.data;

    }
}
import ol from 'openlayers';
import LayerBase from './LayerBase';
import { CONST } from '../dataUtil/constant';

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
        super.addLayer(options);
    }

    setData(options){

        var pointFeaArr = options.data.map(ele => {
            let pointFea = new ol.Feature({
                geometry: new ol.geom.MultiPoint(ele.point).transform('EPSG:4326','EPSG:3857')
            });
            ele.style = ele.style || {};
            pointFea.setStyle(new ol.style.Style({
                image: new ol.style.Circle({
                    radius: ele.style.radius || this.defaultStyle.radius,
                    fill: new ol.style.Fill({
                        color: ele.style.fillColor || this.defaultStyle.fill.color
                    }),
                    stroke: new ol.style.Stroke({
                        color: ele.style.strokeColor || this.defaultStyle.stroke.color,
                        width: ele.style.strokeWidth || this.defaultStyle.stroke.width
                    })
                })
            }))
            return pointFea;
        });

        this.olLayer.getSource().addFeatures(pointFeaArr);
        this.data = options.data;

    }
}
import ol from 'openlayers';
import { Log } from '../dataUtil/consoleLog';
import LayerBase from "./LayerBase";
import { CONST } from '../dataUtil/constant';
import { mapCtrl } from '../map/mapCtrl';

export default class MarkerPoint extends LayerBase {

    constructor(options){
        super(options);
        this.layerType = CONST.LAYERTYPE.MARKERPOINT;
        this.defaultStyle = {
            size: 20,
            offset: [0, 0]
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
            
            pointFea.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    src: ele.src,
                    offset: ele.offset || this.defaultStyle.offset
                })
            }))
            return pointFea;
        });

        this.olLayer.getSource().addFeatures(pointFeaArr);
        this.data = options.data;

    }
}
import ol from 'openlayers';
import LayerBase from './LayerBase';
import { CONST } from '../dataUtil/constant';
import { mapCtrl } from '../map/mapCtrl';
import { geoUtil } from '../dataUtil/geoUtil';

export default class Line extends LayerBase {

    constructor(options){
        super(options);
        this.layerType = CONST.LAYERTYPE.MARKERPOINT;
        this.defaultStyle = {
            width: 3,
            color: '#4abf95'
        };
    }
    
    addLayer(options){
        super.addLayer(options);
    }

    setData(options){

        options.data.map(ele => {
            let lineFea = new ol.Feature({
                geometry: new ol.geom.LineString(ele.point).transform('EPSG:4326','EPSG:3857')
            });
            let lineStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: ele.style.width || this.defaultStyle.width,
                    color: ele.style.color || this.defaultStyle.color
                })
            });

            if(ele.style.arrow){
                var self = this;
                let styleFun = function(){
                    let arrowStyle = self._getArrowStyle(ele, options.mapId);
                    return [lineStyle, arrowStyle];
                };
                lineFea.setStyle(styleFun);

            }else{
                lineFea.setStyle(lineStyle);
            }

            this.olLayer.getSource().addFeature(lineFea);
        });

        this.data = options.data;

    }

    /**
     * 计算箭头样式
     * @param {*} ele 线元素
     * @param {*} mapId 地图ID
     */
    _getArrowStyle(ele, mapId){
        //计算线方向
        let endPoint = geoUtil.projTo3857(ele.point[1]);
        let startPoint = geoUtil.projTo3857(ele.point[0]);
        let lineVector = [endPoint[0] - startPoint[0], endPoint[1] - startPoint[1]];
        let lineAngle = Math.acos(lineVector[0]/Math.sqrt(Math.pow(lineVector[0],2) + Math.pow(lineVector[1], 2), 2));
        if(lineVector[1]<0){
            lineAngle = Math.PI*2 - lineAngle;
        }
        //计算箭头点
        const arrowRadius = 6;
        let YPos = lineVector[1] > 0?-1:1;
        let pixPoint = mapCtrl.getMapObj(mapId).olMap.getPixelFromCoordinate(geoUtil.projTo3857(ele.point[1]));
        let centerPix = [pixPoint[0] - arrowRadius * Math.cos(lineAngle), pixPoint[1] - arrowRadius * Math.abs(Math.sin(lineAngle)) * YPos];
        let center = mapCtrl.getMapObj(mapId).olMap.getCoordinateFromPixel(centerPix);

        let arrowStyle = new ol.style.Style({
            image: new ol.style.RegularShape({
                radius: 9,
                points: 3,
                angle: Math.PI/2,
                fill: new ol.style.Fill({
                    color: ele.style.color || this.defaultStyle.color
                }),
                rotation: -lineAngle
            }),
            geometry:new ol.geom.Point(center)
        });
        
        return arrowStyle;
    }
}
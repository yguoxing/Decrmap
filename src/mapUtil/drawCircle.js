/***
 * 绘制圆
 * 建议地图比例尺小时使用该功能，随着比例尺放大，
 * 圆所对应的半径会失真
 */

import ol from 'openlayers';
import MapUtilBase from './MapUtilBase';
import { mapCtrl } from '../map/mapCtrl';
import { geoUtil } from '../dataUtil/geoUtil';

export default class DrawCircle extends MapUtilBase {

    constructor(options){

        super(options);
        this.centerId = 'center_' + this.utilId;
        this.radius = 0;
        this.outerId = 'outer_' + this.utilId;
        this.popId = 'pop_' + this.utilId;
        let olMap = mapCtrl.getMapObj(options.mapId).olMap;
        var self = this;
        this.drawInter = new ol.interaction.Draw({
            type: 'LineString',
            wrapX: false,
            maxPoints: 2,
            stopEvent: true,
            source: this.getUtilSource(),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: this.style.stroke.color,
                    width: 1
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({
                        color: 'rgba(206, 113, 125, 0.5)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ce717d',
                        width: 1
                    })
                })
            }),
            geometryFunction: function(e, geometry){
                self._drawing(e);
                if(!geometry){
                    geometry=new ol.geom.LineString(null);
                }
                geometry.setCoordinates(e);
                return geometry;
            }
        });

        olMap.addInteraction(this.drawInter);
        this.drawInter.setActive(options.active);
        
        this.drawInter.on('drawend', function(e){
            self._drawEnd(e);
        });

        this.drawInter.on('drawstart', function(e){
            self._addCenterPoint(e.feature.getGeometry().getCoordinates()[0]);
            e.feature.setId(self.utilId);
        });
    }

    _drawEnd(e){
        var popHtml = this._createHtml();
        let overlay = new ol.Overlay({
            element: popHtml,
            offset: [2, 4],
            position: e.feature.getGeometry().getLastCoordinate()
        });
        overlay.set('popId', this.popId);
        mapCtrl.getMapObj(this.mapId).olMap.addOverlay(overlay);
        var self = this;
        popHtml.lastChild.addEventListener('click', function(){
            self.closeUtil();
        });
        if(this.callback){
            this.callback({
                mapId: this.mapId,
                radius: this.radius,
                coordinate: geoUtil.projTo4326(e.feature.getGeometry().getFirstCoordinate())
            });
        }
        e.feature.setGeometry(null);
        setTimeout(() => {
            this.setActive(false);
        }, 200);
    }

    /**
     * 以鼠标位置与圆心距离为半径，实时刷新圆
     * @param {Array} point 顶点信息
     */
    _drawing(point){
        let olMap = mapCtrl.getMapObj(this.mapId).olMap;
        let utilSource = this.getUtilSource();
        
        let firstPix = olMap.getPixelFromCoordinate(point[0]),
            secondPix = olMap.getPixelFromCoordinate(point[1]);
        let radius = Math.sqrt(Math.pow(firstPix[0] - secondPix[0], 2) + Math.pow(firstPix[1] - secondPix[1], 2), 2);
        this.radius = Number(radius.toFixed(1));

        let outerFea = utilSource.getFeatureById(this.outerId);
        if(outerFea){
            outerFea.setGeometry(new ol.geom.Point(point[0]));
        }else{
            outerFea = new ol.Feature({
                geometry: new ol.geom.Point(point[0])
            });
            outerFea.setId(this.outerId);
        }

        let outerStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: radius,
                stroke: new ol.style.Stroke({
                    color: '#ce717d',
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(206, 113, 125, 0.3)'
                })
            })
        });
        outerFea.setStyle(outerStyle);
        utilSource.addFeature(outerFea);
    }

    /**
     * 绘制圆心
     * @param {Array} point 圆心位置
     */
    _addCenterPoint(point){
        let utilSource = this.getUtilSource();
        let centerFea = new ol.Feature({
            geometry: new ol.geom.Point(point)
        });
        centerFea.setId(this.centerId);
        let centerStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 4,
                fill: new ol.style.Fill({
                    color: '#ce717d'
                }),
            })
        });
        centerFea.setStyle(centerStyle);
        utilSource.addFeature(centerFea);
    }

    _createHtml(){
        var outer = document.createElement('div');
        let closeImg = document.createElement('img');
        closeImg.src = '../demo/mapctrls.gif';
        closeImg.style.cursor = 'pointer';
        outer.appendChild(closeImg);

        return outer;
    }

    setActive(flag){
        this.drawInter.setActive(flag);
    }

    closeUtil(){
        this.removeOverlay([this.popId]);
        
        let utilSource = this.getUtilSource();
        let centerFea = utilSource.getFeatureById(this.centerId);
        if(centerFea){
            utilSource.removeFeature(centerFea);
        }

        let outerFea = utilSource.getFeatureById(this.outerId);
        if(outerFea){
            utilSource.removeFeature(outerFea);
        }

        let olMap = mapCtrl.getMapObj(this.mapId).olMap;
        olMap.removeInteraction(this.drawInter);
        this.setActive(false);
    }
}
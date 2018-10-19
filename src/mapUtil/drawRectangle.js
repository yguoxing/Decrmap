/**
 * 手绘矩形
 * 以用户绘制的两点为对角线，生成外截矩形
 */

import ol from 'openlayers';
import MapUtilBase from './MapUtilBase';
import { mapCtrl } from '../map/mapCtrl';
import { geoUtil } from '../dataUtil/geoUtil';

export default class DrawRectangle extends MapUtilBase {

    constructor(options){

        super(options);
        this.points = [];
        this.rectangleId = 'rect_' + this.utilId;
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
                return geometry
            }
        });

        olMap.addInteraction(this.drawInter);
        this.drawInter.setActive(options.active);
        
        this.drawInter.on('drawend', function(e){
            self._drawEnd(e);
        });

        this.drawInter.on('drawstart', function(e){
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
        popHtml.lastChild.addEventListener('click', function(e){
            self.closeUtil();
        });
        if(this.callback){
            let coordinate = this.points.map(e => {
                return geoUtil.projTo4326(e)
            })
            this.callback({
                mapId: this.mapId,
                coordinate: coordinate
            });
        }
        e.feature.setGeometry(null);
        setTimeout(() => {
            this.setActive(false);
        }, 200);


    }

    /**
     * 实时计算并展示矩形
     * @param {Array} point 对角线定点
     */
    _drawing(point){
        let olMap = mapCtrl.getMapObj(this.mapId).olMap;
        let utilSource = this.getUtilSource();
        let lonOne = point[0][0], lonTwo = point[1][0], latOne = point[0][1], latTwo = point[1][1];
        this.points = [[lonOne,latOne], [lonOne,latTwo], [lonTwo,latTwo], [lonTwo,latOne], [lonOne,latOne]];

        let outerFea = utilSource.getFeatureById(this.rectangleId);
        if(outerFea){
            outerFea.setGeometry(new ol.geom.Polygon([this.points]))
        }else{
            outerFea = new ol.Feature({
                geometry: new ol.geom.Polygon([this.points])
            })
            outerFea.setId(this.rectangleId);
        }

        let outerStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: this.style.stroke.color,
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'rgba(206, 113, 125, 0.3)'
            })
        })
        outerFea.setStyle(outerStyle);
        utilSource.addFeature(outerFea);
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
        let outerFea = utilSource.getFeatureById(this.rectangleId);
        if(outerFea){
            utilSource.removeFeature(outerFea);
        }

        let olMap = mapCtrl.getMapObj(this.mapId).olMap;
        olMap.removeInteraction(this.drawInter);
        this.setActive(false);
    }
}
/**
 * 测夹角
 * 中心点到初始点形成初始向量，已中心点到结束点形成结束向量，
 * 夹角为初始向量逆时针指向结束向量，角度取值范围为[0,360];
 */

import ol from 'openlayers';
import MapUtilBase from './MapUtilBase';
import { mapCtrl } from '../map/mapCtrl';
import { geoUtil } from '../dataUtil/geoUtil';

export default class MeasureAngle extends MapUtilBase {

    constructor(options){

        super(options);

        this.popId = 'pop_' + this.utilId;
        let olMap = mapCtrl.getMapObj(options.mapId).olMap;
        var self = this;
        this.drawInter = new ol.interaction.Draw({
            type: 'Polygon',
            wrapX: false,
            stopEvent: true,
            source: this.getUtilSource(),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: this.style.stroke.color,
                    width: this.style.stroke.width
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
            })
        });

        olMap.addInteraction(this.drawInter);
        this.drawInter.setActive(options.active);
        
        this.drawInter.on('drawend', function(e){
            self._drawEnd.call(self, e);
        });

        this.drawInter.on('drawstart', function(e){
            e.feature.setId(self.utilId);
            e.feature.setStyle(function(){
                let showArea = '';
                var point = e.feature.getGeometry().getCoordinates();
                if(point[0].length > 2){
                    let transformPoint = point[0].map(e => {
                        return geoUtil.projTo4326(e);
                    })
                    showArea = self._getArea(transformPoint);
                }
                
                // 角度文字样式
                let textStyle = new ol.style.Text({
                    font: '15px Calibri,sans-serif',
                    fill: new ol.style.Fill({
                        color: '#000'
                    }),
                    text: showArea
                });

                // 扇形样式
                var contentStyle = new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(206, 113, 125, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ce717d',
                        width: 1
                    }),
                    text: textStyle
                })

                return contentStyle
            })
        });
    }

    _drawEnd(e){
        let showArea = '';
        var point = e.feature.getGeometry().getCoordinates();
        if(point[0].length > 2){
            let transformPoint = point[0].map(e => {
                return geoUtil.projTo4326(e);
            })
            showArea = this._getArea(transformPoint);
        }
        e.feature.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: this.style.stroke.color,
                width: this.style.stroke.width
            }),
            fill: new ol.style.Fill({
                color: 'rgba(206, 113, 125, 0.3)'
            }),
            text: new ol.style.Text({
                font: '15px Calibri,sans-serif',
                fill: new ol.style.Fill({
                    color: '#000'
                }),
                text: showArea
            })
        }));
        var popHtml = this._createHtml();
        var points = e.feature.getGeometry().getCoordinates()[0];
        let overlay = new ol.Overlay({
            element: popHtml,
            offset: [2, 4],
            position: points[points.length - 2]
        });
        overlay.set('popId', this.popId);
        mapCtrl.getMapObj(this.mapId).olMap.addOverlay(overlay);
        var self = this;
        popHtml.lastChild.addEventListener('click', function(e){
            self.closeUtil.call(self);
        });
        if(this.callback){
            this.callback({
                mapId: this.mapId,
                area: this.exactArea,
                coordinates: this.points
            })
        }

        setTimeout(() => {
            this.setActive(false);
        }, 200);
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

    /**
     * 获取实际地理面积
     * @param {Array} e 测距点信息
     * @return {Object} area: 实际呈现面积(已四舍五入), exactArea:准确面积(平凡米)
     */
    _getArea(e){
        let olMap = mapCtrl.getMapObj(this.mapId).olMap;
        let pixPoints = e.map(o =>{
            return olMap.getPixelFromCoordinate(o);
        });
        let exactArea = Math.abs(geoUtil.getArea(e));
        let  area = exactArea > 1000000? Number((exactArea/1000000).toFixed(2)) + '平方公里': Number(exactArea.toFixed(2)) + '平方米';
        this.exactArea = exactArea;
        this.points = e;
        return area
    }

    closeUtil(){
        this.removeOverlay([this.popId]);

        let utilSource = this.getUtilSource();

        let lineFea = utilSource.getFeatureById(this.utilId);
        if(lineFea){
            utilSource.removeFeature(lineFea);
        }
        
        let olMap = mapCtrl.getMapObj(this.mapId).olMap;
        olMap.removeInteraction(this.drawInter);
        this.setActive(false);
    }
}
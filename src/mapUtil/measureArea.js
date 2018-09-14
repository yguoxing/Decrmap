import ol from 'openlayers';
import MapUtilBase from './MapUtilBase';
import { mapCtrl } from '../map/mapCtrl';
import { layerCtrl } from '../layer/layerCtrl';
import { CONST } from '../dataUtil/constant';
import { geoUtil } from '../dataUtil/geoUtil';
import { dataHandler } from '../dataUtil/dataHandler';

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
            source: layerCtrl.getLayerIns(options).olLayer.getSource(),
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
                    showArea = self._getArea(transformPoint).showArea;
                }
                
                let textStyle = new ol.style.Text({
                    font: '15px Calibri,sans-serif',
                    fill: new ol.style.Fill({
                        color: '#000'
                    }),
                    text: showArea
                });

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
            showArea = this._getArea(transformPoint).showArea;
        }
        e.feature.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: this.style.stroke.color,
                width: this.style.stroke.width
            }),
            fill: new ol.style.Fill({
                color: 'rgba(206, 113, 125, 0.2)'
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
            offset: [-2, -4],
            position: points[points.length - 2]
        });
        overlay.set('popId', this.popId);
        mapCtrl.getMapObj(this.mapId).olMap.addOverlay(overlay);
        var self = this;
        popHtml.lastChild.addEventListener('click', function(e){
            self.closeUtil.call(self);
        });
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

    _getArea(e){
        let olMap = mapCtrl.getMapObj(this.mapId).olMap;

        let pixPoints = e.map(o =>{
            return olMap.getPixelFromCoordinate(o);
        });
        let exactArea = Math.abs(geoUtil.getArea(e));
        let  area = exactArea > 1000000? (exactArea/1000000).toFixed(2) + '平方公里': exactArea.toFixed(2) + '平方米';
        return {
            showArea: area,
            exactArea: exactArea
        }
    }

    closeUtil(){
        const options = {
            mapId: this.mapId,
            layerId: CONST.MAPUTILLAYER
        };
        let olMap = mapCtrl.getMapObj(this.mapId).olMap;
        var overlayArr = olMap.getOverlays().getArray();
        for(var i = overlayArr.length - 1; i >= 0; i--){
            if(overlayArr[i].get('popId') === this.popId){
                olMap.removeOverlay(overlayArr[i]);
            }
        }

        let utilSource = layerCtrl.getLayerIns(options).olLayer.getSource();

        let lineFea = utilSource.getFeatureById(this.utilId);
        utilSource.removeFeature(lineFea);

        olMap.removeInteraction(this.drawInter);
        this.setActive(false);
    }
}
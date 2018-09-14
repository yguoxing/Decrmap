import ol from 'openlayers';
import MapUtilBase from './MapUtilBase';
import { mapCtrl } from '../map/mapCtrl';
import { layerCtrl } from '../layer/layerCtrl';
import { CONST } from '../dataUtil/constant';
import { dataHandler } from '../dataUtil/dataHandler';

export default class MeasureAngle extends MapUtilBase {

    constructor(options){

        super(options);
        this.angleId = 'angle_' + this.utilId;
        this.popId = 'pop_' + this.utilId;
        let olMap = mapCtrl.getMapObj(options.mapId).olMap;
        var self = this;
        this.drawInter = new ol.interaction.Draw({
            type: 'LineString',
            maxPoints: 3,
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
            }),
            geometryFunction: function(e, geometry){
                self._getAngle.call(self, e);
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
            self._drawEnd.call(self, e);
        });

        this.drawInter.on('drawstart', function(e){
            e.feature.setId(self.utilId);
        });
    }

    _drawEnd(e){
        e.feature.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: this.style.stroke.color,
                width: this.style.stroke.width
            })
        }));
        var popHtml = this._createHtml();
        let overlay = new ol.Overlay({
            element: popHtml,
            offset: [-2, -4],
            position: e.feature.getGeometry().getLastCoordinate()
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

    _getAngle(e){
        if(e.length != 3){
            return
        }
        let olMap = mapCtrl.getMapObj(this.mapId).olMap;

        let pixPoints = e.map(o =>{
            return olMap.getPixelFromCoordinate(o);
        })
        let firstVector = [pixPoints[0][0] - pixPoints[1][0], -pixPoints[0][1] + pixPoints[1][1]];
        let secondVector = [pixPoints[2][0] - pixPoints[1][0], -pixPoints[2][1] + pixPoints[1][1]];
        let angle = dataHandler.calVectorAngle(firstVector, secondVector);
        let startAngle = dataHandler.calVectorAngle([1,0],firstVector);

        let pixelArr = [], radius = 60;
        for(var i = startAngle; i <= startAngle + angle; i++){
            pixelArr.push([pixPoints[1][0] + radius*Math.cos(i/180*Math.PI),pixPoints[1][1] - radius*Math.sin(i/180*Math.PI)]);
        }
        let tempPoint = pixelArr.map(p => {
            return olMap.getCoordinateFromPixel(p);
        });
        tempPoint.push(e[1]);
        tempPoint.push(tempPoint[0]);
        if(tempPoint.length > 2){
            this._refreshAngle(tempPoint, angle);
        }
    }

    _refreshAngle(points, angle){
        let options = {
            mapId: this.mapId,
            layerId: CONST.MAPUTILLAYER
        }
        let source = layerCtrl.getLayerIns(options).olLayer.getSource();

        let angleFea = source.getFeatureById(this.angleId);
        if(angleFea){
            angleFea.setGeometry(new ol.geom.Polygon([points]));
        }else{
            angleFea = new ol.Feature({
                geometry: new ol.geom.Polygon([points])
            });
            angleFea.setId(this.angleId);
            source.addFeature(angleFea);
        }

        let textStyle = new ol.style.Text({
            font: '15px Calibri,sans-serif',
            fill: new ol.style.Fill({
                color: '#000'
            }),
            text: Math.ceil(angle) + '°',
            scale: 1.2
        });
        let contentStyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(206, 113, 125, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ce717d',
                width: 1
            }),
            text: textStyle
        });
        angleFea.setStyle(contentStyle);
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
        let angleFea = utilSource.getFeatureById(this.angleId);

        let lineFea = utilSource.getFeatureById(this.utilId);
        utilSource.removeFeature(angleFea);
        utilSource.removeFeature(lineFea);

        olMap.removeInteraction(this.drawInter);
        this.setActive(false);
    }
}
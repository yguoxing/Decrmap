import ol from 'openlayers';
import MapUtilBase from './MapUtilBase';
import SingleEvent from '../event/SingleClick';
import { mapCtrl } from '../map/mapCtrl';
import { layerCtrl } from '../layer/layerCtrl';
import { eventCtrl } from '../event/eventCtrl';
import { CONST } from '../dataUtil/constant';
import { geoUtil } from '../dataUtil/geoUtil';

export default class MeasureDistance extends MapUtilBase {

    constructor(options){

        super(options);
        this.points = [];
        this.oldDistance = 0;
        this.circleFeaId = 'circle_' + this.utilId;
        this.popId = 'pop_' + this.utilId;
        let style = { color: '#FF0000', width: 3 };
        let olMap = mapCtrl.getMapObj(options.mapId).olMap;
        var self = this;
        this.drawInter = new ol.interaction.Draw({
            type: 'LineString',
            wrapX: false,
            stopEvent: true,
            source: layerCtrl.getLayerIns(options).olLayer.getSource(),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: this.style.stroke.color,
                    width: this.style.stroke.width
                }),
                image: new ol.style.Icon({
                    src: '../css/images/ruler.cur',
                    offset: [-17, -12],
                    size: [44,35]
                })
            }),
            geometryFunction: function(e, geometry){
                self._drawing(e, self);
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
            self._drawEnd(e, self);
        });

        this.drawInter.on('drawstart', function(e){
            e.feature.setId(self.utilId);
        });
        let param = {
            mapId: options.mapId,
            layerId: CONST.MAPUTILLAYER,
            eventType: CONST.EVENTTYPE.SINGLECLICK,
            openType: CONST.OPENTYPE.INTERNAL,
            active: false,
            callback: function(e){
                // self._drawing(e,self);
            }
        };
        this.eventIns = new SingleEvent(param);
        eventCtrl.setSingle({
            mapId: options.mapId,
            layerId: CONST.MAPUTILLAYER,
            eventIns: this.eventIns
        });
    }

    _drawEnd(e, self){
        e.feature.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: self.style.stroke.color,
                width: self.style.stroke.width
            })
        }));
        var popHtml = self._createHtml(self._getDistanceTip(true), true);
        let overlay = new ol.Overlay({
            element: popHtml,
            position: e.feature.getGeometry().getLastCoordinate(),
            offset: [8, 4]
        });
        overlay.set('popId', self.popId);
        mapCtrl.getMapObj(self.mapId).olMap.addOverlay(overlay);
        overlay.getElement().parentElement.style.zIndex = 10;
        popHtml.lastChild.addEventListener('click', function(e){
            self.closeUtil.call(self);
        });
        setTimeout(() => {
            this.setActive(false);    
        }, 200);
    }

    _drawing(e, self){
        if(self.points.length - e.length === 1 || self.points.length - e.length === 0){
            return;
        }
        self.points.push(e[e.length - 2]);
        
        self.refreshCircle({mapId: self.mapId,layerId: CONST.MAPUTILLAYER});
        let overlay = new ol.Overlay({
            element: self._createHtml(self._getDistanceTip(false)),
            position: e[e.length - 2],
            offset: [8, 4]
        });
        overlay.set('popId', self.popId);
        mapCtrl.getMapObj(self.mapId).olMap.addOverlay(overlay);
    }

    setActive(flag){
        this.drawInter.setActive(flag);
        this.eventIns.setActive(flag);
    }

    _getDistanceTip(isEnd){
        let tipInfo = '';
        
        if(this.points.length === 1){
            tipInfo = '起点';
        }else{
            let lastPoint = geoUtil.projTo4326(this.points[this.points.length-1]);
            let prePoint = geoUtil.projTo4326(this.points[this.points.length-2]);
            let lastDistance = geoUtil.getDistance([prePoint,lastPoint]);
            if(lastDistance + this.oldDistance > 1000){
                tipInfo = ((lastDistance + this.oldDistance)/1000).toFixed(2) + ' 公里';
            }else{
                tipInfo = Number((lastDistance + this.oldDistance).toFixed(2)) + ' 米';
            }
            this.oldDistance = lastDistance + this.oldDistance;
            
            if(isEnd){
                tipInfo = '总长：' + tipInfo;
            }
        }
        return tipInfo;
    }

    _createHtml(content, isEnd){
        var outer = document.createElement('div');
        outer.style.backgroundColor = 'white';
        outer.style.borderRadius = '3px';
        outer.style.border = '1px solid #ce717d';
        outer.style.color = '#000000';
        outer.style.fontSize = '12px';
        outer.innerText = content;
        outer.style.padding = '1px 4px';
        if(isEnd){
            let closeImg = document.createElement('img');
            closeImg.src = '../demo/mapctrls.gif';
            closeImg.style.margin = '0 0 0 4px';
            closeImg.style.cursor = 'pointer';
            outer.appendChild(closeImg);
        }
        return outer;
    }

    refreshCircle(options){
        let source = layerCtrl.getLayerIns(options).olLayer.getSource();
        let circleFea = source.getFeatureById(this.circleFeaId);
        if(circleFea){
            circleFea.setGeometry(new ol.geom.MultiPoint(this.points));
        }else{
            circleFea = new ol.Feature({
                geometry: new ol.geom.MultiPoint(this.points)
            });
            circleFea.setStyle(new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 4,
                    stroke: new ol.style.Stroke({
                        color: 'red',
                        width: 2
                    }),
                    fill: new ol.style.Fill({
                        color: 'white'
                    })
                })
            }))
            circleFea.setId(this.circleFeaId);
            source.addFeature(circleFea);
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
        let circleFea = utilSource.getFeatureById(this.circleFeaId);

        let lineFea = utilSource.getFeatureById(this.utilId);
        utilSource.removeFeature(circleFea);
        utilSource.removeFeature(lineFea);

        olMap.removeInteraction(this.drawInter);
        this.setActive(false);
    }
}
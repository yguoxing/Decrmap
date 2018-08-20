import ol from 'openlayers';
import MapUtilBase from './MapUtilBase';
import SingleEvent from '../event/SingleClick';
import { mapCtrl } from '../map/mapCtrl';
import { layerCtrl } from '../layer/layerCtrl';
import { eventCtrl } from '../event/eventCtrl';
import { CONST } from '../dataUtil/constant';

export default class MeasureDistance extends MapUtilBase {

    constructor(options){

        super(options);
        this.points = [];
        let style = { color: '#FF0000', width: 3 };
        let olMap = mapCtrl.getMapObj(options.mapId).olMap;
        this.drawInter = new ol.interaction.Draw({
            type: 'LineString',
            wrapX: false,
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
            })
        });

        olMap.addInteraction(this.drawInter);
        this.drawInter.setActive(options.active);
        var self = this;
        this.drawInter.on('drawend', function(e){
            console.log(11)
            self._drawEnd(e, self);
        });
        let param = {
            mapId: options.mapId,
            layerId: CONST.MAPUTILLAYER,
            eventType: CONST.EVENTTYPE.SINGLECLICK,
            openType: CONST.OPENTYPE.INTERNAL,
            active: false,
            callback: function(e){
                self._drawing(e,self);
            }
        };
        this.eventIns = new SingleEvent(param);
        eventCtrl.setSingle({
            mapId: options.mapId,
            layerId: CONST.MAPUTILLAYER,
            eventIns: eventIns
        });
    }

    _drawEnd(e, instance){
        e.feature.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: instance.style.stroke.color,
                width: instance.style.stroke.width
            })
        }));
    }

    _drawing(e, instance){
        let measurePop = document.createElement('div');
        measurePop.innerText = 25;
        let overlay = new ol.Overlay({
            element: measurePop,
            id:'adsad'
        });
        mapCtrl.getMapObj(options.mapId).olMap.addOverlay(overlay);
    }

    setActive(flag){
        this.drawInter.setActive(flag);
        eventIns.setActive(flag);
    }
}
import ol from 'openlayers';
import MapUtilBase from './MapUtilBase';
import { mapCtrl } from '../map/mapCtrl';
import { layerCtrl } from '../layer/layerCtrl';
import { CONST } from '../dataUtil/constant';
import { geoUtil } from '../dataUtil/geoUtil';

export default class DrawLine extends MapUtilBase {

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
                fill: new ol.style.Fill({
                    color: 'rgba(206, 113, 125, 0.3)'
                }),
                image: new ol.style.Circle({
                    radius: 4,
                    fill: new ol.style.Fill({
                        color: 'rgba(206, 113, 125, 0.5)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ce717d',
                        width: 2
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
        });
    }

    _drawEnd(e){
        e.feature.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: this.style.stroke.color,
                width: this.style.stroke.width
            }),
            fill: new ol.style.Fill({
                color: 'rgba(206, 113, 125, 0.3)'
            })
        }));
        var coordinates = e.feature.getGeometry().getCoordinates()[0];
        var popHtml = this._createHtml();
        let overlay = new ol.Overlay({
            element: popHtml,
            offset: [2, 4],
            position: coordinates[coordinates.length - 2]
        });
        overlay.set('popId', this.popId);
        mapCtrl.getMapObj(this.mapId).olMap.addOverlay(overlay);
        var self = this;
        popHtml.lastChild.addEventListener('click', function(e){
            self.closeUtil.call(self);
        });
        let coordinate = e.feature.getGeometry().getCoordinates().map(c => {
            return geoUtil.projTo4326(c)
        })
        if(this.callback){
            this.callback({
                mapId: this.mapId,
                coordinate: coordinate
            });
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
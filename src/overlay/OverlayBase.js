import ol from 'openlayers';
import { dataHandler } from '../dataUtil/dataHandler';
import { geoUtil } from '../dataUtil/geoUtil';
import { mapCtrl } from '../map/mapCtrl';

export default class OverlayBase {
    constructor(options) {
        this.mapId = options.mapId;
        this.overlayId = options.id || 'overlay_' + dataHandler.getUUID();
    }

    /**
     * 添加overlay图层
     */
    addOverlay(options){
        let overlay = new ol.Overlay({
            id: this.id,
            element: options.element,
            position: geoUtil.projExtentTo3857(options.position)
        });
        this.olOverlay = overlay;
        let olMap = mapCtrl.getMapObj(options.mapId).olMap;
        olMap.addOverlay(overlay);
    }

    removeOverlay(options){
        let olMap = mapCtrl.getMapObj(options.mapId).olMap;
        let overlay = olMap.getOverlayById(options.id);
        if(overlay){
            olMap.removeOverlay(overlay);
        }
    }
}